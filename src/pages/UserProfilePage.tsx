// pages/UserProfilePage.tsx
import { useAppSelector } from '../hooks/hooks';
import { Navigate } from 'react-router-dom';
import { UserInfo, OrderHistory } from '../components';

const UserProfilePage = () => {
  const { user } = useAppSelector(state => state.userState);

  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <div className="container m-auto p-6 space-y-6">
      <UserInfo user={user} />
      <OrderHistory />
    </div>
  );
};

export default UserProfilePage;