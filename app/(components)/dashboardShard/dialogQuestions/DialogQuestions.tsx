'use client'

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { CheckIcon, Loader2Icon, CirclePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const questionSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  optionA: z.string().min(1, "option A is required"),
  optionB: z.string().min(1, "option B is required"),
  optionC: z.string().min(1, "option C is required"),
  optionD: z.string().min(1, "option D is required"),
  answer: z.enum(["A", "B", "C", "D"], { message: "select the correct answer" }),
  difficulty: z.enum(["easy", "medium", "hard"], { message: "select the difficulty level" }),
  type: z.enum(["FE", "BE", "DO"], { message: "select the type" }),
})

type QuestionFormValues = z.infer<typeof questionSchema>

export interface QuestionData {
  _id: string
  title: string
  description?: string
  options: { A: string; B: string; C: string; D: string }
  answer: "A" | "B" | "C" | "D"
  difficulty: "easy" | "medium" | "hard"
  type: "FE" | "BE" | "DO"
}

interface DialogQuestionsProps {
  token?: string
  onCreated?: () => void
  mode?: "create" | "edit"
  initialData?: QuestionData
  onUpdated?: () => void
  onClose?: () => void
}

export function DialogQuestions({
  token,
  onCreated,
  mode = "create",
  initialData,
  onUpdated,
  onClose,
}: DialogQuestionsProps) {
  const isEdit = mode === "edit"

  // في الـ edit mode الديالوج يفتح تلقائي
  const [open, setOpen] = useState(isEdit)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, control, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<QuestionFormValues>({
      resolver: zodResolver(questionSchema),
      defaultValues: {
        title: initialData?.title ?? "",
        description: initialData?.description ?? "",
        optionA: initialData?.options.A ?? "",
        optionB: initialData?.options.B ?? "",
        optionC: initialData?.options.C ?? "",
        optionD: initialData?.options.D ?? "",
        answer: initialData?.answer ?? undefined,
        difficulty: initialData?.difficulty ?? undefined,
        type: initialData?.type ?? undefined,
      },
    })

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      reset()
      setSubmitError(null)
      onClose?.()
    }
  }

  const onSubmit = async (values: QuestionFormValues) => {
    setSubmitError(null)
    const payload = {
      title: values.title,
      description: values.description,
      options: { A: values.optionA, B: values.optionB, C: values.optionC, D: values.optionD },
      answer: values.answer,
      difficulty: values.difficulty,
      type: values.type,
    }

    try {
      const url = isEdit
        ? `https://upskilling-egypt.com:3005/api/question/${initialData?._id}`
        : "https://upskilling-egypt.com:3005/api/question"

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Request failed")

      toast.success(isEdit ? "Question updated successfully" : "Question created successfully")
      reset()
      isEdit ? onUpdated?.() : onCreated?.()
      setOpen(false)
      onClose?.()
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.")
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* الـ trigger بيظهر بس في create mode */}
      {!isEdit && (
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-white text-[16px] text-dark rounded-4xl border-2 border-gray-300 border-solid">
            <CirclePlus size={20} strokeWidth={3} className="text-dark" />
            Add Question
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-2xl w-[90%] p-5 overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-start justify-between border-b-4 border-gray-300 pb-2 mb-4">
            <h2 className="text-2xl font-bold">
              {isEdit ? "Edit question" : "Set up a new question"}
            </h2>
            <div className="flex items-center mx-10 gap-2">
              <Button
                type="submit"
                size="icon"
                variant="outline"
                disabled={isSubmitting}
                className="rounded-full bg-[#FFEDDF] text-dark"
              >
                {isSubmitting ? <Loader2Icon className="animate-spin" /> : <CheckIcon size={25} />}
              </Button>
            </div>
          </div>

          {submitError && <p className="text-sm text-destructive mt-2">{submitError}</p>}

          <FieldGroup>
            <p className="font-semibold">Details</p>

            <Field>
              <div className="flex items-center justify-between border-2 border-solid border-gray-300 rounded-lg">
                <Label className="bg-[#FFEDDF] py-3 rounded-lg px-10" htmlFor="question-title">Title:</Label>
                <Input className="border-0 focus-visible:ring-0" id="question-title" {...register("title")} />
              </div>
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            <Field>
              <div className="flex items-center justify-between border-2 border-solid border-gray-300 rounded-lg">
                <Label className="bg-[#FFEDDF] py-6 rounded-lg px-10" htmlFor="question-description">Description</Label>
                <Textarea className="border-0 focus-visible:ring-0" id="question-description" rows={3} {...register("description")} />
              </div>
              {errors.description && <FieldError>{errors.description.message}</FieldError>}
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(["A", "B", "C", "D"] as const).map((letter) => (
                <Field key={letter}>
                  <div className="flex items-center justify-between border-2 border-solid border-gray-300 rounded-lg">
                    <Label className="bg-[#FFEDDF] py-3 rounded-lg px-10" htmlFor={`option-${letter.toLowerCase()}`}>
                      {letter}
                    </Label>
                    <Input
                      className="border-0 focus-visible:ring-0"
                      id={`option-${letter.toLowerCase()}`}
                      {...register(`option${letter}` as "optionA" | "optionB" | "optionC" | "optionD")}
                    />
                  </div>
                  {errors[`option${letter}` as keyof typeof errors] && (
                    <FieldError>
                      {errors[`option${letter}` as keyof typeof errors]?.message}
                    </FieldError>
                  )}
                </Field>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field>
                <Label htmlFor="answer">Right Answer</Label>
                <Controller name="answer" control={control} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="answer" className="w-full"><SelectValue placeholder="Choose" /></SelectTrigger>
                    <SelectContent>
                      {["A", "B", "C", "D"].map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )} />
                {errors.answer && <FieldError>{errors.answer.message}</FieldError>}
              </Field>

              <Field>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Controller name="difficulty" control={control} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="difficulty" className="w-full"><SelectValue placeholder="Choose" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
                {errors.difficulty && <FieldError>{errors.difficulty.message}</FieldError>}
              </Field>

              <Field>
                <Label htmlFor="type">Category type</Label>
                <Controller name="type" control={control} render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="type" className="w-full"><SelectValue placeholder="Choose" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FE">FE</SelectItem>
                      <SelectItem value="BE">BE</SelectItem>
                      <SelectItem value="DO">DO</SelectItem>
                    </SelectContent>
                  </Select>
                )} />
                {errors.type && <FieldError>{errors.type.message}</FieldError>}
              </Field>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}