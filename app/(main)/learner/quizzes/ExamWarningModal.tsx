"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";

interface ExamWarningModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExamWarningModal({
  isOpen,
  onConfirm,
  onCancel,
}: ExamWarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Important Notice Before Starting the Exam
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Please note that during the exam, if you switch to another tab,
            minimize the screen, or leave the exam page in any way, this will
            be considered a violation and your answers will be submitted
            automatically right away.
          </p>
          <p className="text-sm font-semibold text-slate-800">
            Do you agree to continue?
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 text-slate-700 font-bold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-amber-100  font-bold hover:bg-accent transition-colors cursor-pointer"
          >
            Agree, Start
          </button>
        </div>
      </div>
    </div>
  );
}