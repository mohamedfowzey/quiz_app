import { Input } from "@/components/ui/input";
import { LucideIcon } from "lucide-react";
import React from "react";
interface CustomInputProps {
  className?: string;
  type: string;
  StartIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  labelText: string;
  placeHolder: string;
  name?: string;
}
export default function CustomInput({
  className,
  type,
  StartIcon,
  labelText,
  placeHolder,
  name,
}: CustomInputProps) {
  return (
    <>
      <label className="text-white  font-bold ps-3  ">{labelText}</label>
      <div className="relative flex items-center w-full text-white mb-3 mt-2">
        {StartIcon && (
          <StartIcon className="absolute left-3 h-4 w-4 text-white pointer-events-none" />
        )}
        <Input
          required
          placeholder={placeHolder}
          name={name}
          className={`placeholder:text-white ${className} ${StartIcon && "pl-10"}`}
          type={type}
        />
      </div>
    </>
  );
}
