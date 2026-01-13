'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="p-4 border rounded">
      <p className="text-xl mb-2">当前计数：{count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        点击 +1
      </button>
    </div>
  )
}
