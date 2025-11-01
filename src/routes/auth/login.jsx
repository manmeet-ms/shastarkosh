import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginUserSrv } from "@/services/auth.service";
import { AppHeader } from "../../components/Header/AppHeader";
import { fetchUser } from "../../store/authSlice";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const loginSchema = z.object({
    email: z.string().email("Valid email required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });
  const navigate = useNavigate({ from: "/auth/login" });
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate({ to: "/app" });
    }
  }, [user, navigate]);

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const response = await loginUserSrv(data);
    dispatch(fetchUser());
    navigate({ to: "/app" });
  };
  return (
    <>
      <AppHeader/>
      <div className={cn("w-full px-6   md:w-2/3 mx-auto flex flex-col gap-4")}> 
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">Login to your Shastarkosh account</p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
                  {formState.errors.email && (
                    <span className="text-red-500 text-sm">{formState.errors.email.message}</span>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" autoComplete="true" {...register("password")} />
                  {formState.errors.password && (
                    <span className="text-red-500 text-sm">{formState.errors.password.message}</span>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/auth/register"  className="underline underline-offset-4">
                    Register
                  </Link>
                </div>
              </div>
              <div className="text-center text-sm">
              
              </div>
            </form>
            <div className="bg-muted relative hidden md:block">
              <img src="/logo/solid/logo-dark.png" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4]" />
            </div>
          </CardContent>
        </Card>
        {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
      </div>
         <img src="/assets/footer-dark.png" className=" px-12 opacity-4 hidden md:block  " alt="" />

    </>
  );
}
