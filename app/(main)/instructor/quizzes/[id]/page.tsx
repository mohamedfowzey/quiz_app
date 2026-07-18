"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { apiGetQuizById,  QuizDetails } from "@/app/api/quizApi/QuizApis";

export default function QuizDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        const response = await apiGetQuizById(id as string);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium">
        Loading quiz details...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500">
        <p>Quiz not found or error occurred.</p>
        <button
          onClick={() => router.back()}
          className="text-emerald-600 font-bold hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const dateObj = new Date(quiz.schadule);
  const formattedDate = dateObj.toLocaleDateString("en-GB");
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen text-gray-900">
      {/* Breadcrumb / Navigation upper side */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-6">
        <button
          onClick={() => router.back()}
          className="hover:text-slate-900 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Quizzes
        </button>
        <span className="text-gray-400">»</span>
        <span className="text-slate-900 font-semibold">{quiz.title}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm max-w-xl">
        <h1 className="text-2xl font-bold text-center bg-slate-900 rounded-lg text-white py-2 mb-4 capitalize">
          {quiz.title}
        </h1>

        {/* Date & Time Row */}
        <div className="flex justify-center gap-6  text-slate-700 font-medium mb-6">
          <div className="flex items-center  gap-2">
            <Calendar className="w-5 h-5 text-slate-800" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-800" />
            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Details List */}
        <div className="flex flex-col gap-3.5 mb-6">
          {/* Duration */}
          <div className="flex items-center">
            <span className="w-44 bg-orange-100/70 border border-orange-200/40 text-slate-800 font-semibold py-1.5 px-4 rounded-l-xl text-sm">
              Duration
            </span>
            <span className="flex-1 border border-l-0 border-gray-200 py-1.5 px-4 rounded-r-xl text-sm font-medium  text-slate-700 bg-white">
              {quiz.duration} min
            </span>
          </div>

          {/* Number of questions */}
          <div className="flex items-center">
            <span className="w-44 bg-orange-100/70 border border-orange-200/40 text-slate-800 font-semibold py-1.5 px-4 rounded-l-xl text-sm">
              Number of questions
            </span>
            <span className="flex-1 border border-l-0 border-gray-200 py-1.5 px-4 rounded-r-xl text-sm font-medium text-slate-700 bg-white">
              {quiz.questions_number}
            </span>
          </div>

          {/* Score per question */}
          <div className="flex items-center">
            <span className="w-44 bg-orange-100/70 border border-orange-200/40 text-slate-800 font-semibold py-1.5 px-4 rounded-l-xl text-sm">
              Score per question
            </span>
            <span className="flex-1 border border-l-0 border-gray-200 py-1.5 px-4 rounded-r-xl text-sm font-medium text-slate-700 bg-white">
              {quiz.score_per_question}
            </span>
          </div>

          {/* Description Block */}
          <div className="flex flex-col mt-1">
            <span className="w-36 bg-orange-100/70 border border-orange-200/40 text-slate-800 font-semibold py-1.5 px-4 rounded-t-xl text-sm">
              Description
            </span>
            <div className="border border-gray-200 p-4 rounded-b-xl rounded-r-xl text-sm text-gray-600 bg-white min-h-[80px] leading-relaxed">
              {quiz.description || "No description provided for this quiz."}
            </div>
          </div>

          {/* Question bank used */}
          <div className="flex items-center mt-1">
            <span className="w-44 bg-orange-100/70 border border-orange-200/40 text-slate-800 font-semibold py-1.5 px-4 rounded-l-xl text-sm">
              Question bank used
            </span>
            <span className="flex-1 border border-l-0 border-gray-200 py-1.5 px-4 rounded-r-xl text-sm font-medium text-slate-700 bg-white">
              {quiz.type ? `${quiz.type} Bank` : "General Bank"}
            </span>
          </div>
        </div>

        {/* Randomize Custom Checkbox Row */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="randomize"
            checked
            readOnly
            className="w-4 h-4 rounded text-[#0b132b] focus:ring-[#0b132b] border-gray-300 accent-[#0b132b]"
          />
          <label
            htmlFor="randomize"
            className="text-sm font-bold text-slate-900 select-none"
          >
            Randomize questions
          </label>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-[#0b132b] text-white font-semibold text-sm py-2 px-6 rounded-xl hover:bg-[#1c2541] transition-all cursor-pointer shadow-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
