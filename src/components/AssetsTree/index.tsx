import React, { useEffect, useState } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi2";

import { ImCodepen } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import { GoLocation } from "react-icons/go";
import { BsLightningFill } from "react-icons/bs";
import { IoCubeOutline } from "react-icons/io5";

import { useAssets } from "../../contexts/AssetsContext";
import { applyFilters } from "./helpers/applyFilters";
import { buildTree } from "./helpers/buildTree";

import { ILocation } from "../../@types/ILocation";
import { IItem } from "../../@types/IItem";

export interface TreeNode {
  id: string;
  name: string;
  type: "location" | "asset" | "component";
  sensorType: "energy" | "vibration" | null;
  status?: "operating" | "alert" | null;
  visible: boolean;
  children: TreeNode[];
}

interface AssetsTreeProps {
  locations: ILocation[];
  items: IItem[];
}

export default function AssetsTree({ locations, items }: AssetsTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [tree, setTree] = useState<TreeNode[]>([]);
  const { filters } = useAssets();

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const newTree = buildTree(locations, items);
    newTree.forEach((node) => applyFilters(node, filters));
    setTree(newTree);
  }, [locations, items, filters]);

  const renderNode = (node: TreeNode) => {
    if (!node.visible) return null;
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;
    const isComponent = node.type === "component";

    return (
      <div
        key={node.id}
        className={`ml-4 text-sm font-[family-name:var(--font-roboto)] py-1 ${
          isComponent ? "text-white" : "text-secondary"
        }`}
      >
        <div
          className={`flex items-center ${
            isComponent ? "bg-primary cursor-pointer pl-1" : ""
          }`}
        >
          {hasChildren && (
            <span
              onClick={() => toggleNode(node.id)}
              className="cursor-pointer mr-1"
            >
              {isExpanded ? <HiChevronDown /> : <HiChevronRight />}
            </span>
          )}
          {node.type === "location" && (
            <GoLocation className="mr-1 text-xl text-primary" />
          )}
          {node.type === "asset" && (
            <IoCubeOutline className="mr-1 text-xl text-primary" />
          )}

          {isComponent && <ImCodepen className="mr-1 text-xl text-white" />}

          <span className={`flex gap-2 items-center`}>
            {node.name}
            {node.status === "alert" && (
              <GoDotFill className="text-error text-xs" />
            )}
            {node.sensorType === "energy" && (
              <BsLightningFill className="text-success text-xs" />
            )}
          </span>
        </div>
        {isExpanded && hasChildren && (
          <div className="pl-2 ml-2 border-l-2 border-gray-200">
            {node.children.map(renderNode)}
          </div>
        )}
      </div>
    );
  };

  return <div className="font-sans">{tree.map(renderNode)}</div>;
}
