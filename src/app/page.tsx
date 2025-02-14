"use client"
import axios from 'axios'
import React from 'react'

const page = () => {
  const start = async () => {
    try {
      const response = await axios.post('/api/tweet')
      console.log(response.data)
    } catch (error) {
      console.error("❌ Error fetching tour packages:", error)
      
    }
  }
  return (
    <button onClick={start}>Test</button>
  )
}

export default page