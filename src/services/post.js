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
  orderBy,
} from "@/firebase.js";
import { usedataStore } from "@/stores/dataStore";
// import { get } from "firebase/database";

import { addNotification } from "@/services/notification.js";
import { getUserByID } from "@/services/user.js";

export const createNewPost = async (data) => {
  try {
    const store = usedataStore();

    const userpost = {
      postid: "",
      userid: store.loggedInUser.id,
      caption: data.caption,
      createdAt: new Date(),
      likedBy: [],
      comments: [],
      image: data.image,
    };

    const docRef = await addDoc(collection(db, "posts"), userpost);
    console.log("Document written with ID: ", docRef.id);

    await updateDoc(docRef, {
      postid: docRef.id,
    });

    getAllUsersPosts();

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

    // getting logged in user posts

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

    // get posts and order them by the most recent post
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const posts = [];

    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
      const post = doc.data();

      // add the user object to the post array
      const user = await getUserByID(post?.userid);
      post.user = user;
      posts.push(post);
    });

    await Promise.all(promises);
    store.$patch({
      allPosts: posts,
    });
  } catch (error) {
    console.log(error.message);

    throw error;
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
  try {
    const store = usedataStore();

    const user = store.loggedInUser;

    if (!post) return;
    const postRef = doc(db, "posts", post.postid);
    const userRef = doc(db, "users", post.userid);

    // Check if the user already liked the post
    if (post.likedBy.includes(userid)) {
      post.likedBy = post.likedBy.filter((id) => id !== userid);
    } else {
      post.likedBy.push(userid);

      // once a user likes a post send notification to the post owner

      await addNotification(post.userid, user, post, "like", "liked your post");
    }

    const newLikedByArray = post.likedBy;

    await updateDoc(postRef, {
      likedBy: newLikedByArray,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const togglesavePost = async (post) => {
  try {
    const store = usedataStore();

    // check if post has been saved already
    const postExist = store.PostSaved.find((e) => e.post.postid == post.postid);

    // add to the collection if it hasnt
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
    });

    store.$patch({
      PostSaved: post,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addComments = async (post, text) => {
  try {
    const store = usedataStore();
    const logedduser = store.loggedInUser;

    const docRef = doc(db, "posts", post.postid);
    const userRef = doc(db, "users", logedduser.id);
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

    // once a user comments on a post send a notification to the post owner
    await addNotification(
      post.userid,
      logedduser,
      post,
      "comment",
      "commented on your post"
    );
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
