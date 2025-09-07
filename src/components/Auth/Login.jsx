import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import LandingHeader from "../Header/LandingHeader"
import { Link } from "@tanstack/react-router"

const Login = () => {
  return (
    <>
      <LandingHeader/>
    <main className="container  flex justify-center items-center" >
    <div className={cn("w-1/2 flex py-24 flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
                   <Button variant="outline" ><Link  
                            target="_blank"
                            to={import.meta.env.VITE_BACKEND_URL+"/auth/discord/login"}>
                            Login with Discord       </Link></Button>
                   
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="underline underline-offset-4">
                Register 
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div></main>
    
    </>
  )
}

export default Login