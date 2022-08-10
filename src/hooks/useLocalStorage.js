import { useState, useEffect } from 'react'

export default function useLocalStorage (key) {
  const [localStorageToken, setLocalStorageToken] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue !== null) return JSON.parse(jsonValue)
    else {
      return null
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageToken))
  }, [key, localStorageToken])

  return { localStorageToken, setLocalStorageToken }
}