import { useRef } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Button } from '../components/ui/button'
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { Input } from '../components/ui/input';
import {login} from '../http/api';
import { toast } from "sonner"
import { useMutation } from '@tanstack/react-query';


function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const mutation = useMutation({
      mutationFn: login,
      onSuccess: (resp: any) => {
        console.log("------------",resp)
        toast("Login", {
          description: "User logged in successfully",
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          },
        })
        navigate("/home");
      },
      onError: (error: any) => {
        toast("Login",{
          description: error.message,
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          },
        })
      }
    })
    
    const handleLoginSubmit = async () => {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
  
      if (!email || !password) {
        return toast("Login", {
          description: "Email and password are required",
          action: {
            label: "X",
            onClick: () => console.log("Undo"),
          },
        });
      }

      mutation.mutate({ email, password });
      console.log(email)

      console.log(mutation)

    };

  return (
    <div className='flex items-center justify-center min-h-screen'>
        <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLoginSubmit} className="w-full" disabled={mutation.isLoading} >
            {mutation.isLoading && <LoaderCircle className="animate-spin size-10" /> }
            <span className="">Login</span>
          </Button>
        </CardFooter>
        <div className="my-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={"/signup"} className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Login