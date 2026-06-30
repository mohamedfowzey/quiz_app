import { ReactNode } from "react";
import authImage from "@/public/images/authImage.png"
import logo from "@/public/images/logo.png"

export default function Auth({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen w-full bg-slate-950 p-10 grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="flex relative h-full  flex-col items-center justify-center  md:px-10">
                <img
                    src={logo.src}
                    alt="Learning journey"
                    className=" w-44 rounded-lg absolute top-5 left-10"
                />
                <div className="w-full  mt-20 ">
                    {children}
                </div>
            </div>

            <div className="hidden md:flex items-center justify-center bg-orange-100 rounded-2xl">
                <img
                    src={authImage.src}
                    alt="Learning journey"
                    className="w-full max-w-lg rounded-lg"
                />
            </div>

        </div>
    );
}