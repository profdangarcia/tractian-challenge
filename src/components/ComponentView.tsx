"use client";

import React, { useEffect } from "react";
import { HiSignal } from "react-icons/hi2";
import { MdOutlineRouter } from "react-icons/md";

import { useAssets } from "../contexts/AssetsContext";
import { useCompany } from "../contexts/CompanyContext";

import InfoItem from "./InfoItem";
import ComponentHeader from "./ComponentHeader";

import { IItem } from "../@types/IItem";
import ImagePreview from "./ImagePreview";

export default function ComponentView() {
  const { selectedItem, setSelectedItem } = useAssets();
  const { selectedCompany } = useCompany();
  const isEnergy = selectedItem.sensorType === "energy";
  const intialResponsibles = isEnergy ? "E" : "M";

  useEffect(() => {
    setSelectedItem({} as IItem);
  }, [selectedCompany]);

  return (
    <div className="flex flex-col border-gray-200 border-2 rounded h-full">
      <ComponentHeader />
      {selectedItem.id && (
        <div className="p-6 flex flex-col">
          <div className="pb-6 border-b-2 border-gray-200 flex gap-6">
            <div className="w-1/3">
              <ImagePreview />
            </div>
            <div className="flex flex-col w-2/3">
              <div className="border-b-2 border-gray-200 pb-6 mb-6">
                <InfoItem
                  title="Tipo de Equipamento"
                  info={selectedItem.name}
                />
              </div>
              <div>
                <InfoItem
                  title="Responsáveis"
                  info={isEnergy ? "Elétrica" : "Mecânica"}
                  icon={
                    <div className="flex items-center justify-center rounded-full bg-primary text-white text-sm h-6 w-6">
                      {intialResponsibles}
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex gap-6">
            <div className="w-1/2">
              <InfoItem
                title="Sensor"
                info={selectedItem.sensorId}
                icon={<HiSignal />}
              />
            </div>
            <div className="w-1/2">
              <InfoItem
                title="Receptor"
                info={selectedItem.gatewayId}
                icon={<MdOutlineRouter />}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
