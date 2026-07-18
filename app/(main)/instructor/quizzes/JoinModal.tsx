"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Check, Loader2Icon, X } from "lucide-react";
import { JoinQuizData } from "@/app/api/quizApi/QuizApis";



interface JoinQuizDialogProps {
  isOpen: boolean;
  onJoin?: (data : JoinQuizData) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export default function JoinQuizDialog({ isOpen, onJoin, onCancel, loading }: JoinQuizDialogProps) {
  // Initialize react-hook-form with onChange mode
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<JoinQuizData>({
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  // If the modal is not open, render nothing
  if (!isOpen) return null;

  const onSubmit = (data: JoinQuizData) => {
    if (onJoin) {
      onJoin(data);
    }
    reset(); // Reset form on successful submission
  };

  const handleCancel = () => {
    reset(); // Clear input errors/values when closing
    if (onCancel) onCancel();
  };

  return (
    // Fixed backdrop overlay centered in the viewport
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="flex min-h-[420px] w-full max-w-xl flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-2xl font-sans select-none animate-in zoom-in-95 duration-200">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-black mb-6">Join Quiz</h2>
        
        {/* Subtitle */}
        <p className="text-base text-black font-medium mb-4 text-center">
          Input the code received for the quiz below to join
        </p>

        {/* Form Input */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
          <div className={`flex w-full items-stretch rounded-xl border overflow-hidden h-14 transition-all ${
            errors.code 
              ? "border-red-500 focus-within:ring-2 focus-within:ring-red-100" 
              : "border-gray-300 focus-within:ring-2 focus-within:ring-orange-200"
          }`}>
            {/* Static "Code" Label Prefix */}
            <div className="flex items-center justify-center bg-[#FDF0E6] px-6 text-lg font-bold text-black border-r border-gray-300">
              Code
            </div>
            
            {/* Input Field registered with react-hook-form */}
            <input
              type="text"
              placeholder="Enter code here"
              className="flex-1 px-4 text-lg font-medium text-black outline-none"
              {...register("code", { required: "Quiz code is required" })}
            />
          </div>

          {/* Error Message Feedback */}
          <div className="h-6 mt-1 text-sm text-red-500 font-medium">
            {errors.code && <span>{errors.code.message}</span>}
          </div>

          {/* Action Buttons */}
          <div className="flex w-44 h-20 items-stretch rounded-xl border border-gray-300 overflow-hidden shadow-sm mt-4">
            {/* Confirm Button */}
            <button
              type="submit"
              disabled={!isValid}
              className={`flex flex-1 items-center justify-center border-r border-gray-300 transition-colors ${
                isValid 
                  ? "bg-white hover:bg-gray-50 active:bg-gray-100 cursor-pointer" 
                  : "bg-gray-50 opacity-50 cursor-not-allowed"
              }`}
              aria-label="Confirm"
            >
              {loading ? (
              <>
                <Loader2Icon size={20} className="animate-spin mx-1" />
              Joining...
              </>
            ) : (
              <Check className="h-7 w-7 text-black stroke-[3.5]" />
            )}
              
            </button>
            
            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="flex flex-1 items-center justify-center bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors"
              aria-label="Cancel"
            >
              <X className="h-7 w-7 text-black stroke-[3.5]" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}