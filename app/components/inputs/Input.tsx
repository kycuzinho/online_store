'use client'

import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    validation?: object;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
  onBlur?: () => void;

}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    required,
    register,
    errors,
    /* validation,
    onChange,
    onFocus,
    onBlur, */
}) => {
    const [showPassword, setShowPassword] = useState(false);
    
    return ( 
    <div className="w-full relative">
        <input 
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required, /* ...validation */ })}
        placeholder=""
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        /* onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur} */
        className={`
        peer
        w-full
        p-4
        pt-6
        outline-none
        bg-white
        font-light
        border-2
        rounded-md
        transitions
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${errors[id] ? 'border-rose-500' : 'border-slate-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-slate-300'}
        ${type === "password" ? 'pr-10' : ''}
        `
        }/>
        <label htmlFor={id}
        className={`
        absolute
        cursor-text
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        left-4
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? 'text-rose-500' : 'text-slate-500'}
        `}
        >{label}</label>
        
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            {showPassword ? <FaEye size={26} /> : <FaEyeSlash size={26} />}
          </button>
        )}
    </div> 
    );
}
 
export default Input;