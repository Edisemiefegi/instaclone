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
  const store = usedataStore();
  const userid = store.loggedInUser.id;

  if (!userId || !sender || !sender.id || !type || !message) {
    console.error("Invalid data provided to addNotification");
    return;
  }

  const notify = await AlreadyNotifiedUser(
    post?.postid,
    sender.id,
    type,
    userid
  );

  if (!notify) {
    const notificationRef = collection(db, "notifications");
    await addDoc(notificationRef, {
      userId,
      sender,
      post: post || null, // post can be null if type is follow
      message,
      type,
      read: false,
      timestamp: Date.now(),
    });
  }
};

export const AlreadyNotifiedUser = async (
  postId = null,
  senderid,
  type,
  userid
) => {
  const notifyRef = collection(db, "notifications");
  let q;

  if (type === "comment") return false;

  if (type === "follow") {
    q = query(
      notifyRef,
      where("userId", "==", userid),
      where("sender.id", "==", senderid),
      where("type", "==", type)
    );
  } else if (type == "like" && postId) {
    q = query(
      notifyRef,
      where("post.postid", "==", postId),
      where("sender.id", "==", senderid),
      where("type", "==", type)
    );
  }

  const querySnapshot = await getDocs(q);
  const data = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
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
      notifications.push(doc.data());
    });
    store.$patch({
      notifications: notifications,
    });
  });

  // console.log(store.notifications, "notifications");
};
