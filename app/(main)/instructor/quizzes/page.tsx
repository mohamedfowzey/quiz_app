"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import alarm from "@/public/images/Quizzes/Linker.jpeg";
import question from "@/public/images/Quizzes/Linker2.jpeg";
import FileSpreadsheet from "@/public/images/Quizzes/Quiz img.png";
import Image from "next/image";
import CreateQuizModal from "./CreateQuizModal";
import QuizSuccessModal from "./QuizSuccessModal";
import {
  apiGetIncomingQuizzes,
  apiGetCompletedQuizzes,
  Quiz,
  JoinQuizData,
  apiJoinQuiz
} from "@/app/api/quizApi/QuizApis";
import { usePathname, useRouter } from "next/navigation";
import OnlyInstructor from "@/app/(components)/main_components/OnlyInstructor/OnlyInstructor";
import OnlyLearner from "@/app/(components)/main_components/OnlyLearner/OnlyLearner";
import JoinQuizDialog from "./JoinModal";
import { toast } from "sonner";
import { set } from "zod";
import axios from "axios";
import { ViewQuizDialog } from "../../learner/quizzes/page";
import ExamWarningModal from "../../learner/quizzes/ExamWarningModal";
// import { ViewQuizDialog } from "../../learner/quizzes/page";

export default function QuizzPage() {
  const params = usePathname()
  const role = params.split('/')[1];
  console.log('role from learner dashboard: ', role);

  const router = useRouter();
  const [upcomingQuizzes, setUpcomingQuizzes] = useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [idQuiz, setIdQuiz] = useState("");
  const [examWarningModal, setExamWarningModal] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [createdQuizCode, setCreatedQuizCode] = useState<string>("");

  const [joinModal, setJoinModal] = useState(false);
  const [joinQuizModal, setQuizModal] = useState(false);

  const onjionQuizz = useCallback(
    async (data: JoinQuizData) => {
      setLoadingCode(true);
      try {
        const response = await apiJoinQuiz(data as string & JoinQuizData);
        toast.success(response?.data?.message);
        setIdQuiz(response?.data?.data?.quiz);
        setQuizModal(true);
        setJoinModal(false);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message);
        }
      } finally {
        setLoadingCode(false);
      }

    }, []
  )

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const [incomingRes, completedRes] = await Promise.all([
        apiGetIncomingQuizzes(),
        apiGetCompletedQuizzes(),
      ]);

      setUpcomingQuizzes(incomingRes.data);
      setCompletedQuizzes(completedRes.data);
      console.log(completedRes.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (() => {

      fetchQuizzes();
    })()
  }, []);

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

  const handleQuizCreateSuccess = (code: string) => {
    setCreatedQuizCode(code);
    setIsSuccessModalOpen(true);
    fetchQuizzes();
  };

  return (
    <div className="p-6 mx-auto min-h-screen text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-row gap-7">
          <OnlyInstructor>

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

            <button
              onClick={() => {
                router.push("/instructor/questions");
              }}
              className="w-full h-[150px] bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer group text-center"
            >
              <div className="group-hover:scale-105 transition-transform">
                <Image src={question} alt="question" width={60} height={60} />
              </div>
              <span className="font-bold sm:text-[14px] text-slate-800 leading-tight">
                Question Bank
              </span>
            </button>
          </OnlyInstructor>
          <OnlyLearner>
            <button
              onClick={() => setExamWarningModal(true)}
              className="w-full h-[150px] bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer group text-center"
            >
              <div className="group-hover:scale-105 transition-transform">
                <Image src={alarm} alt="Alarm" width={60} height={60} />
              </div>
              <span className="font-bold sm:text-[14px] text-slate-800 leading-tight">
                join quiz
              </span>
            </button>
          </OnlyLearner>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Upcoming Quizzes Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-slate-900">
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
              <div className="flex flex-col gap-2 max-h-[210px] overflow-y-auto pr-1 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                {upcomingQuizzes.map((quiz) => {
                  const formatted = formatDate(quiz.schadule);
                  return (
                    <div
                      key={quiz._id}
                      className="flex flex-col md:flex-row border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-colors bg-white shrink-0"
                    >
                      <div className="md:w-24 bg-orange-100/60 p-2 flex items-center justify-center min-h-[75px]">
                        <Image
                          src={FileSpreadsheet}
                          alt="File Spreadsheet"
                          width={56}
                          height={56}
                        />
                      </div>

                      <div className="flex-1 p-2 flex flex-col justify-between gap-1.5">
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 mb-0.5 leading-tight">
                            {quiz.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[11px] text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{formatted.date}</span>
                            <span className="text-gray-300">|</span>
                            <span>{formatted.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-0.5 pt-1 border-t border-gray-50">
                          <div className="text-[11px] font-medium text-slate-700">
                            No. of stuudent's enrolled:{" "}
                            <span className="font-bold">
                              {quiz.participants}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              router.push(`/instructor/quizzes/${quiz._id}`)
                            }
                            className="flex items-center gap-0.5 text-[11px] font-bold text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer group"
                          >
                            Open
                            <ArrowRight className="w-3 h-3 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Completed Quizzes
              </h2>
              <button
                onClick={() => {
                  router.push("/instructor/results");
                }}
                className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:underline cursor-pointer group"
              >
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
                      <th className="py-1.5 px-3 text-sm font-semibold rounded-tl-lg">
                        Title
                      </th>
                      <th className="py-1.5 px-3 text-sm font-semibold">
                        Difficulty
                      </th>
                      <th className="py-1.5 px-3 text-sm font-semibold">
                        No. of persons in group
                      </th>
                      <th className="py-1.5 px-3 text-sm font-semibold rounded-tr-lg">
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
                        <td className="py-1.5 px-3 text-sm font-medium text-slate-900 border border-gray-200">
                          {quiz.title}
                        </td>
                        <td className="py-1.5 px-3 text-sm text-slate-600 border border-gray-200">
                          {quiz.difficulty}
                        </td>
                        <td className="py-1.5 px-3 text-sm text-slate-600 border border-gray-200">
                          {quiz.participants} persons
                        </td>
                        <td className="py-1.5 px-3 text-sm text-slate-600 border border-gray-200">
                          {formatDate(quiz.createdAt).date}
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
      <OnlyInstructor>

        <CreateQuizModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleQuizCreateSuccess}
        />

        <QuizSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          quizCode={createdQuizCode}
        />
      </OnlyInstructor>
      <OnlyLearner>
        <ExamWarningModal
          isOpen={examWarningModal}
          onConfirm={() => {
            setExamWarningModal(false);
            setJoinModal(true);
          }}
          onCancel={() => setExamWarningModal(false)}
        />

        <JoinQuizDialog
          isOpen={joinModal}
          loading={loadingCode}
          onCancel={() => setJoinModal(false)}
          onJoin={onjionQuizz}
        />
        <ViewQuizDialog
          open={joinQuizModal}
          loading={loadingCode}
          idQuiz={idQuiz}
          onClose={() => setQuizModal(false)}
        />
      </OnlyLearner>
    </div>
  );
}
