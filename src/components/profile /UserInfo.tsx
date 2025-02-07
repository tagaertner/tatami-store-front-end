// components/profile/UserInfo.tsx

import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { User } from 'lucide-react';

interface UserProps {
  user: {
    given_name: string;
    family_name: string;
    phone_number: string;
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
            <h2 className="text-2xl font-bold">{user.given_name} {user.family_name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.phone_number}</p>
          </div>
        </div>
        <Button>Edit Profile</Button>
      </CardHeader>
    </Card>
  );
};

export default UserInfo;