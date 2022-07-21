import React, { useEffect, useState } from 'react'
import {EyeIcon,EyeOffIcon} from "@heroicons/react/outline"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'
import { ref, set } from 'firebase/database'

function signup() {
    
    const Router = useRouter()

    // const Router = useRouter();
    useEffect(() => {
      onAuthStateChanged(auth , (user) => {
        if(user){
          Router.push("/")
        }
      })
    }, [])


    const [passwordHide, setpasswordHide] = useState(true)
    const [passwordIcon, setpasswordIcon] = useState(true)
    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    const GoogleLogin = () =>{
        // alert("login")
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider)
        .then((result)=>{
            const userId = result.user.uid;
            const userEmail = result.user.email;
            const photoURL = result.user.photoURL
            const username = result.user.displayName
            // console.log(result.user)
            databaseEntry(userId,userEmail,photoURL,username);

        }).catch(() =>{
            alert("Something Went Wro");
        })
    }

    const emailPassLogin = () =>{
        const singInEmial = createUserWithEmailAndPassword(auth,email,password).
        then((result) =>{
            const userId = result.user.uid;
            const userEmail = result.user.email;
            const photoURL = "default.png";
            const username = "Anonimus"
            // console.log(result.user)
            databaseEntry(userId,userEmail,photoURL,username);
        }).catch((err) => {
            alert("Please First Sign Up")
        }) 

        
    }

    const databaseEntry = (userId,userEmail,photoURL,username) =>{

        const datainput = set(ref(db, "user/" + userId), {
            userid:userId,
            email:userEmail,
            picture:photoURL,
            username:username
        })
        
        if(datainput){
            alert("Login Succesfull");
            Router.push("/")
        }else{
            alert("Something went wrong")
        }
    }

    return (
        <div className='bg-gray-300 h-screen w-screen'>
            <div className='h-full w-full flex justify-center items-center'>
                <div className='LoginBox bg-white rounded-lg shadow'>
                    <div className='h-full w-full p-20 pt-10'>
                        <div className='w-full flex justify-center'>
                            <img className='w-2/4' src="MainWhatsapplogo.png" alt="Main Logo" />
                        </div>
                        <div className='w-full'>
                            <div className='h-full w-full'>
                                <input type="text" className='my-5 w-full outline-none border-b border-solid border-gray-500' placeholder='email@gmail.com' onChange={(e)=>{setemail(e.target.value)}} />
                            </div>
                            <div className='h-full w-full relative'>
                                <input type={passwordHide === true ? "password" : "text"} className='my-5 w-full outline-none border-b border-solid border-gray-500' placeholder='********' onChange={(e)=>{setpassword(e.target.value)}} />
                                <div className='passwordIcon' onClick={()=>{setpasswordHide(!passwordHide),setpasswordIcon(!passwordIcon)}} >{passwordIcon == true ? <EyeIcon  className='w-full' /> : <EyeOffIcon  className='w-full' />}</div>
                            </div>
                            <div>
                                <button onClick={emailPassLogin} className="bg-emerald-500 w-full text-white py-1 mb-5">Sign Up</button>
                            </div>
                            <div className='mb-5'>
                                <p className='font-semibold text-md'>Forget Password ? <span className='text-emerald-500'> Click Here</span></p>
                            </div>
                        </div>
                        <div className='flex mb-5 justify-center'>
                            <div className='mx-5'>
                                <img src="GoogleLogin.png" className='SocialMediaLogin' onClick={GoogleLogin} alt="" />
                            </div>
                            <div className='mx-5'>
                                <img src="FacebookLogin.png" className='SocialMediaLogin' alt="" />
                            </div>
                        </div>
                        <div>
                            <p className='font-semibold text-md'>Don't Have Any Account ? <span className='text-emerald-500'> Sign Up</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signup
