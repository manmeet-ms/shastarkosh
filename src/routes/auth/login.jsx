import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { loginUserSrv } from "../../services/auth.service";
import { fetchUser } from "../../store/authSlice";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handleSubmit, reset, watch, register, formState } = useForm();
  const navigate = useNavigate({ from: "/auth/login" });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      console.log(formState.isSubmitSuccessful);

      navigate({ to: "/" });
      // do the your logic here
    }
  }, [formState]);

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log(data);

    const response = await loginUserSrv(data);
    console.log(response);
    dispatch(fetchUser());
    navigate({ to: "/" });
    //  TODO check email eist from frontned ot backend req
    //  TODO validation of unique username at first check
  };
  return (
    <>
      <form className="px-6 w-1/2 mx-auto flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Your email address</Label>
          <Input required {...register("email")} type="text" placeholder="Enter email" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Your email address</Label>
          <Input required autoComplete="true" {...register("password")} type="password" placeholder="Enter password" />
        </div>

        <Button type="submit">Login</Button>
      </form>
      <Link to="/auth/register">Register</Link>
    </>
  );
}
