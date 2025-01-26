// components/profile/Settings.tsx

import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Settings as SettingsIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Setting = () => {
  return (
    <Card>
      <CardHeader className="flex items-center space-x-4">
        <SettingsIcon className="h-6 w-6" />
        <h3 className="text-xl font-semibold">Settings</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full justify-start" variant="outline">
              Change Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>
            {/* Password form */}
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full justify-start" variant="outline">
              Update Shipping Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Shipping Address</DialogTitle>
            </DialogHeader>
            {/* Address form */}
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full justify-start" variant="outline">
              Manage Payment Methods
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Payment Methods</DialogTitle>
            </DialogHeader>
            {/* Payment form */}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Setting;