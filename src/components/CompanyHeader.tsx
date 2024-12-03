"use client";

import React from "react";
import { BsLightning } from "react-icons/bs";
import { PiWarningCircle } from "react-icons/pi";

import FilterButton from "./FilterButton";
import { useCompany } from "../contexts/CompanyContext";
import { useAssets } from "../contexts/AssetsContext";

export default function CompanyHeader() {
  const {filters, setFilters} = useAssets();
  const { selectedCompany } = useCompany();
  
  const companyName = selectedCompany
    ? `/ ${selectedCompany.name}`
    : "(selecione uma empresa)";

  return (
    <div className="flex items-center justify-between">
      <h1 className="font-semibold text-xl">
        Ativos <span className="text-sm text-gray-600">{companyName}</span>
      </h1>
      <div className="flex items-center gap-2">
        <FilterButton
          icon={<BsLightning />}
          active={filters.energy}
          text="Sensor de Energia"
          onClick={() => setFilters({...filters, energy: !filters.energy})}
        />
        <FilterButton
          icon={<PiWarningCircle />}
          active={filters.critical}
          text="Crítico"
          onClick={() => setFilters({...filters, critical: !filters.critical})}
        />
      </div>
    </div>
  );
}
