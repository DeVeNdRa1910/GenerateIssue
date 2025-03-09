import React, {useRef} from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

function Signup() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex items-center justify-center min-h-screen'>
        <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your persnal details.
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
          Already have an account?{" "}
          <Link to={"/signup"} className="underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Signup