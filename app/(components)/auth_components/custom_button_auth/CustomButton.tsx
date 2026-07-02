import { Spinner } from "@/components/ui/spinner";
import { CircleCheckBig } from "lucide-react";

interface CustomHeaderProps {
  headerText: string;
  type?: "submit" | "button" | "reset";
  loading?: boolean;
}
export default function CustomButton({
  headerText,
  loading,
  type = "button",
}: CustomHeaderProps) {
  return (
    <>
      <button
        disabled={loading}
        type={type}
        className={`mt-5 font-bold bg-white rounded-xl py-2 px-4 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
      >
        {headerText}
        {loading ? (<Spinner  className="inline size-6 ms-2"/>) : (
        <CircleCheckBig
          strokeWidth={3}
          className="inline ms-2 font-bold"
          color="#000"
        />)}
      </button>
    </>
  );
}
