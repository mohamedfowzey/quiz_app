import { Input } from '@/components/ui/input'
import { LucideIcon } from 'lucide-react';
import React from 'react'
interface CustomInputProps {
  className?: string,
  type: string,
  StartIcon?: LucideIcon | React.ComponentType<{ className?: string }>,
  labelText:string;
  placeHolder:string;

}
export default function CustomInput({ className, type, StartIcon,labelText ,placeHolder}: CustomInputProps) {
  return (

    <>

     <label className='text-white  font-bold ps-3  ' >{labelText}</label>
      <div className='relative flex items-center w-full text-white mb-5 mt-2'>

        {StartIcon && (
          <StartIcon className="absolute left-3 h-4 w-4 text-white pointer-events-none" />
        )}
        <Input required placeholder={placeHolder} className={`placeholder:text-white py-5 border-2 my-1  ${className} ${StartIcon && 'pl-10'}`} type={type} />
      </div>
    </>
  )
}
