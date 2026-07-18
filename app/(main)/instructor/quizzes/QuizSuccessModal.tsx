import React from "react";
import { CheckCircle2, Copy } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface QuizSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizCode: string;
}

export default function QuizSuccessModal({
  isOpen,
  onClose,
  quizCode,
}: QuizSuccessModalProps) {
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(quizCode);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-8 rounded-3xl border-none shadow-xl flex flex-col items-center text-center bg-white gap-6">
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-white animate-bounce-short">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <h3 className="text-xl font-bold text-slate-800 tracking-tight">
          Quiz was successfully created
        </h3>

        <div className="w-full flex items-center justify-between border border-gray-200 rounded-2xl p-1.5 bg-gray-50/50 max-w-xs">
          <span className="bg-orange-100/70 text-slate-800 font-extrabold px-4 py-2 rounded-xl text-sm tracking-wider uppercase shrink-0">
            CODE:
          </span>
          <span className="flex-1 text-center font-mono font-bold text-lg text-slate-700 tracking-widest px-2">
            {quizCode}
          </span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="p-2.5 hover:bg-gray-200/70 text-slate-600 rounded-xl transition-colors cursor-pointer shrink-0"
            title="Copy Code"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-32 py-2.5 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl shadow-md shadow-lime-500/20 transition-all cursor-pointer mt-2 text-sm"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
