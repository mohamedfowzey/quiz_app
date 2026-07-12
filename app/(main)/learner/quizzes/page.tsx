'use client'

import { apiGetQuestionsWithoutAnswers, apiSubmitQuiz, SubmitQuizData } from "@/app/api/quizApi/QuizApis"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Loader2Icon, Clock } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"
import axios from "axios"
import { QuizResultModal } from "./QuizResultModal"


interface QuizQuestion {
    _id: string
    title: string
    options: { A: string; B: string; C: string; D: string; _id: string }
}

interface QuizDetails {
    _id: string
    code: string
    title: string
    description: string
    status: string
    instructor: string
    group: string
    questions_number: number
    duration?: number
    score_per_question?: number   
    questions: QuizQuestion[]
}

interface ViewQuizDialogProps {
    open: boolean
    loading: boolean
    idQuiz: string
    onClose?: () => void
}

export function ViewQuizDialog({ open, loading, idQuiz, onClose }: ViewQuizDialogProps) {
    const [quiz, setQuiz] = useState<QuizDetails | null>(null)
    const [fetching, setFetching] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [answers, setAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({})
    const [timeLeft, setTimeLeft] = useState<number | null>(null)
    const submitRef = useRef<() => void>(() => { })

    const [showResult, setShowResult] = useState(false)
    const [resultData, setResultData] = useState<{ score?: number; total?: number }>({})

    useEffect(() => {
        if (open && idQuiz) {
            fetchQuizDetails(idQuiz)
        }
        if (!open) {
            setQuiz(null)
            setAnswers({})
            setTimeLeft(null)
        }
    }, [open, idQuiz])

    useEffect(() => {
        if (!quiz?.duration) return
        setTimeLeft(quiz.duration * 60)
    }, [quiz])

    useEffect(() => {
        if (timeLeft === null) return
        if (timeLeft <= 0) {
            toast.error("Time is up, submitting your answers automatically")
            submitRef.current()
            return
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev !== null ? prev - 1 : prev))
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft])

    const fetchQuizDetails = async (id: string) => {
        try {
            setFetching(true)
            const response = await apiGetQuestionsWithoutAnswers(id)
            setQuiz(response?.data?.data)
        } catch (error) {
            console.error("Error fetching quiz details:", error)
        } finally {
            setFetching(false)
        }
    }

    const handleSelectAnswer = (questionId: string, option: "A" | "B" | "C" | "D") => {
        setAnswers((prev) => ({ ...prev, [questionId]: option }))
    }

    const handleSubmit = async () => {
        if (!quiz) return

        const unanswered = quiz.questions.filter((q) => !answers[q._id])
        if (unanswered.length > 0 && timeLeft !== 0) {
            toast.error("Please answer all questions before submitting")
            return
        }

        const payload: SubmitQuizData = {
            answers: quiz.questions
                .filter((q) => answers[q._id])
                .map((q) => ({
                    question: q._id,
                    answer: answers[q._id],
                })),
        }

        try {
            setSubmitting(true)
            const response = await apiSubmitQuiz(quiz._id, payload)
            const maxScore = quiz.questions.length * (quiz.score_per_question ?? 1)
            setResultData({
                score: response?.data?.data?.score,
                total: maxScore,
            })
            setShowResult(true)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "an error occurred while submitting the quiz")
            }
        } finally {
            setSubmitting(false)
        }
    }

    submitRef.current = handleSubmit

    const answeredCount = quiz ? Object.keys(answers).length : 0
    const progress = quiz && quiz.questions.length > 0
        ? (answeredCount / quiz.questions.length) * 100
        : 0

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    }

    return (<>

        <Dialog open={open} onOpenChange={() => { }}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="sm:max-w-3xl w-[95%] p-6 max-h-[85vh] overflow-y-auto [&>button]:hidden"
            >
                {(loading || fetching) ? (
                    <div className="flex items-center justify-center py-10">
                        <Loader2Icon className="w-6 h-6 animate-spin text-emerald-500" />
                    </div>
                ) : quiz ? (
                    <>
                        <DialogHeader>
                            <div className="flex items-center justify-between gap-3">
                                <DialogTitle className="text-lg font-bold text-slate-900">
                                    {quiz.title}
                                </DialogTitle>
                                {timeLeft !== null && (
                                    <div
                                        className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full shrink-0 transition-colors ${timeLeft <= 30
                                            ? "bg-red-50 text-red-600 animate-pulse"
                                            : "bg-emerald-50 text-emerald-700"
                                            }`}
                                    >
                                        <Clock className="w-3.5 h-3.5" />
                                        {formatTime(timeLeft)}
                                    </div>
                                )}
                            </div>
                        </DialogHeader>

                        {quiz.description && (
                            <p className="text-sm text-gray-500 mb-1">{quiz.description}</p>
                        )}

                        {/* Progress bar */}
                        <div className="mb-2 mt-2">
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div
                                    className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1.5">
                                {answeredCount} from {quiz.questions.length} answered
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 mt-3">
                            {quiz.questions?.map((q, index) => (
                                <div
                                    key={q._id}
                                    className="border border-gray-100 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
                                    style={{ animationDelay: `${index * 60}ms` }}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 transition-colors ${answers[q._id]
                                                ? "bg-emerald-500 text-white"
                                                : "bg-emerald-100 text-emerald-700"
                                                }`}
                                        >
                                            {index + 1}
                                        </span>
                                        <p className="font-semibold text-sm text-slate-900">
                                            {q.title}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {(["A", "B", "C", "D"] as const).map((key) => (
                                            <label
                                                key={key}
                                                className={`relative flex items-center gap-2 border-2 rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-all duration-150 ${answers[q._id] === key
                                                    ? "border-emerald-500 bg-emerald-50 shadow-sm"
                                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={q._id}
                                                    checked={answers[q._id] === key}
                                                    onChange={() => handleSelectAnswer(q._id, key)}
                                                    className="accent-emerald-600 w-4 h-4 transition-transform duration-150"
                                                />
                                                <span className={answers[q._id] === key ? "font-medium text-emerald-800" : "text-slate-700"}>
                                                    {q.options[key]}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Sticky footer */}
                        <div className=" bottom-0 bg-white pt-4 -mx-6 px-6 border-t border-gray-100 mt-4">
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                {submitting && <Loader2Icon className="w-4 h-4 animate-spin" />}
                                {submitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>

                    </>
                ) : (
                    <div className="text-center py-10 text-gray-400">
                        No quiz data found.
                    </div>
                )}
            </DialogContent>
        </Dialog>

        <QuizResultModal
            open={showResult}
            score={resultData.score}
            total={resultData.total}
            onClose={() => {
                setShowResult(false)
                onClose?.()
            }}
        />

    </>
    )
}