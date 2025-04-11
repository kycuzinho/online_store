// DropDownMenu.tsx

'use client'

import { useState, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchBar from "./SearchBar";
import BackDrop from "./BackDrop";
import { FaSearchengin } from "react-icons/fa";

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
            pr-2
            text-white
            flex
            items-center
            justify-center
            rounded-full
            cursor-pointer
            transition
            md:hidden
          "
        >
          <FaSearchengin size={30} className="text-sky-950"/>
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
      </div>

      {isOpen && <BackDrop onClick={toggleOpen} />}
    </>
  );
};

export default DropDownMenu;
