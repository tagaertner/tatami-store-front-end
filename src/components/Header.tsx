import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { logoutUser } from '../features/user/userSlice';
import { clearCart } from '../features/cart/cartSlice';
// import { useToast } from './ui/use-toast';


function Header() {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { toast } = useToast();


  const user = useAppSelector((state) => state.userState.user);
  console.log("USER:", user);
  console.log("COOKIE:", document.cookie);
  
  

  const handleLogout = () => {
    // Clear user session in Redux
    dispatch(clearCart());
    dispatch(logoutUser());
  
    // Clear Cookies
    document.cookie = "user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
    // AWS Cognito Logout URL
    const cognitoLogoutUrl = import.meta.env.VITE_TATAMI_BE + '/auth/logout';
  
    // Redirect User to Cognito Logout
    window.location.href = cognitoLogoutUrl;
  };


  return (
    <header>
      <div className='align-element flex justify-center sm:justify-end py-2'>
        {/* USER */}
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <Link to={'/profile'} className='text-xs sm:text-sm'>Hello, {user.given_name}</Link>
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




// const [user, setUser] = useState<{username:string} | null>({
//   username: 'demo user',
// });
//   const handleLogout =() =>{
//     setUser(null);
//     navigate('/');
//   }
//   return (
//     <header>
//     <div className='aling-element flex justify-center sm:justify-end py-2'>
//       {/*USER*/}
//   {user? (
//     <div className='flex gap-x-2 sm:gap:-x-8 items-center'>
//     <p className='text-xs sm:text-sm'>Hello, {user.username}</p>
//   <Button variant='link' size='sm' onClick={handleLogout}>
//     Logout
//   </Button>
//     </div>
//     ) : (
//     <div className='flex gap-x-6 justify-center items-center -mr-4'>
//     <Button asChild variant='link' size='sm'>
//       <Link to='/login'>Sign in / Guest</Link>
//       </Button>

//       <Button asChild variant='link' size='sm'>
//       <Link to='/register'>Register</Link>
//       </Button>
//       </div>
//       )}
//     </div>
//   </header>
   
//   )
// }
export default Header;