import { CircleCheckBig } from "lucide-react";

interface CustomHeaderProps {
    headerText: string;

}
export default function CustomButton({ headerText }: CustomHeaderProps) {
    return (

        <>
            <button className="mt-5 font-bold bg-white rounded-xl py-2 px-4">
                {headerText}
                <CircleCheckBig  strokeWidth={3} className="inline ms-2 font-bold" color="#000" />
            
            </button>
        </>
    )
}
