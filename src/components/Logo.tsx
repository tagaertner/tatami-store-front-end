import { Link } from 'react-router-dom';
import { Blinds }from 'lucide-react';

function Logo() {
  return (
    <Link
      to='/'
      className='hidden lg:flex justify-center items-center p-2 rounded-lg text-white '
    >
      <img src="src/assets/logo_full.png" alt="tatami logo" className='h-10' />
      {/* <Blinds className='w-8 h-8' /> */}
    </Link>
  );
}

export default Logo;