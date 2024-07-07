import {
  doc,
  setDoc,
  db,
  updateDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  deleteDoc,
} from "@/firebase.js";
import { usedataStore } from "@/stores/dataStore";
// import { get } from "firebase/database";

export const addNotification = async (userId, sender, post, type, message) => {
  console.log(sender, sender.id, "id");
  const store = usedataStore();
  const userid = store.loggedInUser.id;

  const notify = await AlreadyNotifiedUser(post.postid, sender.id, type);

  if (!notify) {
    const notificationRef = collection(db, "notifications");
    await addDoc(notificationRef, {
      userId,
      sender,
      post,
      message,
      type,
      read: false,
      timestamp: Date.now(),
    });
  }
};

export const AlreadyNotifiedUser = async (postid, userid, type) => {
  if (type === "comment") return false;
  const notifyRef = collection(db, "notifications");

  const q = query(
    notifyRef,
    where("post.postid", "==", postid),
    where("sender.id", "==", userid),
    where("type", "==", type)
  );
  const data = [];

  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs[0].data();
  console.log(user, "quwer");

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
    console.log(data, "d");
  });

  if (!data.length) {
    return false;
  } else {
    return true;
  }
};

export const getNotification = async () => {
  const store = usedataStore();
  const userid = store.loggedInUser.id;

  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userid)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let notifications = [];

    querySnapshot.forEach((doc) => {
      console.log(doc.data(), "data");
      notifications.push(doc.data());
    });
    console.log(notifications);
    store.$patch({
      notifications: notifications,
    });
  });

  console.log(store.notifications, "notifications");
};
