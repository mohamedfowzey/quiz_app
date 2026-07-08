"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGetAllQuizResults } from "@/app/api/quizApi/QuizApis";

interface QuizDetails {
  _id: string;
  title: string;
  questions_number: number;
  schadule: string;
  difficulty?: string;
  type?: string;
  duration?: number;
}

interface QuizResultItem {
  quiz: QuizDetails;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await apiGetAllQuizResults();
        if (response && response.data) {
          setResults(response.data);
        }
      } catch (error) {
        console.error("Error fetching all quiz results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const formatDate = (isoString: string) => {
    if (!isoString) return "12 / 02 / 2023";
    const dateObj = new Date(isoString);
    return dateObj
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, " / ");
  };

  return (
    <div className="p-6 mx-auto min-h-screen text-gray-900">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        {/* عنوان الصفحة */}
        <h2 className="text-xl font-bold text-slate-900 mb-5">
          Completed Quizzes
        </h2>

        {loading ? (
          <div className="text-center py-8 text-gray-500 font-medium">
            Loading results...
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-left bg-white">
              <thead>
                <tr className="bg-[#0b132b] text-white">
                  <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40">
                    Title
                  </th>
                  <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40">
                    Difficulty
                  </th>
                  <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40">
                    No. of questions
                  </th>
                  <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40">
                    Duration
                  </th>
                  <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40">
                    Date
                  </th>
                  <th className="py-3.5 px-4 text-sm font-semibold w-[100px]"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {!results || results.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-gray-400 font-medium"
                    >
                      No completed quizzes available.
                    </td>
                  </tr>
                ) : (
                  results.map((item) => (
                    <tr
                      key={item.quiz?._id}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-slate-800 border-r border-gray-200 capitalize">
                        {item.quiz?.title || "Untitled Quiz"}
                      </td>

                      <td className="py-3 px-4 text-sm text-slate-600 border-r border-gray-200 capitalize">
                        {item.quiz?.difficulty || "medium"}
                      </td>

                      <td className="py-3 px-4 text-sm text-slate-600 border-r border-gray-200">
                        {item.quiz?.questions_number || 0}
                      </td>

                      <td className="py-3 px-4 text-sm text-slate-600 border-r border-gray-200">
                        {item.quiz?.duration || 0} minutes
                      </td>

                      <td className="py-3 px-4 text-sm text-slate-600 border-r border-gray-200">
                        {formatDate(item.quiz?.schadule)}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() =>
                            router.push(`/instructor/results/${item.quiz?._id}`)
                          }
                          className="w-full bg-[#c5e1a5] hover:bg-[#b3d78c] text-slate-900 font-bold text-xs py-1.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
