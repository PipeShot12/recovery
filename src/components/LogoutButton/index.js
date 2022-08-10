import React from 'react'
import { useHistory } from 'react-router-dom'
import {useUser} from '../../context/userContext'
import Button from '../Button'
export default function Index() {
    const history = useHistory()
    const { localStorageToken, saveTemporalToken, setSaveTemporalToken, setLocalStorageToken } = useUser()
    const handleLogout = () => {
        if (localStorageToken) {
          setLocalStorageToken('')
          setTimeout(() => window.localStorage.removeItem('loginToken'), 200)
          history.replace('/')
        } else if (saveTemporalToken) {
          setSaveTemporalToken('')
          history.replace('/')
        }
      }
  return (
    <Button looks={'btn-secondary'} handlerClick={handleLogout}>Cerrar Sesion</Button>
  )
}
