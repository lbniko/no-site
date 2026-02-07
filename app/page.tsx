'use client'


import Image from "next/image";
import { useState } from 'react'

export default function Home() {
  const [error, setError] = useState('')
  const [noRes, setNoRes] = useState('')



  const handleNoPress = async (e:React.FormEvent) => {
    e.preventDefault();
    try{

      const res = await fetch('https://naas.isalman.dev/no', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      console.log(data.reason)
      setNoRes(data.reason)

    } catch (err: any) {
    setError(err.message)
    } 


  }



  





  return (
    <div className="flex flex-col space-y-14 min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 to-red-950 font-sans dark:bg-black">
      
       <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          You don't feel like going? Get a good reason to reject whatever idea your friend has!
        </h1>
        {noRes && <p className="text-3xl text-gray-700 dark:text-gray-300">{noRes}</p>}
        <button onClick={handleNoPress} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          I want to reject!
        </button>
        
      
    </div>
  );
}
