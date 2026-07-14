import UpcomingQuizzes from "@/app/(components)/main_components/UpCommingQuizzes/UpCommingQuizzes";
import TopStudents from "@/app/(components)/main_components/TopStudents/TopStudents";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
  return (
    <>
      <div className="flex p-4 flex-wrap gap-4 justify-center">

                <Suspense fallback={<p>loading quizzes...</p>}>
        <UpcomingQuizzes/>
        </Suspense>
                <Suspense fallback={<p>loading students</p>}>
        <TopStudents/>
        </Suspense>
      </div>
    </>
  );
}
