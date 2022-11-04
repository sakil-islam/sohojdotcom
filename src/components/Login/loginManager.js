import firebaseConfig from "./firebase.config";
import * as firebase from "firebase/app";
import "firebase/auth";

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const { displayName, email, photoURL } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return signedInUser;
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
};

export const handleSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then((result) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword( email, password)
    .then((res) => {
      console.log(res);
      const newUserInfo = res.user;
      newUserInfo.success = true;
      newUserInfo.error = "";
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const updateUserName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log("User name Update successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
};
