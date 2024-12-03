"use client";

import React from "react";

type InfoItemProps = {
  title: string;
  info: string;
  icon?: React.JSX.Element;
}

export default function InfoItem({title, info, icon}: InfoItemProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold">
        {title}
      </p>
      <div className="flex gap-2 items-center text-primary text-xl">
        {!!icon && icon}
        <p className="text-base text-gray-300">{info}</p>
      </div>
    </div>
  );
}
