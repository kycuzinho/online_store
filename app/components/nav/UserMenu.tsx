'use client'

import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { SafeUser } from "@/types";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative group z-50">
        <div
          onClick={toggleOpen}
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
          <Avatar src={currentUser?.image} />
        </div>

        {currentUser?.name && (
          <div
            className="
              absolute 
              top-full 
              mt-2
              left-1/2 
              -translate-x-1/2
              whitespace-nowrap 
              bg-gray-800 
              text-white 
              text-xs 
              rounded 
              px-2 
              py-1
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300 
              pointer-events-none
            "
          >
            {currentUser.name}
          </div>
        )}

        {isOpen && (
          <div
            className="
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
            "
          >
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenuItem onClick={toggleOpen}>As suas compras</MenuItem>
                </Link>
                <Link href="/wishlist">
                  <MenuItem onClick={toggleOpen}>Lista de desejos</MenuItem>
                </Link>
                {currentUser.role === "ADMIN" && (
                  <Link href="/admin">
                    <MenuItem onClick={toggleOpen}>Dashboard</MenuItem>
                  </Link>
                )}
                <hr />
                <div className="bg-blue-300">
                  <MenuItem
                    onClick={() => {
                      toggleOpen();
                      signOut();
                    }}
                  >
                    Logout
                  </MenuItem>
                </div>
              </div>
            ) : (
              <div>
                <Link href="/wishlist">
                  <MenuItem onClick={toggleOpen}>Lista de desejos</MenuItem>
                </Link>
                <Link href="/login">
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleOpen}>Registar</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default UserMenu;
