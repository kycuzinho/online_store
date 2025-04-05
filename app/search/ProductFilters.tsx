"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

const ProductFilters = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const minParam = searchParams?.get("minPrice") || "";
  const maxParam = searchParams?.get("maxPrice") || "";

  const [minPrice, setMinPrice] = useState(minParam);
  const [maxPrice, setMaxPrice] = useState(maxParam);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams?.toString());

    if (minPrice) params.set("minPrice", minPrice.toString());
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice.toString());
    else params.delete("maxPrice");

    router.push(`/search?${params.toString()}`);

    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("minPrice");
    params.delete("maxPrice");

    setMinPrice("");
    setMaxPrice("");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <div /* className="hidden md:block" */>
        <button
          onClick={toggleOpen}
          className="mb-2 px-4 py-2 bg-sky-600 hover:bg-sky-800 text-white rounded"
        >
          {isOpen ? <FaFilterCircleXmark /> : <FaFilter />}
        </button>
      </div>


      {/* Pop Up Filter button */}
      {/* <div className="block md:hidden">
        
      </div> */}
      

      {isOpen && (
        <div className="
        fixed
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[90vw]
        max-w-sm
        bg-white
        shadow-md
        rounded-md
        p-4
        z-50
        shadow-neutral-400
        flex
        flex-col
        gap-4
      ">
        <div className="fixed right-4" >
          <button 
          onClick={toggleOpen}>
            <IoCloseCircle size={30} className="text-sky-600"/>
          </button>
        </div>

        <input
          type="number"
          placeholder="Preço mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded w-52 md:w-72"
        />
      
        <input
          type="number"
          placeholder="Preço máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded w-52 md:w-72"
        />
      
        <button
          onClick={handleFilter}
          className="bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded w-full"
        >
          Filtrar
        </button>
        
        <button
          onClick={handleClearFilters}
          className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded w-full"
        >
          Limpar Filtros
        </button>
      </div>
      
      )}
    </div>
  );
};

export default ProductFilters;
