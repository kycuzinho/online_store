"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

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
      <button
        onClick={toggleOpen}
        className="mb-2 px-4 py-2 bg-sky-600 text-white rounded"
      >
        {isOpen ? "Esconder Filtros" : "Mostrar Filtros"}
      </button>

      {isOpen && (
        <div className="flex flex-wrap gap-4">
          <input
            type="number"
            placeholder="Preço mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 rounded w-36"
          />
          <input
            type="number"
            placeholder="Preço máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 rounded w-36"
          />
          <button
            onClick={handleFilter}
            className="bg-sky-600 text-white px-4 py-2 rounded"
          >
            Filtrar
          </button>
          <button
            onClick={handleClearFilters}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
