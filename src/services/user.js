import {
  doc,
  db,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "@/firebase.js";

import { usedataStore } from "@/stores/dataStore";
import { addNotification } from "@/services/notification";

export const editProfilePhoto = async (img) => {
  try {
    const store = usedataStore();

    const userRef = doc(db, "users", store.loggedInUser.id);

    await updateDoc(userRef, {
      image: img,
    });

    const docRef = doc(db, "users", store.loggedInUser.id);
    const docSnap = await getDoc(docRef);

    store.$patch({
      loggedInUser: docSnap.data(),
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const editUserProfile = async (user) => {
  try {
    const store = usedataStore();

    const userRef = doc(db, "users", store.loggedInUser.id);

    await updateDoc(userRef, {
      bio: user.bio,
      gender: user.gender,
    });

    const docRef = doc(db, "users", store.loggedInUser.id);
    const docSnap = await getDoc(docRef);

    store.$patch({
      loggedInUser: docSnap.data(),
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getAllusers = async () => {
  try {
    const store = usedataStore();
    const q = query(collection(db, "users"));
    const users = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      users.push(user);
    });

    store.$patch({
      users,
    });
    // console.log(users, "alluser");
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getUserByID = async (userid) => {
  try {
    const docRef = doc(db, "users", userid);
    const docSnap = await getDoc(docRef);

    let user = null;
    if (docSnap.exists()) {
      user = docSnap.data();
    } else {
      console.log("No such document!");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user or posts:", error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    if (!username) return;
    const q = query(collection(db, "users"), where("username", "==", username));

    const queryDocs = await getDocs(q);

    const user = queryDocs.docs[0].data();
    if (!user) return;
    console.log(username, user, "hhhyjyfy");

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const FollowingUsers = async (user) => {
  if (!user) return;

  try {
    const store = usedataStore();
    const logedduser = store.loggedInUser;

    const clonedUser = removeFollowingAndFollowrFromUser(user);
    const clonedLoggedUser = removeFollowingAndFollowrFromUser(logedduser);

    const docRef = doc(db, "users", logedduser.id);
    const userRef = doc(db, "users", user.id);

    const userExist = logedduser.following.find((e) => {
      if (e.id == user.id) {
        return e;
      }
    });

    if (userExist) {
      logedduser.following = logedduser.following.filter((e) => {
        if (e.id !== user.id) {
          return e;
        }
      });

      user.followers = user.followers.filter((e) => {
        if (e.id !== logedduser.id) {
          return e;
        }
      });
    } else {
      logedduser.following.push(clonedUser);
      user.followers.push(clonedLoggedUser);

      await addNotification(
        user.id,
        logedduser,
        null,
        "follow",
        "started following you."
      );
    }

    await updateDoc(docRef, {
      following: logedduser.following,
    });

    await updateDoc(userRef, {
      followers: user.followers,
    });

    // console.log(logedduser, "login");
    // console.log(user, "user");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeFollowingAndFollowrFromUser = (user) => {
  const clonedUser = { ...user };

  delete clonedUser.followers;
  delete clonedUser.following;

  return clonedUser;
};

export const handleSearch = async (username) => {
  try {
    console.log(username);
    if (!username) return;

    const store = usedataStore();
    const logedduser = store.loggedInUser;
    let users = [];

    const q = query(
      collection(db, "users"),
      where("username", ">=", username.toLowerCase()),
      where("username", "<", username.toLowerCase() + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push(data);
      // doc.data() is never undefined for query doc snapshots
    });
    console.log(users, "u");

    return users;

    // store.recentSearched.push(...users);

    // console.log(store.recentSearched, "recent");
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
