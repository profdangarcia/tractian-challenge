"use client";

import React, { createContext, useState, useContext } from "react";

export type Filter = {
  text: string;
  energy: boolean;
  critical: boolean;
}

interface AssetsContextType {
  filters: Filter;
  setFilters: (filter: Filter) => void;
}

const AssetsContext = createContext<AssetsContextType | undefined>(undefined);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filter>({
    text: "",
    energy: false,
    critical: false,
  });

  return (
    <AssetsContext.Provider value={{ filters, setFilters }}>
      {children}
    </AssetsContext.Provider>
  );
}

export function useAssets() {
  const context = useContext(AssetsContext);
  if (context === undefined) {
    throw new Error("useAssets must be used within a AssetsProvider");
  }
  return context;
}
