import { useState } from 'react'
import './Home.css'

export function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>You are in Home</div>
    </>
  )
}

