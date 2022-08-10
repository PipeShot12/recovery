import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import {UserProvider} from './context/userContext'
import useLocalStorage from './hooks/useLocalStorage'
import './App.css';
import AppRoutes from './routes';
import LandingPage from './pages/LandingPage';
function App() {
  const { localStorageToken } = useLocalStorage('loginToken')
  const getToken = localStorageToken
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route exact path='/' render={() => getToken?.token ? <Redirect to='/app' /> : <LandingPage/>} />
          <Route path='*'>
            <AppRoutes />
          </Route>
        </Switch>
        </UserProvider>
    </Router>
  )
}

export default App;
