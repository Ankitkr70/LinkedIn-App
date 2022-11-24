import db, { auth, provider, storage } from "../firebase";
import { FETCH_POSTS, SET_LOADING, SET_USER } from "./actionType";
import store from "../store";
export const setUser = (user) => {
  return {
    type: SET_USER,
    user: user,
  };
};

export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    loading: loading,
  };
};

export const getPosts = (posts) => {
  return {
    type: FETCH_POSTS,
    posts: posts,
  };
};

export const signinUsingGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((payload) => {
      console.log(payload.user);

      store.dispatch(setUser(payload.user));
    })
    .catch((error) => console.log(error.message));
};

export const getUserAuth = () => {
  auth.onAuthStateChanged(async function (user) {
    store.dispatch(setUser(user));
  });
};

export const signOutAPI = () => {
  auth.signOut().then(() => {
    store.dispatch(setUser(null));
  });
};

export const createPostAPI = (payload) => {
  return async (dispatch) => {
    if (payload.image) {
      store.dispatch(setLoading(true));
      const uploadTask = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);

      uploadTask.on(
        "state_change",
        (snapshot) => {
          let progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`${progress}%`);
        },
        (error) => console.log(error),
        async () => {
          const imageURL = await uploadTask.snapshot.ref.getDownloadURL();
          const ref = await db.collection("Posts").add({
            user: {
              name: payload.user.displayName,
              email: payload.user.email,
              photo: payload.user.photoURL,
              date: payload.timestamp,
            },
            video: payload.video,
            image: imageURL,
            comments: 0,
            likes: 0,
            description: payload.description,
          });
          await db.collection("Posts").doc(ref.id).update({
            postID: ref.id,
          });
          store.dispatch(setLoading(false));
        }
      );
    } else if (payload.video) {
      store.dispatch(setLoading(true));
      console.log("Video");
      const ref = await db.collection("Posts").add({
        user: {
          name: payload.user.displayName,
          email: payload.user.email,
          photo: payload.user.photoURL,
          date: payload.timestamp,
        },
        video: payload.video,
        image: "",
        comments: 0,
        description: payload.description,
        likes: 0,
      });

      await db.collection("Posts").doc(ref.id).update({
        postID: ref.id,
      });
      store.dispatch(setLoading(false));
    }
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    let posts;
    db.collection("Posts")
      .orderBy("user.date", "desc")
      .onSnapshot((snapshot) => {
        posts = snapshot.docs.map((doc) => doc.data());
        store.dispatch(getPosts(posts));
      });
  };
};

export const addLikes = (id) => {
  console.log(id);
  return async (dispatch) => {
    const doc = await db.collection("Posts").doc(id).get();
    console.log(doc.data());
    await db
      .collection("Posts")
      .doc(id)
      .update({
        likes: doc.data().likes + 1,
      });
    fetchPosts();
  };
};



