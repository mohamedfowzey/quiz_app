import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LucideIcon } from "lucide-react";
import React, { forwardRef, InputHTMLAttributes } from "react"; 
import { Control, Controller, FieldValues, Path } from "react-hook-form"; // 1. Import Controller and Control

interface CustomInputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type: string;
  StartIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  labelText: string;
  placeHolder: string;
  name: Path<T>; // Make name required when working with forms
  control?: Control<T>; // 2. Add control prop for react-hook-form integration
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps<FieldValues>>(({
  className,
  type,
  StartIcon,
  labelText,
  placeHolder,
  name,
  control, // Destructure control
  onChange,
  onBlur,
  ...props 
}, ref) => {
  
  const { dir, ...selectProps } = props;
  const selectDir = dir === "ltr" || dir === "rtl" ? dir : undefined;

  return (
    <>
      <label className="text-white font-bold ps-3">{labelText}</label>
      <div className="relative flex items-center w-full text-white mb-3 mt-2">
        {StartIcon && (
          <StartIcon className="absolute left-3 h-4 w-4 text-white pointer-events-none" />
        )}
        
        {type === 'select' && control ? (
          // 3. Wrap Select with Controller to bridge the value state
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select 
                name={name} 
                dir={selectDir} 
                value={field.value} // Connect react-hook-form state
                onValueChange={field.onChange} // Notify form of changes
              >
                <SelectTrigger 
                  className={`placeholder:text-white py-5 w-full border-2 my-1 ${className} ${StartIcon && "pl-10"}`}
                >
                  <SelectValue placeholder={placeHolder} className="placeholder:text-white" style={{color:'red'}}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="" defaultChecked>  </SelectItem>
                    <SelectItem value="Instructor">instructor</SelectItem>
                    <SelectItem value="Student">learner</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        ) : (
          <Input
            ref={ref} 
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeHolder}
            className={`placeholder:text-white py-5 border-2 my-1 ${className} ${StartIcon && "pl-10"}`}
            type={type}
            {...props} 
          />
        )}
      </div>
    </>
  );
});

CustomInput.displayName = "CustomInput";
export default CustomInput;
