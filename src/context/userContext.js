import {useState, useContext, createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
const context = createContext()
const useUser = () => {
  return useContext(context)
}
function UserProvider ({ children }) {
  const [saveTemporalToken, setSaveTemporalToken] = useState('')
  const { localStorageToken, setLocalStorageToken } = useLocalStorage('loginToken')

  return (
    <context.Provider value={{ localStorageToken, setLocalStorageToken, saveTemporalToken, setSaveTemporalToken }}>
      {children}
    </context.Provider>
  )
}
export {useUser,UserProvider}