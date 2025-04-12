// SearchBar.tsx

'use client'

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface SearchBarProps {
  onSearchComplete?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchComplete }) => {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push('/');

    const url = queryString.stringifyUrl({
      url: '/search',
      query: {
        searchTerm: data.searchTerm
      }
    }, { skipNull: true });

    router.push(url);
    reset();
    if (onSearchComplete) onSearchComplete(); // <--- fecha o dropdown
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col sm:flex-row items-center gap-3  w-full  rounded-2xltransition-all duration-300"
    >
      <input
        {...register('searchTerm')}
        autoComplete="off"
        type="text"
        placeholder="O que está à procura?"
        className="
          w-full 
          px-5
          py-3
          text-sm 
          border 
          border-gray-300 
          rounded-xl 
          focus:outline-none 
          focus:ring-2 
          focus:ring-sky-500 
          focus:border-transparent 
          transition-all 
          duration-300
        "
        aria-label="Search input"
      />
      <button
        type="submit"
        className="
          w-full sm:w-auto 
          px-5 
          py-3
          text-sm 
          font-medium 
          bg-sky-600 
          text-white 
          rounded-xl 
          hover:bg-sky-700 
          active:scale-95 
          transition-all 
          duration-300
        "
        aria-label="Search button"
      >
        Procurar
      </button>
    </form>

  );
};

export default SearchBar;
