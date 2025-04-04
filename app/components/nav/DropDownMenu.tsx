// DropDownMenu.tsx

'use client'

import { useState, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchBar from "./SearchBar";
import BackDrop from "./BackDrop";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="relative z-30">
        {/* Botão visível apenas em mobile */}
        <div
          onClick={toggleOpen}
          className="
            p-2
            bg-sky-300
            text-white
            flex
            items-center
            justify-center
            rounded-full
            cursor-pointer
            hover:bg-sky-300
            transition
            md:hidden
          "
        >
          <AiOutlineSearch size={20} className="text-sky-950"/>
        </div>

        {/* Caixa flutuante apenas no mobile */}
        {isOpen && (
          <div
            className="
              absolute
              top-12
              right-0
              w-[90vw]
              max-w-sm
              bg-white
              shadow-md
              rounded-md
              p-4
              z-50
              md:hidden
            "
          >
            <SearchBar onSearchComplete={closeMenu} />
          </div>
        )}

        {/* Em ecrãs maiores, a barra aparece sempre */}
        {/* <div className="hidden md:block w-full max-w-md">
          <SearchBar />
        </div> */}
      </div>

      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default DropDownMenu;
