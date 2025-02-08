// components/profile/UserInfo.tsx

import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { User } from 'lucide-react';

interface UserProps {
  user: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
  }
}

const UserInfo = ({ user }:UserProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4 pe-5">
          <User className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.phone}</p>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </CardHeader>
    </Card>
  );
};

export default UserInfo;