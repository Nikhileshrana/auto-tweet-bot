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

  const testlinkedin = async () => {
    try {
      const response = await axios.get('/api/linkedinPost')
      console.log(response.data)
    } catch (error) {
      console.error("❌ Error fetching tour packages:", error)
      
    }
  }


  return (
    <>
    <button onClick={start}>Test</button>

    <div className='container mt-20 '>
      <h1>Test</h1>
      <button onClick={testlinkedin}>Test Linkedin</button>
    </div>
    </>
  )
}

export default page