import { PortfolioData } from "@/types";
import defaultData from "@/data/portfolio.json";

export function getDefaultData(): PortfolioData {
  return defaultData as PortfolioData;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    if (typeof window === "undefined") {
      const fs = await import("fs/promises");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "src/data/portfolio.json");
      const raw = await fs.readFile(filePath, "utf-8");
      return JSON.parse(raw);
    }
    const res = await fetch("/api/data");
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch {
    return getDefaultData();
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    const res = await fetch("/api/data", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
