'use client'

import { useEffect, useState } from "react"
import { Eye, LucideTrash2, MoreHorizontalIcon, SquarePen } from "lucide-react"
import { DialogQuestions, QuestionData } from "../dialogQuestions/DialogQuestions"
import { ViewQuestionDialog } from "../viewQuestion/ViewQuestionDialog"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertDialogDestructive } from "../deleteConfirmation/DeleteConfirmation"
import { toast } from "sonner"

export interface Question {
  _id: string
  title: string
  description: string
  difficulty: string
  type: string
}

interface CustomTableProps {
  questions: Question[]
  token?: string
  onUpdated?: () => void
  onDeleted?: (id: string) => void  

}
interface QuestionDetails {
  _id: string
  title: string
  description: string
  options: { A: string; B: string; C: string; D: string }
  answer: string
  difficulty: string
  type: string
}

const difficultyColor: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
}

export function CustomTable({ questions, token, onUpdated, onDeleted }: CustomTableProps) {
  const [deletingLoadingId, setDeletingLoadingId] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [targetId, setTargetId] = useState<string | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<QuestionData | null>(null)
  const [fetchingEditId, setFetchingEditId] = useState<string | null>(null)
  // view question dialog state
  const [viewOpen, setViewOpen] = useState(false)
  const [viewQuestion, setViewQuestion] = useState<QuestionDetails | null>(null)
  const [fetchingViewId, setFetchingViewId] = useState<string | null>(null)



  // fetch question data for viewing
  const handleViewClick = async (id: string) => {
    try {
      setFetchingViewId(id)
      setViewOpen(true)
      setViewQuestion(null)

      const res = await fetch(
        `https://upskilling-egypt.com:3005/api/question/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      const q = data?.data ?? data
      setViewQuestion({
        _id: q._id,
        title: q.title,
        description: q.description ?? "",
        options: {
          A: q.options?.A ?? "",
          B: q.options?.B ?? "",
          C: q.options?.C ?? "",
          D: q.options?.D ?? "",
        },
        answer: q.answer,
        difficulty: q.difficulty,
        type: q.type,
      })
    } catch (err) {
      toast.error("Failed to load question")
      setViewOpen(false)
    } finally {
      setFetchingViewId(null)
    }
  }

  // fetch question data for editing
  const handleEditClick = async (id: string) => {
    try {
      setFetchingEditId(id)
      const res = await fetch(
        `https://upskilling-egypt.com:3005/api/question/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (!res.ok) throw new Error("Failed to fetch question")
      const data = await res.json()
      // الـ API بيرجع { data: {...} } في الـ getById
      const q = data?.data ?? data
      setEditingQuestion({
        _id: q._id,
        title: q.title,
        description: q.description ?? "",
        options: {
          A: q.options?.A ?? "",
          B: q.options?.B ?? "",
          C: q.options?.C ?? "",
          D: q.options?.D ?? "",
        },
        answer: q.answer,
        difficulty: q.difficulty,
        type: q.type,
      })
    } catch (err) {
      toast.error("Failed to load question data")
    } finally {
      setFetchingEditId(null)
    }
  }
  // fetch question data for delete
 const confirmDelete = async () => {
  if (!targetId) return
  const questionId = targetId
  try {
    setDeletingLoadingId(true)
    const res = await fetch(
      `https://upskilling-egypt.com:3005/api/question/${questionId}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.ok) throw new Error("Failed")
    onDeleted?.(questionId)  // بلّغ QuestionsClient يشيله من questions
    toast.success("Question deleted successfully")
  } catch (err) {
    toast.error("Failed to delete the question. Please try again.")
  } finally {
    setDeletingLoadingId(false)
    setTargetId(null)
    setDialogOpen(false)
  }
}

  const ActionsMenu = ({ id }: { id: string }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          disabled={deletingLoadingId || fetchingEditId === id}
        >
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => handleViewClick(id)}>
          <Eye /> View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEditClick(id)}>
          <SquarePen />  {fetchingEditId === id ? "Loading..." : "Edit"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => {
            e.preventDefault()
            setTargetId(id)
            setDialogOpen(true)
          }}
        >
          <LucideTrash2 /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );


  return (
    <>
      {/* Cards — mobile only */}
      <div className="flex flex-col gap-3 my-6 lg:hidden">
        {questions.map((q) => (
          <div
            key={q._id}
            className="border border-gray-200 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-start justify-between">
              <p className="font-semibold text-sm leading-snug">{q.title}</p>
              <ActionsMenu id={q._id} />
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {q.description}
            </p>
            <div className="flex items-center gap-2 flex-wrap mt-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${difficultyColor[q.difficulty] ?? "bg-gray-100 text-gray-600"}`}>
                {q.difficulty}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {q.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table — lg and above */}
      <div className="hidden lg:block">
        <Table className="w-[95%] mx-auto my-2 text-center rounded-tl-xl overflow-hidden rounded-tr-xl">
          <TableHeader>
            <TableRow className="bg-[#0b132b] hover:bg-[#0b132b] hover:cursor-pointer border overflow-hidden rounded-tl-xl text-white">
              <TableHead className="text-center text-white border rounded-tl-xl">Question Title</TableHead>
              <TableHead className="text-center text-white border">Question Desc</TableHead>
              <TableHead className="text-center text-white border">Question difficulty level</TableHead>
              <TableHead className="text-center text-white border">Question Type</TableHead>
              <TableHead className="text-center text-white border rounded-tr-xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((q) => (
              <TableRow key={q._id}>
                <TableCell className="border">{q.title}</TableCell>
                <TableCell className="border">{q.description}</TableCell>
                <TableCell className="border">{q.difficulty}</TableCell>
                <TableCell className="border">{q.type}</TableCell>
                <TableCell className="border">
                  <ActionsMenu id={q._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Edit Dialog — */}
      {editingQuestion && (
        <DialogQuestions
          mode="edit"
          token={token}
          initialData={editingQuestion}
          onUpdated={() => {
            setEditingQuestion(null)
            onUpdated?.()
          }}
          onClose={() => setEditingQuestion(null)}
        />
      )}
      {/* View Dialog — */}
      <ViewQuestionDialog
        open={viewOpen}
        onOpenChange={(next) => {
          setViewOpen(next)
          if (!next) setViewQuestion(null)
        }}
        question={viewQuestion}
        loading={fetchingViewId !== null}
      />

      {/* Delete Dialog */}
      <AlertDialogDestructive
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Question"
        tDescription="Are you sure you want to delete this question? This action cannot be undone."
        onDelete={confirmDelete}
        loading={deletingLoadingId}
      />
    </>
  )
}