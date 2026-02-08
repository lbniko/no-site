'use client'


import { redirect, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRef } from "react";


export default function Home() {
  const [error, setError] = useState('')
  const [noRes, setNoRes] = useState('')
  const [huRes, setHuRes] = useState('')
  const [loading, setLoading] = useState(false)
  const [typedText, setTypedText] = useState('')
  var [hun, setHun] = useState(false)
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();





 useEffect(() => {
  if (localStorage.getItem('hun') === 'false') {
    router.push('/en')
  }
}, []);



  const handleNoPress = async () => {
  setLoading(true);
  try {
    console.log("Fetching NO reason...");
    const res = await fetch('https://naas.isalman.dev/no');
    const data = await res.json();
    console.log("Reason:", data.reason);
    setNoRes(data.reason);

    console.log("Fetching translation...");
    const tRes = await fetch('/api/translate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: data.reason,
    target_language: 'hu'
  })
});



let huData;
try {
  huData = await tRes.json();
} catch (e) {
  console.error("Translation API returned invalid JSON", e);
  setError("Translation failed");
  setLoading(false);
  return;
}


setHuRes(huData.translated_text);


 
  } catch (err: any) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}


  const handleSwitchLanguage = async (e:React.FormEvent) => {

    setHun(true)
    localStorage.setItem('hun', 'false')
    router.push('/en')

  }

 useEffect(() => {
  if (!huRes) return;

  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  indexRef.current = 0;

  intervalRef.current = setInterval(() => {
    if (indexRef.current < huRes.length) {
      setTypedText(huRes.substring(0, indexRef.current + 1));
      indexRef.current++;
    } else {
      clearInterval(intervalRef.current!);
    }
  }, 21);

  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, [huRes]);


 


  



  





  return (
   <div className="relative flex flex-col items-center justify-center min-h-screen space-y-14 bg-gradient-to-br from-zinc-900 to-red-950 font-sans dark:bg-black px-4">
      <h1 className="absolute top-4 left-4 text-xl font-bold text-zinc-100">
      Elutasítás App
      </h1>

      <button
      onClick={handleSwitchLanguage}
      className="absolute top-4 right-4 rounded-md bg-red-800 px-3 py-1 text-sm text-zinc-100 hover:bg-red-900 transition-colors duration-200">
       Switch to English
      </button>

      
    
  <div className="w-full flex justify-center">
    <p className="w-full max-w-4xl text-balance text-center text-4xl font-bold text-gray-900 dark:text-white">
  Nemet szeretnél mondani, de nincs jó kifogásod? Semmi baj, nyomd meg a gombot, és egy kreatív elutasító üzenetet kapsz.
</p>
  </div>

  {huRes && <p className="text-3xl text-center text-gray-700 dark:text-gray-300">{typedText}</p>}

  <button
    onClick={handleNoPress}
    disabled={loading}
    className="rounded-md bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-white hover:bg-gradient-to-r hover:from-red-700 hover:to-red-800 transition-colors duration-200"
  >
    {loading ? 'Elutasítás...' : 'Nemet akarok mondani!'}
  </button>
</div>

  );
}


