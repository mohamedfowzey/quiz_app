'use client'

import { useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"

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

 export interface Question {
  _id: string
  questionTitle: string
  questionDesc: string
  questionDifficultyLevel: string
  questionType: string
}

interface CustomTableProps {
  questions: Question[]
  token?: string
}

export function CustomTable({ questions, token }: CustomTableProps) {
  const [items, setItems] = useState<Question[]>(questions)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleEdit = (questionId: string) => {
    alert(`Edit question with ID: ${questionId}`)
  }

  const handleDelete = async (questionId: string) => {
    const confirmed = confirm("متأكد إنك عايز تحذف السؤال ده؟")
    if (!confirmed) return

    try {
      setDeletingId(questionId)

      const res = await fetch(
        `https://upskilling-egypt.com:3005/api/question/${questionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error("فشل حذف السؤال")
      }

      // شيل العنصر من الـ state بعد نجاح الحذف
      setItems((prev) => prev.filter((q) => q._id !== questionId))
    } catch (err) {
      alert("حصل خطأ أثناء الحذف")
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Table className="w-[80%] mx-auto my-10 text-center rounded-tl-xl rounded-tr-xl overflow-hidden">
      <TableHeader>
        <TableRow className="bg-[#0b132b] hover:bg-[#0b132b] hover:cursor-pointer border rounded-tl-xl overflow-hidden text-white">
          <TableHead className="text-center text-white border rounded-tl-xl">Question Title</TableHead>
          <TableHead className="text-center text-white border">Question Desc</TableHead>
          <TableHead className="text-center text-white border">Question difficulty level</TableHead>
          <TableHead className="text-center text-white border">Question Type</TableHead>
          <TableHead className="text-center text-white border rounded-tr-xl">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((q) => (
          <TableRow key={q._id}>
            <TableCell className="border">{q.questionTitle}</TableCell>
            <TableCell className="border">{q.questionDesc}</TableCell>
            <TableCell className="border">{q.questionDifficultyLevel}</TableCell>
            <TableCell className="border">{q.questionType}</TableCell>
            <TableCell className="border">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    disabled={deletingId === q._id}
                  >
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => handleEdit(q._id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(q._id)}
                  >
                    {deletingId === q._id ? "جاري الحذف..." : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}