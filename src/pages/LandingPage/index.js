// eslint-disable-next-line
import { Link } from 'react-router-dom'
import LandingImage from '../../assets/landingImage.svg'
import Button from '../../components/Button'
import './landingPage.css'
export default function LandingPage() {
    return (
        <div className='landing-box'>
            <div className=''>
                <h1 className='h1 text-primary text-center'>Recovery Afiliaciones</h1>
                <img src={LandingImage} atl='recovery app'  className='img-fluid'/>
            </div>
            <div className='w-100 text-center'>
                <Link to='/sign-in' >
                    <Button looks={'mt-1 btn-login'}>Iniciar Sesion</Button>
                </Link>
                <Link to='/sign-up'>
                    <Button looks={'mt-1 mr-1'}>Registrarse</Button>
                </Link>
            </div>
        </div>
    )
}