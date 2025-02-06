
import { type ReduxStore} from '../store';
import { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';
import { customFetch } from '../utils';
import {
  redirect,
  type ActionFunction,
  type LoaderFunctionArgs,
  // NavigateFunction 
} from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
import { loginUser } from '../features/user/userSlice';



export const action = 
  (store: ReduxStore): ActionFunction =>
  async ({ request }: LoaderFunctionArgs): Promise<Response | null> => {
    const formData = await request.formData();
    const data = {
      identifier: formData.get('identifier'),
      password: formData.get('password')
    };

    try {
      const response: AxiosResponse = await customFetch.post(
       '/api/auth/local',
        data
      );
      const username = response.data.user.username;
      const email = response.data.user.email;
      const jwt = response.data.jwt;
      store.dispatch(loginUser({ username, email, jwt }));
      return redirect('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Error details:', error.response?.data);
      }
      toast({ description: 'Login Failed' });
      return null;
    }
  };

  // export const loginAsGuestUser = (
  //   dispatch: AppDispatch,
  //   navigate: NavigateFunction
  // ) => {
  //   return async (): Promise<void> => {
  //     try {
  //       // console.log('Making request to:', `${productionUrl}/auth/local`);
  //       console.log('Environment variable value:', import.meta.env.VITE_TATAMI_BE);
  //       const response: AxiosResponse = await customFetch.post('/api/auth/local', {
  //         identifier: 'test@test.com',
  //         password: 'secret',
  //       });
  //       const username = response.data.user.username;
  //       const email = response.data.user.email;
  //       const jwt = response.data.jwt;
  //       dispatch(loginUser({ username, email, jwt }));
  //       navigate('/');
  //     } catch (error) {
  //       if (error instanceof AxiosError) {
  //         console.log('Error details:', error.response?.data);
  //       }
  //       toast({ description: 'Login Failed' });
  //     }
  //   };
  // };