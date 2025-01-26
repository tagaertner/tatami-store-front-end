// pages/UserProfilePage.tsx
import { useAppSelector } from '../hooks/hooks';
import { Navigate } from 'react-router-dom';
import { Setting, UserInfo, OrderHistory } from '../components';

const UserProfilePage = () => {
  const { user } = useAppSelector(state => state.userState);

  if (!user) {
    return <Navigate to='/login' />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <UserInfo user={user} />
      <OrderHistory />
      <Setting />
    </div>
  );
};

export default UserProfilePage;