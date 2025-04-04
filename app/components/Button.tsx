'use client'

import React, { ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps{
    label?: string | ReactNode,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    icon?: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode;  // Adicionando children como uma propriedade opcional
}

const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    custom,
    icon: Icon,
    onClick,
    children,  // Recebe children aqui
}) => {
    return ( 
        <button 
        onClick={onClick}
        disabled={disabled}
        className={`
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-md
            hover:opacity-80
            transition
            w-full
            border-slate-700
            flex
            items-center
            justify-center
            gap-2
            ${outline ? "bg-white" : 'bg-sky-900'}
            ${outline ? "text-sky-900" : 'text-white'}
            ${small ? "text-sm font-light" : "text-md font-semibold"}
            ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}
            ${custom ? custom : ""}
            `}
        >
            {Icon && <Icon size={24} />}
            {children || label}  {/* Aqui, renderiza o conteúdo de children ou o label */}
        </button>
     );
}
 
export default Button;
