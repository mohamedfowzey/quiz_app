import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import React, { forwardRef } from "react"; // استيراد forwardRef

interface CustomInputProps {
  className?: string;
  type: string;
  StartIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  labelText: string;
  placeHolder: string;
  name?: string;
  // لازم نضيف النوع ده عشان الـ register يعرف يتعامل مع الـ ref
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

// لف الكومبوننت بـ forwardRef
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({
  className,
  type,
  StartIcon,
  labelText,
  placeHolder,
  name,
  onChange,
  onBlur,
  ...props // هذا الـ props سيحمل الـ ref والـ name من الـ register
}, ref) => {
  return (
    <>
      <label className="text-white font-bold ps-3">{labelText}</label>
      <div className="relative flex items-center w-full text-white mb-3 mt-2">
        {StartIcon && (
          <StartIcon className="absolute left-3 h-4 w-4 text-white pointer-events-none" />
        )}
        <Input
          ref={ref} // هنا بنربط الـ ref
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeHolder}
          className={`placeholder:text-white py-5 border-2 my-1 ${className} ${StartIcon && "pl-10"}`}
          type={type}
          {...props} // باقي الـ props اللي جاية من الـ register
        />
      </div>
    </>
  );
});

CustomInput.displayName = "CustomInput";
export default CustomInput;