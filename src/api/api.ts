import { saveToLocalStorage } from "../utils/utils";

export async function fetchCurrentUser() {
  try {
    const res = await fetch("/data.json");
    if (!res.ok) {
      throw new Error("HTTP Error");
    }
    const data = await res.json();
    saveToLocalStorage(`currentUser`, data?.currentUser);
    return data.currentUser;
  } catch (error) {
    throw new Error(`Error fetching data ${error}`);
  }
}

export async function fetchComments() {
  try {
    const res = await fetch("/data.json");
    if (!res.ok) {
      throw new Error("HTTP Error");
    }
    const data = await res.json();

    saveToLocalStorage(`comments`, data?.comments);
    return data.comments;
  } catch (error) {
    throw new Error(`Error fetching data ${error}`);
  }
}
