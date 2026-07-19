"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiGetAllQuizzes } from "@/app/api/quizApi/QuizApis";

interface QuizItem {
  _id: string;
  title: string;
  questions_number: number;
  schadule: string;
  difficulty?: string;
  type?: string;
  duration?: number;
  code?: string;
}

export default function QuizzesPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await apiGetAllQuizzes();

        if (response && response.data) {
          const fetchedData = Array.isArray(response.data)
            ? response.data
            : response?.data || [];
          setQuizzes(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching all quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
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
    <div className="p-4 md:p-6 mx-auto min-h-screen text-gray-900">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-5">All Quizzes</h2>

        {loading ? (
          <div className="text-center py-8 text-gray-500 font-medium">
            Loading quizzes...
          </div>
        ) : !quizzes || quizzes.length === 0 ? (
          <div className="text-center py-8 text-gray-400 font-medium">
            No quizzes available.
          </div>
        ) : (
          <div>
            <div className="hidden md:block w-full overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse text-left bg-white table-fixed min-w-[700px]">
                <thead className="sticky top-0 z-10 bg-[#0b132b] text-white">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40 w-[25%]">
                      Title
                    </th>
                    <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40 w-[15%]">
                      Difficulty
                    </th>
                    <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40 w-[20%]">
                      No. of questions
                    </th>
                    <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40 w-[15%]">
                      Duration
                    </th>
                    <th className="py-3.5 px-4 text-sm font-semibold border-r border-gray-700/40 w-[15%]">
                      Date
                    </th>
                    <th className="py-3.5 px-4 text-sm font-semibold w-[10%] text-center"></th>
                  </tr>
                </thead>
              </table>

              <div
                className="max-h-[312px] overflow-y-auto w-full 
                  [&::-webkit-scrollbar]:display-none 
                  [&::-webkit-scrollbar]:w-0 
                  [&::-webkit-scrollbar]:bg-transparent"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <table className="w-full border-collapse text-left bg-white table-fixed min-w-[700px]">
                  <tbody className="divide-y divide-gray-200">
                    {quizzes.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50/60 transition-colors h-[52px]"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-slate-800 border-r border-gray-200 capitalize truncate w-[25%]">
                          {item.title || "Untitled Quiz"}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 border-r border-gray-200 capitalize truncate w-[15%]">
                          {item.difficulty || "medium"}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 border-r border-gray-200 truncate w-[20%]">
                          {item.questions_number || 0}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 border-r border-gray-200 truncate w-[15%]">
                          {item.duration || 0} minutes
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 border-r border-gray-200 truncate w-[15%]">
                          {formatDate(item.schadule)}
                        </td>
                        <td className="py-2 px-4 text-center w-[10%]">
                          <button
                            onClick={() =>
                              router.push(`/instructor/quizzes/${item._id}`)
                            }
                            className="w-full bg-[#c5e1a5] hover:bg-[#b3d78c] text-slate-900 font-bold text-xs py-1.5 px-3 rounded-xl transition-all shadow-xs cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="block md:hidden flex flex-col gap-4">
              {quizzes.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-50/50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3 shadow-xs"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-base text-slate-800 capitalize truncate">
                      {item.title || "Untitled Quiz"}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg capitalize shrink-0">
                      {item.difficulty || "medium"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-600 border-t border-gray-100 pt-3">
                    <div>
                      <span className="text-gray-400 block mb-0.5">
                        Questions
                      </span>
                      <span className="font-semibold text-slate-700">
                        {item.questions_number || 0} Qs
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-0.5">
                        Duration
                      </span>
                      <span className="font-semibold text-slate-700">
                        {item.duration || 0} mins
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-400 block mb-0.5">Date</span>
                      <span className="font-semibold text-slate-700">
                        {formatDate(item.schadule)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-1">
                    <button
                      onClick={() =>
                        router.push(`/instructor/quizzes/${item._id}`)
                      }
                      className="w-full bg-[#c5e1a5] hover:bg-[#b3d78c] text-slate-900 font-bold text-sm py-2 px-4 rounded-xl transition-all shadow-xs text-center cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
