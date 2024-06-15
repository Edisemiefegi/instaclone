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
      likedBy: [],
      comments: [],
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

    console.log("USER ID", userid);

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

export const deletePost = async (id) => {
  await deleteDoc(doc(db, "posts", id));
};

export const getAllUsersPosts = async () => {
  try {
    const store = usedataStore();

    const q = query(collection(db, "posts"));
    const posts = [];

    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
      const post = doc.data();
      const user = await getUserByID(post?.userid);
      post.user = user;
      posts.push(post);
    });

    await Promise.all(promises);
    // posts.forEach(async (e) => {
    //   await addLikesToPost(e.postid, e.userid);

    //   await unlikePost(e.postid, e.userid);
    //   console.log(e?.userid, "userid", e?.postid, "postsid");
    // });

    store.$patch({
      allPosts: posts,
    });
    console.log(store.allPosts, "al");
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
    const q = query(collection(db, "users"), where("username", "==", username));

    const queryDocs = await getDocs(q);

    const user = queryDocs.docs[0].data();
    // console.log(username, user);

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const getPostByuserid = async (userid) => {
  try {
    const q = query(collection(db, "posts"), where("userid", "==", userid));

    const user = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user.push(doc.data());
    });

    return user;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const likeUnlikePost = async (post, userid) => {
  if (!post) return;
  const postRef = doc(db, "posts", post.postid);

  // Check if the user already liked the post
  if (post.likedBy.includes(userid)) {
    post.likedBy = post.likedBy.filter((id) => id !== userid);
  } else {
    post.likedBy.push(userid);
  }

  const newLikedByArray = post.likedBy;

  await updateDoc(postRef, {
    likedBy: newLikedByArray,
  });

  console.log("Post liked successfully");
};

export const togglesavePost = async (post) => {
  try {
    const store = usedataStore();
    const postExist = store.PostSaved.find((e) => e.post.postid == post.postid);

    if (!postExist) {
      const savedpost = {
        post: post,
        userid: store.loggedInUser.id,
        savedpostid: "",
      };

      const saveRef = await addDoc(collection(db, "savedPosts"), savedpost);

      await updateDoc(saveRef, {
        savedpostid: saveRef.id,
      });
    } else {
      const data = store.PostSaved.filter((e) => e.post.postid !== post.postid);
      store.$patch({
        PostSaved: data,
      });

      let id = postExist.savedpostid;
      await deleteDoc(doc(db, "savedPosts", id));
    }

    getuserSavedPosts();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getuserSavedPosts = async () => {
  try {
    const store = usedataStore();
    const userid = store.loggedInUser.id;
    const post = [];

    const q = query(
      collection(db, "savedPosts"),
      where("userid", "==", userid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      post.push(data);
      // doc.data() is never undefined for query doc snapshots
    });

    store.$patch({
      PostSaved: post,
    });
    // console.log(post, store.PostSaved, "steie");
  } catch (error) {
    console.log(error.message);
  }
};

export const addComments = async (post, text) => {
  try {
    const store = usedataStore();
    const userid = store.loggedInUser.id;

    const docRef = doc(db, "posts", post.postid);
    const userRef = doc(db, "users", userid);
    const docSnap = await getDoc(userRef);

    const data = {
      users: {
        user: docSnap.data(),
      },
      commentId: generateUniqueId(),
      message: text,
    };

    post.comments.push(data);
    const addcomment = post.comments;

    await updateDoc(docRef, {
      comments: addcomment,
    });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const generateUniqueId = () => {
  return "id-" + Date.now() + "-" + Math.floor(Math.random() * 1000000);
};

export const deletecomment = async (post, id) => {
  if (!post) {
    console.error("postId is undefined or null");
    return;
  }
  const docRef = doc(db, "posts", post.postid);

  const newComment = post.comments.filter((e) => e.commentId !== id);
  post.comments = newComment;

  await updateDoc(docRef, {
    comments: newComment,
  });
};

export const FollowingUsers = async (user) => {
  if (!user) return;

  const store = usedataStore();
  const logedduser = store.loggedInUser;

  const docRef = doc(db, "users", logedduser.id);

  console.log(logedduser, logedduser.following, "log");

  const userExist = logedduser.following.find((e) => {
    console.log(e, user.id, "usuusuuk");
    if (e.id == user.id) {
      return e;
    }
  });

  if (userExist) {
    logedduser.following = logedduser.following.filter((e) => {
      console.log(e, e.id, user.id, user, "essss");
      if (e.id !== user.id) {
        return e;
      }
    });
    console.log(logedduser.following);
  } else {
    logedduser.following.push(user);
    console.log(logedduser.following, "floll");
  }

  await updateDoc(docRef, {
    following: logedduser.following,
  });

  // console.log(logedduser, "hshh");
};

export const getFollowers = async (user) => {
  const store = usedataStore();
  const logedduser = store.loggedInUser;
  const docRef = doc(db, "users", logedduser.id);

  console.log(logedduser, "fp", user);

  const follower = user.following.find((e) => {
    console.log(e, user, "usuusuuk");
    if (e.id == logedduser.id) {
      return e;
    }
  });
  console.log(follower, "fol");

  if (follower) {
    console.log(user, "in");
    logedduser.follower.push(user);
  }

  await updateDoc(docRef, {
    follower: logedduser.follower,
  });

  console.log(logedduser, "followers");
};
