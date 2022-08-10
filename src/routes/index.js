import { Redirect,Switch,Route } from 'react-router-dom'
import { useUser } from '../context/userContext'
import Login from '../pages/Login'
import Welcome from '../pages/Welcome'
import FormularioAfiliacion from '../pages/recovery'
import GenerateExcel from '../pages/GenerateExcel'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'
export default function AppRoutes () {
  // Pseudo Rexdux
  const { localStorageToken, saveTemporalToken } = useUser()
  const { token } = localStorageToken || saveTemporalToken
  return (
    <Switch>
      <Route path='/sign-in' render={() => token ? <Redirect to='/app' /> : <Login />} />
      <Route path='/sign-up' render={() => token ? <Redirect to='/app' /> : <Register/>} />
      <Route path='/new-form' render={() => token ? <FormularioAfiliacion /> : <Redirect to='/' />} />
      <Route path='/generate-excel' render={() => token ? <GenerateExcel /> : <Redirect to='/' />} />
      <Route path='/app' render={() => token ? <Welcome /> : <Redirect to='/' />} />
      <Route component={NotFound} />
    </Switch>
  )
}