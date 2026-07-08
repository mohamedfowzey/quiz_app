'use client'

import { useState, useMemo } from "react"
import { CustomTable, Question } from '@/app/(components)/dashboardShard/customTable/customTable'
import { DialogQuestions } from '@/app/(components)/dashboardShard/dialogQuestions/DialogQuestions'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { SearchIcon } from "lucide-react"

interface QuestionsClientProps {
  initialQuestions: Question[]
  token?: string
}

const PAGE_SIZE = 10

export function QuestionsClient({ initialQuestions, token }: QuestionsClientProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [difficulty, setDifficulty] = useState<string>("all")
  const [type, setType] = useState<string>("all")
  const [searching, setSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // الـ fetch العادي بدون filters
  const fetchQuestions = async () => {
    try {
      const res = await fetch('https://upskilling-egypt.com:3005/api/question', {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      if (!res.ok) return
      const data = await res.json()
      const arr: Question[] = (Array.isArray(data) ? data : []).map((item: any) => ({
        _id: item._id,
        title: item.title,
        description: item.description,
        difficulty: item.difficulty,
        type: item.type,
      }))
      setQuestions(arr)
      setCurrentPage(1)
    } catch (err) {
      console.error("Failed to refresh questions", err)
    }
  }

 
const handleDeleted = (id: string) => {
  setQuestions((prev) => {
    const updated = prev.filter((q) => q._id !== id)
    
    // لو الصفحة الحالية بقت فاضية بعد الحذف، ارجع للصفحة اللي قبلها
    const newTotalPages = Math.ceil(updated.length / PAGE_SIZE)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }

    return updated
  })
}

  // الـ search بيبعت POST مع query params
  const handleSearch = async (diff: string, tp: string) => {
    // لو الاتنين "all" ارجع للـ getAll العادي
    if (diff === "all" && tp === "all") {
      await fetchQuestions()
      return
    }

    try {
      setSearching(true)
      const params = new URLSearchParams()
      if (diff !== "all") params.append("difficulty", diff)
      if (tp !== "all") params.append("type", tp)

      const res = await fetch(
        `https://upskilling-egypt.com:3005/api/question/search?${params.toString()}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) return
      const data = await res.json()
      const arr: Question[] = (Array.isArray(data) ? data : []).map((item: any) => ({
        _id: item._id,
        title: item.title,
        description: item.description,
        difficulty: item.difficulty,
        type: item.type,
      }))
      setQuestions(arr)
      setCurrentPage(1)
    } catch (err) {
      console.error("Search failed", err)
    } finally {
      setSearching(false)
    }
  }

  const handleDifficultyChange = (val: string) => {
    setDifficulty(val)
    handleSearch(val, type)
  }

  const handleTypeChange = (val: string) => {
    setType(val)
    handleSearch(difficulty, val)
  }

  // Pagination — بيتحسب من الـ questions array
  const totalPages = Math.ceil(questions.length / PAGE_SIZE)
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return questions.slice(start, start + PAGE_SIZE)
  }, [questions, currentPage])

  return (
    <div className="mt-4 w-[90%] mx-auto border-2 border-gray-300 border-solid p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">

      {/* Header */}
      <div className="flex  justify-between items-center w-[95%] mx-auto mb-4">
        <div className="text-[20px] font-bold">Bank Of Questions</div>
        <DialogQuestions token={token} onCreated={fetchQuestions} />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 w-[95%] mx-auto mb-4">
        

        <Select value={difficulty} onValueChange={handleDifficultyChange}>
          <SelectTrigger className="w-[20%]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[20%]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="FE">FE</SelectItem>
            <SelectItem value="BE">BE</SelectItem>
            <SelectItem value="DO">DO</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset */}
        {(difficulty !== "all" || type !== "all") && (
          <button
            onClick={() => {
              setDifficulty("all")
              setType("all")
              fetchQuestions()
            }}
            className="text-sm text-muted-foreground underline hover:text-foreground"
          >
            Reset
          </button>
        )}

        <div className=" flex items-center">
          <SearchIcon className="  size-5 text-muted-foreground pointer-events-none" />
          {searching && (
            <span className="  text-sm text-muted-foreground">searching...</span>
          )}
        </div>
      </div>

      {/* Table */}
      <CustomTable
        questions={paginatedQuestions}
        token={token}
        onUpdated={fetchQuestions}
        onDeleted={handleDeleted}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 mb-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

    </div>
  )
}