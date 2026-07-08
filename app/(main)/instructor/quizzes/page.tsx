"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import alarm from "@/public/images/Quizzes/Linker.jpeg";
import question from "@/public/images/Quizzes/Linker2.jpeg";
import FileSpreadsheet from "@/public/images/Quizzes/Quiz img.png";
import Image from "next/image";
import CreateQuizModal from "./CreateQuizModal";
import { apiGetAllQuizzes, Quiz } from "@/app/api/quizApi/QuizApis";

export default function QuizzPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await apiGetAllQuizzes();
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const upcomingQuizzes = quizzes.filter((q) => q.status === "open");
  const completedQuizzes = quizzes.filter((q) => q.status === "closed");

  const formatDate = (isoString: string) => {
    const dateObj = new Date(isoString);
    return {
      date: dateObj.toLocaleDateString("en-GB"),
      time: dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="p-6 mx-auto min-h-screen text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-row gap-7">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-[150px] bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer group text-center"
          >
            <div className="group-hover:scale-105 transition-transform">
              <Image src={alarm} alt="Alarm" width={60} height={60} />
            </div>
            <span className="font-bold sm:text-[14px] text-slate-800 leading-tight">
              Set up a new quiz
            </span>
          </button>

          <button className="w-full h-[150px] bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer group text-center">
            <div className="group-hover:scale-105 transition-transform">
              <Image src={question} alt="question" width={60} height={60} />
            </div>
            <span className="font-bold sm:text-[14px] text-slate-800 leading-tight">
              Question Bank
            </span>
          </button>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 text-slate-900">
              Upcoming quizzes
            </h2>

            {loading ? (
              <div className="text-center py-6 text-gray-500 font-medium">
                Loading quizzes...
              </div>
            ) : upcomingQuizzes.length === 0 ? (
              <div className="text-center py-6 text-gray-400">
                No upcoming quizzes found.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {upcomingQuizzes.map((quiz) => {
                  const formatted = formatDate(quiz.schadule);
                  return (
                    <div
                      key={quiz._id}
                      className="flex flex-col md:flex-row border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors"
                    >
                      <div className="md:w-40 bg-orange-100/60 p-4 flex items-center justify-center min-h-[120px]">
                        <Image
                          src={FileSpreadsheet}
                          alt="File Spreadsheet"
                          width={92}
                          height={92}
                        />
                      </div>

                      <div className="flex-1 p-5 flex flex-col justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 mb-1">
                            {quiz.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{formatted.date}</span>
                            <span className="text-gray-300">|</span>
                            <span>{formatted.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                          <div className="text-sm font-medium text-slate-700">
                            No. of student's enrolled:{" "}
                            <span className="font-bold">
                              {quiz.participants}
                            </span>
                          </div>
                          <button className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer group">
                            Open
                            <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Completed Quizzes */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Completed Quizzes
              </h2>
              <button className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:underline cursor-pointer group">
                Results
                <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-6 text-gray-500 font-medium">
                  Loading...
                </div>
              ) : completedQuizzes.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  No completed quizzes found.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0b132b] text-white">
                      <th className="p-3 text-sm font-semibold rounded-tl-lg">
                        Title
                      </th>
                      <th className="p-3 text-sm font-semibold">Group name</th>
                      <th className="p-3 text-sm font-semibold">
                        No. of persons in group
                      </th>
                      <th className="p-3 text-sm font-semibold rounded-tr-lg">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {completedQuizzes.map((quiz) => (
                      <tr
                        key={quiz._id}
                        className="hover:bg-gray-50/80 transition-colors"
                      >
                        <td className="p-3 text-sm font-medium text-slate-900 border border-gray-200">
                          {quiz.title}
                        </td>
                        <td className="p-3 text-sm text-slate-600 border border-gray-200">
                          {quiz.group === "65c2bed779b859ea9320885f"
                            ? "Group 1"
                            : "JSB"}
                        </td>
                        <td className="p-3 text-sm text-slate-600 border border-gray-200">
                          {quiz.participants} persons
                        </td>
                        <td className="p-3 text-sm text-slate-600 border border-gray-200">
                          {formatDate(quiz.schadule).date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateQuizModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchQuizzes}
      />
    </div>

    
    </>
  );
}
