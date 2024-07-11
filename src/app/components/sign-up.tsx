import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const SignUp = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full flex-col">
        <div className="font-bold text-black text-[18px] w-full text-center mb-4">Sign Up</div>
        <div className="flex gap-5 mb-4">
          <FontAwesomeIcon className="w-8 !h-8 cursor-pointer hover:opacity-60 text-blue-600" icon={faFacebook} />
          <FontAwesomeIcon className="w-8 !h-8 cursor-pointer hover:opacity-60 " icon={faGoogle} />
        </div>
        <div className="flex flex-col gap-4 w-80">
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Input placeholder="Password Again" />
          <div className="w-full flex items-center justify-center">
            <Button className="w-40 rounded-2xl mt-3" type="submit">
              SIGN UP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
