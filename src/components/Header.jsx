import { onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../assets/images/logo.png"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import {addUser,removeUser} from "../utils/userSlice"

const Header=()=>{
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const userName = user?.displayName;
    const dispatch = useDispatch();

    const handleSignOut=()=>{
        signOut(auth)
        .then(()=>{
            navigate("/");
        dispatch(addUser(userName));
        })
        .catch((error)=>{
            navigate("/error")
        });
};

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                const{uid,email,displayName,photoURL}=user;
                dispatch(
                    addUser({
                        uid:uid,
                        email:email,
                        displayName:displayName,
                        photoURL:photoURL,
                    })
                );
                navigate("/browse")
            }else{
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe();
    },[]);

    

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img 
            className="h-16 w-42 mx-auto md:mx-0 pt-5"
            src={logo} alt="Logo" />

            {user && (<div className=" flex p-2 justify-between">
                <img className="hidden md:block w-20 h-19.5 p-4" src={user?.photoURL} alt="user-icon" />

                <button onClick={handleSignOut} className="font-bold text-white">
                    Sign Out
                </button>
            </div>
            )}   
        </div>

    );
};

export default Header;