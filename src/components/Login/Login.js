import "../../App.css";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { resetPassword, createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from "./loginManager";

initializeLoginFramework();
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

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false)
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }
  }

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
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
      .catch(error => {
        console.log(error.message);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
      .catch(error => {
        console.log(error.message);
      })
    }

    e.preventDefault();
  };

  return (
    <div style={{textAlign:'center'}}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
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
      <button onClick={() => resetPassword(user.email)}>Forget or Reset Password</button>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>User { newUser ? 'create' : 'Logged In' } successfully</p>
      )}
    </div>
  );
}

export default Login;