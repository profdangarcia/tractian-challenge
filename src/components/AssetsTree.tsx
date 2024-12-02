import React, { useState } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi2";

import { ImCodepen } from "react-icons/im";
import { GoDotFill } from "react-icons/go";
import { GoLocation } from "react-icons/go";
import { BsLightningFill } from "react-icons/bs";
import { IoCubeOutline } from "react-icons/io5";

import { ILocation } from "../@types/ILocation";
import { IItem } from "../@types/IItem";

interface TreeNode {
  id: string;
  name: string;
  type: "location" | "asset" | "component";
  sensorType: "energy" | "vibration" | null;
  children: TreeNode[];
  status?: "operating" | "alert" | null;
}

interface AssetsTreeProps {
  locations: ILocation[];
  items: IItem[];
}

export default function AssetsTree({ locations, items }: AssetsTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

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

  const buildTree = (): TreeNode[] => {
    const locationMap = new Map<string, TreeNode>();
    const itemMap = new Map<string, TreeNode>();

    locations.forEach((location) => {
      locationMap.set(location.id, {
        id: location.id,
        name: location.name,
        type: "location",
        sensorType: null,
        children: [],
      });
    });

    items.forEach((item) => {
      itemMap.set(item.id, {
        id: item.id,
        name: item.name,
        type: item.sensorType ? "component" : "asset",
        sensorType: item.sensorType,
        children: [],
        status: item.status,
      });
    });

    const rootNodes: TreeNode[] = [];

    locations.forEach((location) => {
      const node = locationMap.get(location.id)!;
      if (location.parentId) {
        const parentNode = locationMap.get(location.parentId);
        if (parentNode) {
          parentNode.children.push(node);
        }
      } else {
        rootNodes.push(node);
      }
    });

    items.forEach((item) => {
      const node = itemMap.get(item.id)!;
      if (item.locationId) {
        const parentNode = locationMap.get(item.locationId);
        if (parentNode) {
          parentNode.children.push(node);
        }
      } else if (item.parentId) {
        const parentNode = itemMap.get(item.parentId);
        if (parentNode) {
          parentNode.children.push(node);
        }
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  };

  const renderNode = (node: TreeNode) => {
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
            isComponent ? "bg-primary cursor-pointer" : ""
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

  const tree = buildTree();

  return <div className="font-sans">{tree.map(renderNode)}</div>;
}
