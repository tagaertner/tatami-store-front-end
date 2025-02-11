import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { logoutUser } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';

function Header() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userState.user);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());

    // AWS Cognito Logout URL
    const cognitoLogoutUrl = import.meta.env.VITE_TATAMI_BE + '/auth/logout';

    window.location.href = cognitoLogoutUrl;
  };

  return (
    <header>
      <div className='align-element flex justify-center sm:justify-end py-2'>
        {/* USER */}
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <Link to={'/profile'} className='text-xs sm:text-sm'>Hello, {user.first_name}</Link>
            <Button variant='link' size='sm' onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center -mr-4'>
            <Button asChild variant='link' size='sm'>
              <Link to={import.meta.env.VITE_TATAMI_BE + '/auth/login'}>Sign in / Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;