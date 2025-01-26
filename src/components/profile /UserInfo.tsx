// components/profile/UserInfo.tsx

import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { User } from 'lucide-react';

interface UserProps {
  user: {
    username: string;
    email: string;
  }
}

const UserInfo = ({ user }:UserProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <User className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </CardHeader>
    </Card>
  );
};

export default UserInfo;