import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

function Login() {
  return (
    <div>
        <header>
            <SignedOut>
            <SignInButton />
            </SignedOut>
            <SignedIn>
            <UserButton />
            </SignedIn>
        </header>
    </div>
  )
}

export default Login