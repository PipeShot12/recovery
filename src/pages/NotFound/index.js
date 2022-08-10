import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import pageNotFound from '../../assets/notFound.svg'
import './notFound.css'

export default function NotFound () {
  return (
    <dvi className='notFound-box' >
      <div>
        <img src={pageNotFound} atl='page not found' />
      </div>
        <Link to='/'>
            <Button looks={'mt-2'}>Vover a inicio</Button>
        </Link>
    </dvi>
  )
}

