'use client'

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Loader2Icon } from "lucide-react"

interface QuestionDetails {
  _id: string
  title: string
  description: string
  options: { A: string; B: string; C: string; D: string }
  answer: string
  difficulty: string
  type: string
}

interface ViewQuestionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  question: QuestionDetails | null
  loading: boolean
}

const difficultyColor: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
}

export function ViewQuestionDialog({ open, onOpenChange, question, loading }: ViewQuestionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl w-[90%] p-6">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2Icon className="animate-spin size-8 text-muted-foreground" />
          </div>
        ) : question ? (
          <div className="flex flex-col gap-5">

            {/* Header */}
            <div className="border-b-4 border-gray-300 pb-3">
              <h2 className="text-2xl font-bold">{question.title}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${difficultyColor[question.difficulty] ?? "bg-gray-100 text-gray-600"}`}>
                  {question.difficulty}
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {question.type}
                </span>
              </div>
            </div>

            {/* Description */}
            {question.description && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Description</p>
                <p className="text-sm">{question.description}</p>
              </div>
            )}

            {/* Options */}
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Options</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(["A", "B", "C", "D"] as const).map((letter) => (
                  <div
                    key={letter}
                    className={`flex items-center gap-3 border-2 rounded-lg px-4 py-2 transition-colors ${
                      question.answer === letter
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : "border-gray-200"
                    }`}
                  >
                    <span className={`font-bold text-sm w-6 h-6 flex items-center justify-center rounded-full ${
                      question.answer === letter
                        ? "bg-green-500 text-white"
                        : "bg-[#FFEDDF] text-dark"
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm">{question.options[letter]}</span>
                    {question.answer === letter && (
                      <span className="ml-auto text-xs text-green-600 font-medium">✓ Correct</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}