// components/UserInfo.tsx
import { UserInfoProps } from '../utils/types';

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div>
      <h2>{user.username}</h2>
      {/* You can also display other user properties here */}
    </div>
  );
};

export default UserInfo;