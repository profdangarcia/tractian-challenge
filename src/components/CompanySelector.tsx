"use client";

import React from "react";
import Image from "next/image";

import { useCompany } from "../contexts/CompanyContext";
import { ICompany } from "../@types/ICompany";

interface CompanySelectorProps {
  companies: ICompany[];
}

export default function CompanySelector({ companies }: CompanySelectorProps) {
  const { selectedCompany, setSelectedCompany } = useCompany();

  return (
    <div className="flex items-center gap-2">
      {companies.map((company) => (
        <button
          key={company.id}
          onClick={() => setSelectedCompany(company)}
          className={`flex items-center justify-center gap-2 py-1 px-2 rounded-sm text-white font-semibold text-xs min-w-24 ${
            selectedCompany?.id === company.id ? "bg-primary" : "bg-blue-900"
          }`}
        >
          <Image src="/gold-icon.svg" alt="" width={14} height={14} />
          {company.name}
        </button>
      ))}
    </div>
  );
}
