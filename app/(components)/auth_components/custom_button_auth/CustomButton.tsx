import { CircleCheckBig } from "lucide-react";

interface CustomHeaderProps {
  headerText: string;
  type?: "submit" | "button" | "reset";
}
export default function CustomButton({
  headerText,
  type = "button",
}: CustomHeaderProps) {
  return (
    <>
      <button
        type={type}
        className="mt-5 font-bold bg-white rounded-xl py-2 px-4"
      >
        {headerText}
        <CircleCheckBig
          strokeWidth={3}
          className="inline ms-2 font-bold"
          color="#000"
        />
      </button>
    </>
  );
}
