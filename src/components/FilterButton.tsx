import React from "react";

interface FilterButtonProps {
  active?: boolean;
  text: string;
  icon: React.JSX.Element;
  onClick: () => void;
}

export default function FilterButton({
  active,
  text,
  icon,
  onClick,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 py-2 px-4 rounded font-semibold text-sm border-2 transition-opacity duration-200 hover:opacity-80 ${
        active
          ? "bg-primary text-white  border-primary"
          : "bg-none text-gray-600 border-gray-200"
      }`}
    >
      <span className={`text-base ${active ? "text-white" : "text-primary"}`}>
        {icon}
      </span>
      {text}
    </button>
  );
}
