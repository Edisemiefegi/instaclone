import { usedataStore } from "../stores/dataStore.js";

import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  db,
  signInWithEmailAndPassword,
  getDoc,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "@/firebase.js";

export const registerUser = async (user) => {
  const store = usedataStore();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const id = userCredential?.user?.uid;

    const userdetails = {
      id: id,
      email: user.email,
      fullname: user.fullname,
      username: user.username,
      password: user.password,
      bio: "",
      followers: 0,
      following: 0,
      image: "",
      post: 0,
      role: "user",
      gender: "",
    };

    await setDoc(doc(db, "users", id), userdetails);
    store.$patch({
      loggedInUser: userdetails,
    });

    console.log(store.loggedInUser, userdetails);
  } catch (error) {
    throw error;
    console.log(error.message);
  }
};

export const loginfunc = async (user) => {
  const store = usedataStore();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const id = userCredential?.user?.uid;

    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    console.log(docRef, docSnap, "doc");

    if (docSnap.exists()) {
      store.$patch({
        loggedInUser: docSnap.data(),
      });
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error.message);

    throw error;
  }
};

export const resetPassword = async (user) => {
  try {
    const sendEmail = await sendPasswordResetEmail(auth, user.email);
    console.log(sendEmail, user.email, "sent");
  } catch (error) {
    throw error;
    console.log(error.message);
  }
};

export const signoutfunc = () => {
  const store = usedataStore();

  try {
    signOut(auth);
    store.$patch({
      loggedInUser: null,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
