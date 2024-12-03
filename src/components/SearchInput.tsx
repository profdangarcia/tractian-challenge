import React from "react";
import { IoIosSearch } from "react-icons/io";
import { useAssets } from "../contexts/AssetsContext";

export default function SearchInput() {
  const { filters, setFilters } = useAssets();

  return (
    <div className="w-full flex items-center gap-4 px-3">
      <input
        className="my-1 h-8 px-1 w-full text-sm"
        placeholder="Buscar Ativo ou Local"
        value={filters.text}
        onChange={(e) => setFilters({ ...filters, text: e.target.value })}
      />
      <IoIosSearch className="text-xl" />
    </div>
  );
}
