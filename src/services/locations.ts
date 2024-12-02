import { ILocation } from "../@types/ILocation";
import { apiUrl } from "../utils/constants";

export const fetchCompanyLocations = async (
  companyId: string
): Promise<ILocation[]> => {
  try {
    const res = await fetch(`${apiUrl}/companies/${companyId}/locations`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};
