'use client'


import { redirect } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Home() {
  

  if (localStorage.getItem('hun') === 'true') {

    redirect('/hu')

  } else {
    redirect('/en')
  }


  
}


