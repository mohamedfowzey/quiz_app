import Image from "next/image";
import quizLogo from "@/public/images/Quiz icon.svg"; // Import the quiz logo image
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
  schadule: string;
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
// Data for the quizzes, matching the image. This makes the component easy to reuse and update.

const UpcomingQuizzes = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value || "";
  // Get the auth token from cookies
  const quizData: Quiz[] = await fetch(`${API_BASE_URL}/api/quiz/incomming`, {
    headers: {
      Authorization: `Bearer ${token}`, // Use the auth token from cookies
    },
  }).then((res) => res.json()); // Fetch the upcoming quizzes data
  return (
    // Outer card container with shadows and rounded corners
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-xl mx-auto border border-neutral-100">
      {/* Header section with title and "Quiz directory" link */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-extrabold text-neutral-900">
          Upcoming 5 quizzes
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
        {quizData.map((quiz) => (
          // Individual quiz list item card
          <div
            key={quiz._id}
            className="flex border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all duration-200"
          >
            {/* The colored icon square on the left */}
            <div
              className={`flex-shrink-0 w-28 h-28 bg-light p-2 flex items-center justify-center`}
            >
              <div className="p-2 border-2 border-dashed border-orange-200 rounded-xl">
                <Image
                  width={100}
                  height={100}
                  src={quizLogo}
                  alt="Quiz Icon"
                />
              </div>
            </div>

            {/* Quiz details text area */}
            <div className="grow p-4 pl-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-neutral-800 leading-snug">
                  {quiz.title}
                </h3>
                <p className="text-sm font-medium text-neutral-500 mt-1">
                  timing:{quiz.schadule}
                </p>
                <p className="mx-1">duration : {quiz.duration}</p>
                <p className="text-sm font-medium text-neutral-500 mt-2">
                  No. of students enrolled :{" "}
                  <span className="font-semibold text-neutral-800">
                    {quiz.participants}
                  </span>
                </p>
              </div>

              {/* "Open" action link with arrow */}
              <div className="self-end mt-1">
                <a
                  href="#"
                  className="flex items-center text-sm font-semibold text-neutral-800 hover:text-neutral-950 transition-colors"
                >
                  Open
                  <div className="w-6 h-6 ml-1.5 flex items-center justify-center bg-lime-100 rounded-full border border-lime-200 group">
                    <svg
                      className="w-4 h-4 text-lime-600 transition-transform group-hover:translate-x-0.5"
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
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingQuizzes;
