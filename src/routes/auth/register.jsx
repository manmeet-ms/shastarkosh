import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";


import { useForm } from "react-hook-form";

import { registerUserSrv } from "@/services/auth.service";
import { AppHeader } from "@/components/Header/AppHeader";
import { APP_NAME } from "../../../shared/app-variables.shared";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate  = useNavigate();
  const { handleSubmit, reset, watch, register } = useForm();
  const onSubmit = async (data) => {
    const response = await registerUserSrv(data);
    console.log(response);
    if (response.status === 200) {
      navigate("/auth/login");
    } 
    //  TODO check email eist from frontned ot backend req
    //  TODO validation of unique username at first check
  };
  return (
    <>
     <AppHeader/>
          <div className={cn("px-6 w-2/3 mx-auto flex flex-col gap-4")}>
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-2">
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                  <div className="grid gap-3">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome to {APP_NAME}</h1>
                      <p className="text-muted-foreground text-balance">Create your {APP_NAME} account</p>
                    </div>
                   <div className="grid gap-3" >
          <Label htmlFor="email">Name</Label>
          <Input required {...register("name")} type="text" placeholder="Enter name" />
        </div>

        <div className="grid gap-3" >
          <Label htmlFor="email">Username</Label>
          <Input required {...register("username")} type="text" placeholder="Enter username" />
        </div>

        <div className="grid gap-3" >
          <Label htmlFor="email">Email</Label>
          <Input required {...register("email")} type="text" placeholder="Enter email" />
        </div>

        <div className="grid gap-3" >
          <Label htmlFor="email">Password</Label>
          <Input required {...register("password")} type="password" placeholder="Enter password" />
        </div>
                  
        <Button type="submit">Register</Button>  
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link to="/auth/login"  className="underline underline-offset-4">
                        Login
                      </Link>
                    </div>
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
    
 
      <Link to="/auth/login" >
        <Button variant="ghost">Login</Button>
      </Link>
    </>
  );
}
