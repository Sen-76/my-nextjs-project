import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CustomButton } from '@/components/ui/custom-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignIn from './sign-in';
import SignUp from './sign-up';

export default function AuthenModal() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <CustomButton>
            <FontAwesomeIcon icon={faUser} />
          </CustomButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Tabs defaultValue="sign-in">
              <DialogTitle>
                <TabsList>
                  <TabsTrigger value="sign-in">Sign in</TabsTrigger>
                  <TabsTrigger value="sign-up">Sign up</TabsTrigger>
                </TabsList>
              </DialogTitle>
              <DialogDescription></DialogDescription>
              <TabsContent value="sign-in">
                <SignIn />
              </TabsContent>
              <TabsContent value="sign-up">
                <SignUp />
              </TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
