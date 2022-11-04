import "../../App.css";
import React from "react";
import firebaseConfig from "./firebase.config";
import { useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig);
function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || {from : { pathname : '/'} };

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
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
        };
        setUser(signedInUser);
        console.log(displayName, email, photoURL);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
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
        setUser(signedOutUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const is_valid_password = e.target.value.length > 6;
      const passwordHasAndSpecialChar =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(
          e.target.value
        );
      isFieldValid = is_valid_password && passwordHasAndSpecialChar;
      //const hasNumber = input => /\d/.test(input);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('info', res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  };

  const updateUserName = name => {
    const user =firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then( () => {
      console.log('User name Update successfully!');
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div style={{textAlign:'center'}}>
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}

      {user.isSignedIn && (
        <div>
          <p>Welcome {user.name}</p>
          <p> email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {/* <p>name:{user.name}</p>
        <p>email:{user.email}</p>
        <p>password:{user.password}</p>
        <p>successful:{user.successful}</p> */}

        {newUser && (
          <input
            type="name"
            name="name"
            placeholder="Type Your Name"
            onBlur={handleBlur}
          />
        )}
        <br></br>
        <input
          type="email"
          name="email"
          placeholder="Type Your Email"
          onBlur={handleBlur}
          required
        />
        <br></br>
        <input
          type="password"
          name="password"
          id=""
          placeholder="Type Your Password"
          onBlur={handleBlur}
          required
        />
        <br />
        <input type="submit" value={ newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>User { newUser ? 'create' : 'Logged In' } successfully</p>
      )}
    </div>
  );
}

export default Login;