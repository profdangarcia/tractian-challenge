import { ICompany } from "../@types/ICompany";
import { apiUrl } from "../utils/constants";

export const fetchCompanies = async (): Promise<ICompany[]> => {
  try {
    const res = await fetch(`${apiUrl}/companies`, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
};