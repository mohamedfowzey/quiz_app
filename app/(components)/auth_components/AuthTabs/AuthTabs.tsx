"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, UserPlus } from "lucide-react";

export default function AuthTabs() {
  const pathname = usePathname();

  const isLogin = pathname === "/login" || pathname === "/";
  const isRegister = pathname === "/register";

  return (
    <div className="flex flex-col  gap-6 p-6 rounded-lg text-white select-none">
      <h2 className="text-Header text-xl font-semibold ">
        Continue your learning journey with QuizWiz!
      </h2>

      <div className="flex gap-4">
        <Link
          href="/login"
          className={`flex flex-col items-center justify-center w-32 h-28 border-2 rounded-xl transition-all duration-200 bg-[#2A2D34]
            ${
              isLogin
                ? "border-[#B4D355] text-[#B4D355]"
                : "border-transparent text-white opacity-80 hover:opacity-100"
            }`}
        >
          <User className="w-10 h-10 mb-2" />
          <span className="text-sm font-medium">Sign in</span>
        </Link>

        <Link
          href="/register"
          className={`flex flex-col items-center justify-center w-32 h-28 border-2 rounded-xl transition-all duration-200 bg-[#2A2D34]
            ${
              isRegister
                ? "border-[#B4D355] text-[#B4D355]"
                : "border-transparent text-white opacity-80 hover:opacity-100"
            }`}
        >
          <UserPlus className="w-10 h-10 mb-2" />
          <span className="text-sm font-medium">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
