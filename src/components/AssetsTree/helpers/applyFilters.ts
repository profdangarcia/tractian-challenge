import { Filter } from "../../../contexts/AssetsContext";
import { TreeNode } from "..";

export const applyFilters = (node: TreeNode, filters: Filter): boolean => {
  const { text, energy, critical } = filters;

  const hasFilters = !!text || energy || critical;
  node.visible = false;

  if(!hasFilters){
    node.visible = true;
  }

  if (hasFilters) {
    const matchesText = node.name.toLowerCase().includes(text.toLowerCase());

    const matchesEnergy =
      !energy || (node.type === "component" && node.sensorType === "energy");
    const matchesCritical =
      !critical || (node.type === "component" && node.status === "alert");

    const isVisible = matchesText && matchesEnergy && matchesCritical;

    const matchesNonComponent = !!text ? matchesText : false;

    node.visible = node.type !== "component" ? matchesNonComponent : isVisible;

    const hasChildren = node.children.length > 0;
    const shouldFilterChildren = node.type !== "location" && node.visible;

    if(hasChildren && shouldFilterChildren){
      const childrenVisibility = node.children.map(child => applyFilters(child, filters));
      const hasVisibleChildren = childrenVisibility.some((isVisible) =>
        isVisible
      );
  
      if (hasVisibleChildren) {
        node.visible = true;
      }
    }
  }

  return node.visible;
};
