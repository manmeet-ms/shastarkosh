import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { loginUserSrv } from "../../services/auth.service";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleSubmit, reset, watch, register,formState} = useForm();
  const navigate=useNavigate()
 
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      navigate("/")
    // do the your logic here
  }
    
  }, [formState])
  
  const onSubmit = async (data) => {
    console.log(data);
    
    const response = await loginUserSrv(data);
    console.log(response);
    //  TODO check email eist from frontned ot backend req
    //  TODO validation of unique username at first check
  };
  return (
<>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="email">Your email address</Label>
        <Input required   {...register("email")} type="text" placeholder="Enter email" />
      </div>

      <div>
        <Label htmlFor="email">Your email address</Label>
        <Input required autoComplete="true"  {...register("password")} type="password" placeholder="Enter password" />
      </div>

      <Button type="submit">Login</Button>
    </form>
        <Link to="/auth/register" >Register</Link>

    </>
  );
}
