import { Card, CardHeader } from "../ui/card";
import { User } from 'lucide-react';
// import { Button } from "../ui/button";
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
    <Card className="w-full max-w-7xl mx-auto">
      {/* User Info Section */}
      <CardHeader className="flex flex-col items-center w-full px-16 space-y-6">
        <div className="flex items-center space-x-8">
          <User className="h-8 w-8" />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-500 text-center">{user.email}</p>
            <p className="text-gray-500 text-center">{user.phone}</p>
          </div>
        </div>
      </CardHeader>

      {/* Order History Section - Aligned Below */}
      {/* <div className="w-full flex flex-col items-center py-6 border-t">
        <h2 className="text-lg font-semibold">Order History</h2>
        <Button className="px-4 py-2 rounded-md">
          View Orders
        </Button>
      </div> */}
    </Card>
  );
};

// const UserInfo = ({ user }: UserProps) => {
//   return (
//     <div className="w-full flex flex-col items-center space-y-6">
//       {/* User Info Card */}
//       <Card className="w-full max-w-7xl mx-auto">
//         <CardHeader className="flex flex-row items-center justify-center">
//           <div className="flex items-center justify-center w-full px-16">
//             <div className="flex items-center space-x-8">
//               <User className="h-8 w-8" />
//               <div className="flex flex-col items-center">
//                 <h2 className="text-2xl font-bold text-center">
//                   {user.first_name} {user.last_name}
//                 </h2>
//                 <p className="text-gray-500 text-center">{user.email}</p>
//                 <p className="text-gray-500 text-center">{user.phone}</p>
//               </div>
//             </div>
//           </div>
//         </CardHeader>
//       </Card>
//     </div>
//   );
// };

export default UserInfo;