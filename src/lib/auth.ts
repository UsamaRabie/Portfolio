import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirebaseApp } from "./firebase";

let auth: ReturnType<typeof getAuth> | null = null;

function getAuthInstance() {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function login(email: string, password: string) {
  return signInWithEmailAndPassword(getAuthInstance(), email, password);
}

export function logout() {
  return signOut(getAuthInstance());
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(getAuthInstance(), callback);
}

export function getCurrentUser(): User | null {
  return getAuthInstance().currentUser;
}
