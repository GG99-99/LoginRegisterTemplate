import { useState } from 'react'
import { useAuth } from '../../components/AuthProvider/AuthProvider'
import './Home.css'

export function Home() {
  const {user, setUser} = useAuth()

  return (
    <>
      <div>You are in Home</div>
      <p>{user.id}</p>
    </>
  )
}

