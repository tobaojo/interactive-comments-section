import { saveToLocalStorage } from "../utils/utils";

export async function fetchCurrentUser() {
  try {
    const res = await fetch("/data.json");
    if (!res.ok) {
      throw new Error("HTTP Error");
    }
    const data = await res.json();
    console.log(data);
    saveToLocalStorage(`currentUser`, data?.currentUser);
    return data;
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
    console.log(data);
    saveToLocalStorage(`comments`, data?.comments);
    return data;
  } catch (error) {
    throw new Error(`Error fetching data ${error}`);
  }
}
