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

    console.log(userpost);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const initUserPost = async () => {
  try {
    const store = usedataStore();
    const userid = store.loggedInUser.id;

    // console.log("USER ID", userid);

    const q = query(collection(db, "posts"), where("userid", "==", userid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push(data);
      });

      store.$patch({
        posts,
      });
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const addLikesToPost = async (postid) => {
  const washingtonRef = doc(db, "posts", postid);
  const num = 0;
  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    likes: num++,
  });
};

export const deletePost = async (id) => {
  await deleteDoc(doc(db, "posts", id));
};

export const getAllUsersPosts = async () => {
  try {
    const store = usedataStore();

    const q = query(collection(db, "posts"));
    const posts = [];

    const querySnapshot = await getDocs(q);

    const populateUser = querySnapshot.forEach(async (doc) => {
      const post = doc.data();
      const user = await getUserByID(post?.userid);
      post.user = user;
      console.log(post, "snns");
      posts.push(post);

      console.log(populateUser, "pskso");
    });

    await Promise.all(populateUser);

    store.$patch({
      allPosts: posts,
    });
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
    const docRef = doc(db, "users", username);
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
