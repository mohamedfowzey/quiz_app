import { Input } from '@/components/ui/input'
import { LucideIcon } from 'lucide-react';
import React from 'react'
interface CustomInputProps{
    className?:string,
    type:string,
StartIcon?: LucideIcon | React.ComponentType<{ className?: string }>;

}
export default function CustomInput({className,type,StartIcon}:CustomInputProps) {
  return (
    <div className='relative flex items-center w-full'>
        {StartIcon && (
          <StartIcon className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <Input className = {`${className} ${StartIcon && 'pl-10'}` } type={type} />
    </div>
  )
}
