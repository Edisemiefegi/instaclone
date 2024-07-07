import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import moment from "moment";

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

export const formatDate = (date) => {
  const timestampFromFirebase = new Date(date.seconds * 1000);

  // Convert to relative time using Moment.js
  const relativeTime = moment(timestampFromFirebase).fromNow();

  return relativeTime;
};
