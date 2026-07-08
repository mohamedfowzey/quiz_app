import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Check, X, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiCreateQuiz, CreateQuizData } from "@/app/api/quizApi/QuizApis";
import { getGroups } from "@/lib/group-service";
import axios from "axios";

interface CreateQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (code: string) => void;
}

interface Group {
  _id: string;
  name: string;
}

export default function CreateQuizModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateQuizModalProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuizData>({
    defaultValues: {
      title: "",
      description: "",
      duration: 10,
      questions_number: 1,
      score_per_question: 1,
      difficulty: "medium",
      type: "FE",
      group: "",
      date: "",
      time: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      const fetchGroups = async () => {
        try {
          setIsLoadingGroups(true);

          const result = await getGroups(1, 50);

          const fetchedGroups = Array.isArray(result)
            ? result
            : result?.data || [];

          setGroups(fetchedGroups);

          if (fetchedGroups.length > 0) {
            setValue("group", fetchedGroups[0]._id);
          }
        } catch (error) {
          console.error("Failed to fetch groups via server action:", error);
          toast.error("Could not load groups.");
        } finally {
          setIsLoadingGroups(false);
        }
      };

      fetchGroups();
    }
  }, [isOpen, setValue]);

  const onSubmit = async (data: CreateQuizData) => {
    try {
      if (!data.date || !data.time) {
        toast.error("Please select both date and time for the schedule.");
        return;
      }

      const combinedDateTime = new Date(
        `${data.date}T${data.time}:00`,
      ).toISOString();

      const requestData: CreateQuizData = {
        title: data.title,
        description: data.description || "",
        group: data.group,
        questions_number: Number(data.questions_number),
        difficulty: data.difficulty,
        type: data.type,
        schadule: combinedDateTime,
        duration: Number(data.duration),
        score_per_question: Number(data.score_per_question),
      };

      //   delete (requestData as any).questions;
      //   delete (requestData as any).date;
      //   delete (requestData as any).time;

      const res = await apiCreateQuiz(requestData);

      const generatedCode =
        res?.data?.code || res?.data?.data?.code || "A123DDS";

      toast.success("Quiz created successfully!");
      reset();
      onSuccess(generatedCode);
    } catch (error) {
      if(axios.isAxiosError(error)){

        toast.error(error?.response?.data?.message||"Failed to create quiz. Please try again.");
      }
      console.error("API Error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-[90vw] md:max-w-4xl lg:max-w-5xl p-0 overflow-hidden rounded-2xl gap-0 border-gray-100 [&>button]:hidden">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50 space-y-0">
          <DialogTitle className="text-xl font-bold text-slate-800">
            Set up a new quiz
          </DialogTitle>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || isLoadingGroups}
              className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              <Check className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </DialogHeader>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-sm"
        >
          <h4 className="font-bold text-slate-700 text-base mb-2">Details</h4>

          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="sm:w-32 bg-orange-100/70 text-slate-800 font-bold px-4 py-2 rounded-xl text-center">
              Title:
            </label>
            <div className="flex-1">
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-slate-500"
              />
              {errors.title && (
                <span className="text-xs text-rose-500 mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>

          {/* Selectors Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Duration */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
              <span className="bg-orange-100/70 text-slate-800 font-bold px-3 py-2 shrink-0">
                Duration <span className="text-xs font-normal">(mins)</span>
              </span>
              <select
                {...register("duration")}
                className="w-full bg-transparent px-2 py-2 focus:outline-none font-medium"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
              </select>
            </div>

            {/* No. of questions */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
              <span className="bg-orange-100/70 text-slate-800 font-bold px-3 py-2 shrink-0">
                No. of questions
              </span>
              <select
                {...register("questions_number")}
                className="w-full bg-transparent px-2 py-2 focus:outline-none font-medium"
              >
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* Score per question */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
              <span className="bg-orange-100/70 text-slate-800 font-bold px-3 py-2 shrink-0">
                Score per question
              </span>
              <select
                {...register("score_per_question")}
                className="w-full bg-transparent px-2 py-2 focus:outline-none font-medium"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="w-32 bg-orange-100/70 text-slate-800 font-bold px-4 py-1.5 rounded-xl text-center">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-slate-500"
            />
          </div>

          {/* Schedule */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-orange-100/70 text-slate-800 font-bold px-4 py-2 rounded-xl text-center">
              Schedule
            </span>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <input
                type="date"
                {...register("date", { required: true })}
                className="focus:outline-none font-medium"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <input
                type="time"
                {...register("time", { required: true })}
                className="focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Bottom Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Difficulty */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
              <span className="bg-orange-100/70 text-slate-800 font-bold px-3 py-2 shrink-0">
                Difficulty level
              </span>
              <select
                {...register("difficulty")}
                className="w-full bg-transparent px-2 py-2 focus:outline-none font-medium"
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>

            {/* Category type */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
              <span className="bg-orange-100/70 text-slate-800 font-bold px-3 py-2 shrink-0">
                Category type
              </span>
              <select
                {...register("type")}
                className="w-full bg-transparent px-2 py-2 focus:outline-none font-medium"
              >
                <option value="FE">FE</option>
                <option value="BE">BE</option>
              </select>
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
              <span className="bg-orange-100/70 text-slate-800 font-bold px-3 py-2 shrink-0">
                Group name
              </span>
              <select
                {...register("group", { required: "Group is required" })}
                className="w-full bg-transparent px-2 py-2 focus:outline-none font-medium"
                disabled={isLoadingGroups}
              >
                {isLoadingGroups ? (
                  <option>Loading groups...</option>
                ) : groups.length === 0 ? (
                  <option value="">No groups found</option>
                ) : (
                  groups.map((g) => (
                    <option key={g._id} value={g._id}>
                      {g.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
