import Image from "next/image";
import quizLogo from "@/public/images/Quiz icon.svg";
import { API_BASE_URL } from "@/app/api/AxiosClient";
import { cookies } from "next/headers";
import Link from "next/link";

export interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: string[];
  schadule: string; // NOTE: API field is spelled "schadule" (typo), kept as-is to match backend
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  closed_at: string;
  participants: number;
}

const UpcomingQuizzes = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value || "";

  let quizData: Quiz[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/quiz/incomming`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      quizData = await res.json();
    } else {
      console.log("Failed to fetch upcoming quizzes:", res.status);
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-xl mx-auto border border-neutral-100">
      {/* Header section with title and "Quiz directory" link */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-neutral-900">
          Upcoming {quizData.length} quizzes
        </h2>
        <Link
          href="/instructor/quizzes/all"
          className="flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          Quiz directory
          <svg
            className="w-4 h-4 ml-1 text-lime-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* List of quiz items */}
      <div className="space-y-4">
        {quizData.length === 0 ? (
          <p className="text-center text-neutral-400 text-sm py-10">
            No upcoming quizzes
          </p>
        ) : (
          quizData.map((quiz) => (
            <div
              key={quiz._id}
              className="flex border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all duration-200"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-28 bg-orange-50 flex items-center justify-center">
                <Image width={64} height={64} src={quizLogo} alt="Quiz Icon" />
              </div>

              {/* Details */}
              <div className="grow p-3 pl-6 flex flex-col justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold text-neutral-800 leading-snug">
                    {quiz.title}
                  </h3>
                  <p className="text-sm font-medium text-neutral-500">
                    {new Date(quiz.schadule).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm font-medium text-neutral-500">
                    Duration: {quiz.duration} min
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-medium text-neutral-500">
                      No. of students enrolled:{" "}
                      <span className="font-semibold text-neutral-800">
                        {quiz.participants}
                      </span>
                    </p>
                    <div className="self-end mt-2">
                      <Link
                        href={`/instructor/quizzes/${quiz._id}`}
                        className="flex items-center text-sm font-semibold text-neutral-800 hover:text-neutral-950 transition-colors group"
                      >
                        Open
                        <div className="w-6 h-6 ml-1.5 flex items-center justify-center bg-lime-100 rounded-full border border-lime-200">
                          <svg
                            className="w-4 h-4 text-lime-600 transition-transform group-hover:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>

                </div>


              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingQuizzes;