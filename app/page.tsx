'use client'


import Image from "next/image";
import { useState, useEffect } from 'react'

export default function Home() {
  const [error, setError] = useState('')
  const [noRes, setNoRes] = useState('')
  const [loading, setLoading] = useState(false)
  const [typedText, setTypedText] = useState('')




  const handleNoPress = async (e:React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
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
      setLoading(false)

    } catch (err: any) {
    setError(err.message)
    } 


  }

  useEffect(() => {
  if (!noRes) return;

  setTypedText("");

  let i = -1;

  const interval = setInterval(() => {
  if (i < noRes.length) {
    setTypedText(prev => prev + noRes.charAt(i));
    i++;
  } else {
    clearInterval(interval);
  }
}, 21);


  return () => clearInterval(interval);
}, [noRes]);


  



  





  return (
   <div className="flex flex-col items-center justify-center min-h-screen space-y-14 bg-gradient-to-br from-zinc-900 to-red-950 font-sans dark:bg-black px-4">
  <div className="w-full flex justify-center">
    <p className="w-full max-w-4xl text-balance text-center text-4xl font-bold text-gray-900 dark:text-white">
  You don't feel like going? Get a good reason to reject whatever idea your friend has!
</p>
  </div>

  {noRes && <p className="text-3xl text-center text-gray-700 dark:text-gray-300">{typedText}</p>}

  <button
    onClick={handleNoPress}
    disabled={loading}
    className="rounded-md bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-white hover:bg-gradient-to-r hover:from-red-700 hover:to-red-800 transition-colors duration-200"
  >
    {loading ? 'Getting rejection...' : 'I want to reject!'}
  </button>
</div>

  );
}


