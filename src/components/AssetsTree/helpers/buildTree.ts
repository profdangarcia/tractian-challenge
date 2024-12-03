import { IItem } from "@/src/@types/IItem";
import { ILocation } from "@/src/@types/ILocation";
import { TreeNode } from "..";

export const buildTree = (locations: ILocation[], items: IItem[]): TreeNode[] => {
  const locationMap = new Map<string, TreeNode>();
  const itemMap = new Map<string, TreeNode>();

  locations.forEach((location) => {
    locationMap.set(location.id, {
      id: location.id,
      name: location.name,
      type: "location",
      sensorType: null,
      visible: true,
      children: [],
      item: {} as IItem
    });
  });

  items.forEach((item) => {
    itemMap.set(item.id, {
      id: item.id,
      name: item.name,
      type: item.sensorType ? "component" : "asset",
      sensorType: item.sensorType,
      status: item.status,
      visible: true,
      children: [],
      item
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