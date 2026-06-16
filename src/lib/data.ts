import { get, ref, set } from "firebase/database";
import { getDatabase } from "firebase/database";
import { getFirebaseApp } from "./firebase";
import { PortfolioData } from "@/types";
import defaultData from "@/data/portfolio.json";

export function getDefaultData(): PortfolioData {
  return defaultData as PortfolioData;
}

const DATA_PATH = "portfolio/data";

function getDb() {
  return getDatabase(getFirebaseApp());
}

export async function fetchPortfolioData(): Promise<PortfolioData | null> {
  try {
    const db = getDb();
    const snap = await get(ref(db, DATA_PATH));
    if (snap.exists()) return snap.val() as PortfolioData;
    return null;
  } catch {
    return null;
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    const db = getDb();
    await set(ref(db, DATA_PATH), data);
    return true;
  } catch {
    return false;
  }
}
