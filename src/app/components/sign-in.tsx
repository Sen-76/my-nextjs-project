import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LinkText from '@/components/ui/link-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import service from '@/common/services/apis';

const SignIn = () => {
  const formSchema = z.object({
    email: z
      .string({
        message: 'This field is required.',
      })
      .min(2, {
        message: 'email must be at least 6 characters.',
      })
      .max(60, {
        message: 'email must be at most 60 characters.',
      }),
    password: z
      .string({
        message: 'This field is required.',
      })
      .min(6, {
        message: 'Password must be at least 6 characters.',
      })
      .max(60, {
        message: 'Password must be at most 60 characters.',
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: Auth.SigninModel) => {
    try {
      console.log(data);
      await service.authService.Signin(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <div className="font-bold text-black text-[18px] w-full text-center mb-4">Sign In</div>
      <div className="flex gap-5 mb-4">
        <FontAwesomeIcon className="w-8 !h-8 cursor-pointer hover:opacity-60 text-blue-600" icon={faFacebook} />
        <FontAwesomeIcon className="w-8 !h-8 cursor-pointer hover:opacity-60 " icon={faGoogle} />
      </div>
      <div className="flex flex-col w-80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center !text-[14px] text-gray-600">
              <FormField
                control={form.control}
                name="remember-me"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox id="remeber-me" checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <label className="cursor-pointer !mt-0" htmlFor="remeber-me">
                      Remember me
                    </label>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LinkText>Forgot your password?</LinkText>
            </div>
            <div className="w-full flex items-center justify-center">
              <Button className="w-40 rounded-2xl mt-3" type="submit">
                SIGN IN
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
