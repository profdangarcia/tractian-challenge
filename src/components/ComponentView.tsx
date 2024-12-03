"use client";

import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { BsLightningFill } from "react-icons/bs";

import { useAssets } from "../contexts/AssetsContext";
import { useCompany } from "../contexts/CompanyContext";

import { IItem } from "../@types/IItem";

export default function ComponentView() {
  const { selectedItem, setSelectedItem } = useAssets();
  const { selectedCompany } = useCompany();

  useEffect(() => {
    setSelectedItem({} as IItem);
  }, [selectedCompany]);

  return (
    <div className="flex flex-col border-gray-200 border-2 rounded h-full">
      <div className="border-b-2 border-gray-220 px-4 py-3 min-h-14 flex items-center gap-2">
        {!!selectedItem.name ? (
          <h2 className="text-lg font-semibold">{selectedItem.name}</h2>
        ) : (
          <span className="text-sm text-gray-600">
            {`(selecione um componente para ver detalhes)`}
          </span>
        )}

        {selectedItem.sensorType === "energy" && (
          <BsLightningFill className="text-success text-xs" />
        )}
        {selectedItem.status === "alert" && (
          <GoDotFill className="text-error text-xs" />
        )}
        {selectedItem.sensorType !== "energy" &&
          selectedItem.status === "operating" && (
            <GoDotFill className="text-success text-xs" />
          )}
      </div>
    </div>
  );
}
