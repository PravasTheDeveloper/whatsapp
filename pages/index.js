import { onAuthStateChanged, signOut } from 'firebase/auth'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [useDetails, setuseDetails] = useState()

  const Router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth , (user) => {
      setuseDetails(user.uid)
      if(!user){
        Router.push("/login")
        
      }
    })
  }, [])

  console.log(useDetails)
  
  return (
    <>
      <div>
        <Link href="/login">Login</Link>
        <button onClick={()=>{auth.signOut()}}> logout</button>
      </div>
    </>
  )
}
