import { useAppSelector } from '../hooks/hooks';
import { Navigate } from 'react-router-dom';
import { UserInfo, OrderHistory } from '../components';
import { User } from '../utils/types'

const UserProfilePage = () => {
  const { user } = useAppSelector(state => state.userState);

  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <UserInfo user={user as User} />
      <OrderHistory />
    </div>
  );
};

export default UserProfilePage;