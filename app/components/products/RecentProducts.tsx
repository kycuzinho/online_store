'use client';

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const RecentProducts = () => { 
  const [suggestedProducts, setSuggestedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      try {
        const res = await fetch(`/api/recent-products`);
        const data = await res.json();
        setSuggestedProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchSuggestedProducts();
  }, []); // Empty dependency array = runs once

  return (
    <div>
      {suggestedProducts.length > 0 && (
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Produtos Recentes</h2>
          <div className="relative">
            <div className="flex space-x-4 overflow-x-auto pb-4 pt-4 -mx-4 px-4 bg-cyan-50 rounded-lg">
              {suggestedProducts.map((product) => (
                <div key={product.id} className="flex-none w-[45%] sm:w-[30%] lg:w-[15%]">
                  <ProductCard data={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentProducts;