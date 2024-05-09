import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadFile = async (file) => {
  try {
    if (!file) throw new Error("File required");
    const storageRef = ref(storage, "images/" + file.name);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log("error uploading file", error.message);
    throw error;
  }
};
