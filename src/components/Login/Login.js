import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
  });

  initializeLoginFramework()

  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  const handleChangeBlur = (e) => {
    // console.log(e.target.name, e.target.value);
    let isFieldValid = true;

    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passHasNumber ;  // for satisfying both value
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.email, user.password, user.name)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  }


  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> 
        : <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in using Facebook</button>

      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""></img> 
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        { newUser && <input type="text" name="name" onBlur={handleChangeBlur} placeholder="Your name" />}  {/*by default valid(true) */}
        <br/>
        <input type="text" name="email" onBlur={handleChangeBlur} placeholder="write your email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleChangeBlur} placeholder="your password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      { user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;