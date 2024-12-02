import { IItem } from "../@types/IItem";
import { apiUrl } from "../utils/constants";

export const fetchCompanyItems = async (
  companyId: string
): Promise<IItem[]> => {
  try {
    const res = await fetch(`${apiUrl}/companies/${companyId}/assets`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};
