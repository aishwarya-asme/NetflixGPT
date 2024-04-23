import React, { useRef, useState } from 'react'
import Header from "./Header"
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR,BG_IMG } from "../utils/constants";


const Login = () => {
  const [isSignInForm,setisSignInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  
  const dispatch=useDispatch();
  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

  const toggleSignInForm=()=>{
    setisSignInForm(!isSignInForm)
  }

  const handleButtonClick=()=>{
    //Validate the form data
    const message=checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);

    if(message) return;
    //Sign In/Sign Up logic
    if(!isSignInForm){
      //sign up Logic
      createUserWithEmailAndPassword(auth, 
        email.current.value, 
        password.current.value
      )
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user,{
      displayName: name.current.value,
      photoURL:USER_AVATAR,
    })
    .then(()=>{ 
      const {uid,email,displayName,photoURL}=
      auth.currentUser;
      dispatch(
        addUser({
        uid:uid,
        email:email,
        displayName:displayName,
        photoURL:photoURL,})
      )
      
    })
    .catch((error)=>{
      setErrorMessage(error.message)
    })
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "-" +errorMessage)
  
  });

    }

    else{
      //Sign In logic
      signInWithEmailAndPassword(auth, 
        email.current.value, 
        password.current.value
      )
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  
  });

    }
  }
  return (
    <div >
       <Header />
    
   
       <div>
        {/* w-full bg-slate-500  */}
      <img className="absolute h-screen object-cover w-full bg-slate-500"  src={BG_IMG} alt='background'/>
      </div>

        <form 
        onSubmit={(e)=>e.preventDefault()}
        //'w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        className='absolute bg-black md:py-20 py-16 px-5 m-36 md:w-[440px] mx-auto  right-0 left-0 text-white text-center rounded-md bg-opacity-80 w-[400px]'>

          <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
          
          {!isSignInForm &&
          (<input 
          ref={name}
          type="text" 
          placeholder='Full Name' 
          className='p-4 my-4 w-full bg-gray-700'/>)}

          <input 
          ref={email}
          type="text" 
          placeholder='Email Address' 
          className='p-4 my-4 w-full bg-gray-700'/>


          <input 
          ref={password}
          type="password" 
            placeholder='Password' 
            className='p-4 my-4 w-full bg-gray-700'/>

          <p className='text-red-700 font-bold text-lg py-2'>{errorMessage}</p>

          <button 
          className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}</button>

          <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
            {isSignInForm?"New to Netflix? Sign Up Now":"Already registered? Sign In Now "}</p>
        </form>
       
    </div>
  );
};

export default Login;