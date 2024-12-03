"use client";

import React, { useEffect, useState } from "react";

import AssetsTree from "./AssetsTree";
import SearchInput from "./SearchInput";
import { fetchCompanyItems } from "../services/items";
import { useCompany } from "../contexts/CompanyContext";
import { fetchCompanyLocations } from "../services/locations";

import { IItem } from "../@types/IItem";
import { ILocation } from "../@types/ILocation";

export default function AssetsView() {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [items, setItems] = useState<IItem[]>([]);
  const { selectedCompany } = useCompany();

  const fetchLocations = async (companyId: string) => {
    setLocations([]);
    const data = await fetchCompanyLocations(companyId);
    setLocations(data);
  };

  const fetchItems = async (companyId: string) => {
    setLocations([]);
    const data = await fetchCompanyItems(companyId);
    setItems(data);
  };

  useEffect(() => {
    if (selectedCompany?.id) {
      fetchLocations(selectedCompany.id);
      fetchItems(selectedCompany.id);
    }
  }, [selectedCompany]);

  return (
    <div className="flex flex-col border-gray-200 border-2 rounded h-full">
      <div className="border-gray-200 border-b-2 rounded">
        <SearchInput />
      </div>
      <div className="py-2 px-1">
        <AssetsTree items={items} locations={locations}/>
      </div>
    </div>
  );
}
