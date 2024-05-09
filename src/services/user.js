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
  getDocs,
} from "@/firebase.js";
import { usedataStore } from "@/stores/dataStore";
// import { get } from "firebase/database";
import { useRouter } from "vue-router";

const router = useRouter();

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

export const createNewPost = async (data) => {
  try {
    const store = usedataStore();

    const userpost = {
      postid: "",
      userid: store.loggedInUser.id,
      caption: data.caption,
      createdAt: "",
      likes: 0,
      comments: 0,
      image: data.image,
    };

    const docRef = await addDoc(collection(db, "posts"), userpost);
    console.log("Document written with ID: ", docRef.id);

    await updateDoc(docRef, {
      postid: docRef.id,
    });
    store.posts.push(userpost);

    console.log(userpost);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const store = usedataStore();

    const q = query(
      collection(db, "posts"),
      where("userid", "==", store.loggedInUser.id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      store.posts.push(doc.data());
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
