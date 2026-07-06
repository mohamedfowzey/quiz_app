import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import alarm from "@/public/images/Quizzes/Linker.jpeg";
import question from "@/public/images/Quizzes/Linker2.jpeg";
import FileSpreadsheet from "@/public/images/Quizzes/Quiz img.png";
import Image from "next/image";
import { CustomTable } from "@/app/(components)/dashboardShard/customTable/customTable";
interface UpcomingQuiz {
  id: string;
  title: string;
  date: string;
  time: string;
  enrolledStudents: number;
  imageUrl?: string;
}

interface CompletedQuiz {
  id: string;
  title: string;
  groupName: string;
  personsInGroup: number;
  date: string;
}

export default function QuizzPage() {
  const upcomingQuizzes: UpcomingQuiz[] = [
    {
      id: "1",
      title: "Introduction to computer programming",
      date: "12 / 03 / 2023",
      time: "09:00 AM",
      enrolledStudents: 32,
    },
    {
      id: "2",
      title: "Psychology 101",
      date: "27 / 03 / 2023",
      time: "12:00 PM",
      enrolledStudents: 17,
    },
  ];

  const completedQuizzes: CompletedQuiz[] = [
    {
      id: "c1",
      title: "Assembly language",
      groupName: "Group 1",
      personsInGroup: 23,
      date: "12 / 02 / 2023",
    },
    {
      id: "c2",
      title: "C programming",
      groupName: "Group 2",
      personsInGroup: 17,
      date: "12 / 02 / 2023",
    },
    {
      id: "c3",
      title: "Python",
      groupName: "Group 3",
      personsInGroup: 38,
      date: "12 / 02 / 2023",
    },
  ];

  return (
    <>

    <div className="p-6  mx-auto  min-h-screen text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-row gap-7">
          <button className=" w-full  h-[150px]  bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer group text-center">
            <div className="group-hover:scale-105 transition-transform">
              <Image src={alarm} alt="Alarm" width={60} height={60} />{" "}
            </div>
            <span className="font-bold  sm:text-[14px] text-slate-800 leading-tight">
              Set up a new quiz
            </span>
          </button>

          <button className=" w-full h-[150px]  bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer group text-center">
            <div className="group-hover:scale-105 transition-transform">
              <Image
                src={question}
                alt="question"
                width={60}
                height={60}
              />{" "}
            </div>
            <span className="font-bold sm:text-[14px]  text-slate-800 leading-tight">
              Question Bank
            </span>
          </button>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6 text-slate-900">
              Upcoming quizzes
            </h2>

            <div className="flex flex-col gap-4">
              {upcomingQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
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
                        <span>{quiz.date}</span>
                        <span className="text-gray-300">|</span>
                        <span>{quiz.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                      <div className="text-sm font-medium text-slate-700">
                        No. of student's enrolled:{" "}
                        <span className="font-bold">
                          {quiz.enrolledStudents}
                        </span>
                      </div>

                      <button className="flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer group">
                        Open
                        <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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

            {/* small Screen responsive  */}
            <div className="overflow-x-auto">
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
                      key={quiz.id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="p-3 text-sm font-medium text-slate-900 border border-gray-200">
                        {quiz.title}
                      </td>
                      <td className="p-3 text-sm text-slate-600 border border-gray-200">
                        {quiz.groupName}
                      </td>
                      <td className="p-3 text-sm text-slate-600 border border-gray-200">
                        {quiz.personsInGroup} persons
                      </td>
                      <td className="p-3 text-sm text-slate-600 border border-gray-200">
                        {quiz.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    </>
  );
}
