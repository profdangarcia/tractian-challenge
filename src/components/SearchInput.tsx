import React from "react";
import { IoIosSearch } from "react-icons/io";




export default function SearchInput() {
  return (
    <div className="w-full flex items-center gap-4 px-3">
      <input className="my-1 h-8 px-1 w-full text-sm" placeholder="Buscar Ativo ou Local"/>
      <IoIosSearch className="text-xl"/>
    </div>
  );
}
