'use client'

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { User } from "@prisma/client";
import { SafeUser } from "@/types";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface UserMenuProps{
    currentUser: SafeUser | null;
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    return ( <>
        <div className="relative z-30">
            <div onClick={toggleOpen}
            className="
            p-2
            border-transparent
            bg-sky-300
            flex
            flex-row
            items-center
            gap-1
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            text-slate-700
            "
            >
                <Avatar src={currentUser?.image}/> 
            </div>
            {isOpen && (
                <div className="
                absolute 
                rounded-md 
                shadow-md 
                w-[170px]
                bg-white
                overflow-hidden
                right-0
                top-12
                text-sm
                flex
                flex-col
                cursor-pointer
                ">
                    {currentUser ? 
                    <div>
                        <Link href='/orders'>
                        <MenuItem onClick={toggleOpen}>As suas compras</MenuItem>
                        </Link>
                        {currentUser.role === 'ADMIN' && (
                                <Link href='/admin'>
                                    <MenuItem onClick={toggleOpen}>Dashboard</MenuItem>
                                </Link>
                            )}
                        <hr />
                        <div className="bg-blue-300">
                            <MenuItem onClick={() => {
                                toggleOpen();
                                signOut();
                            }}>
                                Logout
                            </MenuItem>
                        </div>
                    </div> 
                    : 
                    <div>
                        <Link href='/login'>
                            <MenuItem onClick={toggleOpen}>Login</MenuItem>
                        </Link>
                        <Link href='/register'>
                            <MenuItem onClick={toggleOpen}>Registar</MenuItem>
                        </Link>
                    </div>
                    }
                    
                    
                </div>
            )}
        </div>
        {isOpen ? <BackDrop onClick={toggleOpen}/> : null}
    </> );
}
 
export default UserMenu;