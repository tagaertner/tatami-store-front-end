import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button'
// import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';  // ADD THIS
import { logoutUser } from '../features/user/userSlice';  // ADD THIS


function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userState.user);
// temp
const handleLogout = () => {
  dispatch(logoutUser());  // Use Redux action instead of setState
  navigate('/');
}
// const [user, setUser] = useState<{username:string} | null>({
//   username: 'demo user',
// });
//   const handleLogout =() =>{
//     setUser(null);
//     navigate('/');
//   }
  return (
    <header>
    <div className='aling-element flex justify-center sm:justify-end py-2'>
      {/*USER*/}
  {user? (
    <div className='flex gap-x-2 sm:gap:-x-8 items-center'>
    <p className='text-xs sm:text-sm'>Hello, {user.username}</p>
  <Button variant='link' size='sm' onClick={handleLogout}>
    Logout
  </Button>
    </div>
    ) : (
    <div className='flex gap-x-6 justify-center items-center -mr-4'>
    <Button asChild variant='link' size='sm'>
      <Link to='/login'>Sign in / Guest</Link>
      </Button>

      <Button asChild variant='link' size='sm'>
      <Link to='/register'>Register</Link>
      </Button>
      </div>
      )}
    </div>
  </header>
   
  )
}
export default Header;