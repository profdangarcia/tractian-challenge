"use client";

import React, { createContext, useState, useContext } from "react";
import { ICompany } from "../@types/ICompany";

interface CompanyContextType {
  selectedCompany: ICompany | null;
  setSelectedCompany: (company: ICompany | null) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);

  return (
    <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
