import { Link } from 'react-router-dom';
// import { Armchair } from 'lucide-react';

function Logo() {
  return (
    <Link
      to='/'
    >
      <img src="../public/logo_full.png" className='h-8' alt="" />
    </Link>
  );
}

export default Logo;