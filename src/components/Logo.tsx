import { Link } from 'react-router-dom';
import logo from '../../public/assets/logo_full.png';

function Logo() {
  return (
    <Link
      to='/'
      className='hidden lg:flex justify-center items-center p-2 rounded-lg text-white '
    >
      <img src={logo} alt="tatami logo" className='h-10' />
    </Link>
  );
}

export default Logo;