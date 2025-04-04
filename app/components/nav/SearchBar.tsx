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
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-4 w-full">
      <input
        {...register('searchTerm')}
        autoComplete="off"
        type="text"
        placeholder="O que está à procura?"
        className="
          p-2
          border 
          border-gray-300 
          rounded-md 
          focus:outline-none
          focus:border-[0.5px]
          focus:border-slate-500
          w-full
        "
        aria-label="Search input"
      />
      <button
        type="submit"
        className="bg-sky-600 hover:opacity-80 text-white p-2 rounded-md"
        aria-label="Search button"
      >
        Procurar
      </button>
    </form>
  );
};

export default SearchBar;
