'use client'

import React, { useEffect } from 'react'
import { useRouter } from "next/navigation"; 

const Index = () => {
  const router = useRouter()
  useEffect(()=>{
    router.push('/job-board')
  })
}

export default Index; 
