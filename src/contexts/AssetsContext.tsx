"use client";

import React, { createContext, useState, useContext } from "react";
import { IItem } from "../@types/IItem";

export type Filter = {
  text: string;
  energy: boolean;
  critical: boolean;
};

interface AssetsContextType {
  filters: Filter;
  setFilters: (filter: Filter) => void;
  selectedItem: IItem;
  setSelectedItem: (item: IItem) => void;
}

const AssetsContext = createContext<AssetsContextType | undefined>(undefined);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<Filter>({
    text: "",
    energy: false,
    critical: false,
  });
  const [selectedItem, setSelectedItem] = useState<IItem>({} as IItem);

  return (
    <AssetsContext.Provider
      value={{ filters, setFilters, selectedItem, setSelectedItem }}
    >
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
