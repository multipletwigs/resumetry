'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const params = useParams();
  
  return (
    <div>{params['application-id']}</div>
  )
}
export default page; 