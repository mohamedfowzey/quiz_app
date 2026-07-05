import UpcomingQuizzes from "@/app/(components)/main_components/UpCommingQuizzes/UpCommingQuizzes";
import LogoutButton from "@/components/ui/logoutBtn";
import TopStudents from "@/app/(components)/main_components/TopStudents/TopStudents";

export default function Dashboard() {
  return (
    <>
      <div className="flex p-4 flex-wrap gap-4 justify-center">
        <UpcomingQuizzes/>
        <TopStudents/>
      </div>
    </>
  );
}
