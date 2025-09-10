import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { registerUserSrv } from "../../services/auth.service";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleSubmit, reset, watch, register } = useForm();
  const onSubmit = async (data) => {
    const response = await registerUserSrv(data);
    console.log(response);
    //  TODO check email eist from frontned ot backend req
    //  TODO validation of unique username at first check
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="email">Your email address</Label>
          <Input required {...register("name")} type="text" placeholder="Enter name" />
        </div>

        <div>
          <Label htmlFor="email">Your email address</Label>
          <Input required {...register("username")} type="text" placeholder="Enter username" />
        </div>

        <div>
          <Label htmlFor="email">Your email address</Label>
          <Input required {...register("email")} type="text" placeholder="Enter email" />
        </div>

        <div>
          <Label htmlFor="email">Your email address</Label>
          <Input required {...register("password")} type="password" placeholder="Enter password" />
        </div>

        <Button type="submit">Register</Button>
      </form>{" "}
      <Link to="/auth/login">
        <Button variant="ghost">Login</Button>
      </Link>
    </>
  );
}
