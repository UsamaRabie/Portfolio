import { PortfolioData } from "@/types";
import defaultData from "@/data/portfolio.json";

export function getDefaultData(): PortfolioData {
  return defaultData as PortfolioData;
}

export async function savePortfolioData(_data: PortfolioData): Promise<boolean> {
  return true;
}
