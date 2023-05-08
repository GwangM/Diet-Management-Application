import { get, ref, child } from "firebase/database";
import { db } from "../../firebaseConfig";
const dbRef = ref(db);

export async function CheckEmail(email) {
  const result = await get(child(dbRef, `users/${email}`));
  return result.exists();
}
