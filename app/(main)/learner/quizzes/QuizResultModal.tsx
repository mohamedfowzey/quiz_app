'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CheckCircle2, PartyPopper } from "lucide-react"
import { useEffect, useState } from "react"

interface QuizResultModalProps {
    open: boolean
    score?: number
    total?: number
    onClose: () => void
}

export function QuizResultModal({ open, score, total, onClose }: QuizResultModalProps) {
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        if (open) {
            setShowContent(false)
            const timer = setTimeout(() => setShowContent(true), 150)
            return () => clearTimeout(timer)
        }
    }, [open])

    const percentage = score !== undefined && total ? Math.round((score / total) * 100) : null

    return (
        <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
            <DialogContent className="sm:max-w-md w-[90%] p-8 text-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full opacity-0 animate-in fade-in zoom-in duration-700 fill-mode-both" style={{ animationDelay: "100ms" }} />
                    <div className="absolute -bottom-16 -right-10 w-48 h-48 bg-emerald-50 rounded-full opacity-0 animate-in fade-in zoom-in duration-700 fill-mode-both" style={{ animationDelay: "250ms" }} />
                </div>

                <div className="relative flex flex-col items-center gap-4">
                    <div
                        className={`flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500 transition-all duration-500 ${showContent ? "scale-100 opacity-100" : "scale-0 opacity-0"
                            }`}
                    >
                        <CheckCircle2 className="w-11 h-11 text-white" strokeWidth={2.5} />
                    </div>

                    <div
                        className={`flex flex-col items-center gap-1 transition-all duration-500 delay-150 ${showContent ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                            }`}
                    >
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            Your answers have been submitted successfully
                            <PartyPopper className="w-5 h-5 text-emerald-500" />
                        </h2>
                        <p className="text-sm text-gray-500">Great job! You have completed the quiz.</p>
                    </div>

                    {percentage !== null && (
                        <div
                            className={`w-full flex flex-col items-center gap-3 mt-2 transition-all duration-500 delay-300 ${showContent ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                                }`}
                        >
                            <div className="relative w-28 h-28 flex items-center justify-center">
                                <svg className="w-28 h-28 -rotate-90">
                                    <circle
                                        cx="56" cy="56" r="48"
                                        fill="none" stroke="#e5e7eb" strokeWidth="8"
                                    />
                                    <circle
                                        cx="56" cy="56" r="48"
                                        fill="none" stroke="#10b981" strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={2 * Math.PI * 48}
                                        strokeDashoffset={
                                            showContent
                                                ? 2 * Math.PI * 48 * (1 - percentage / 100)
                                                : 2 * Math.PI * 48
                                        }
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <span className="absolute text-2xl font-bold text-slate-900">
                                    {percentage}%
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">
                                You scored {score} out of {total} points
                            </p>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className={`mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-all duration-500 delay-500 ${showContent ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}