import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Link to="/auth/login">
        <Button variant="ghost">Login</Button>
      </Link>
      <Link to="/auth/register">
        <Button variant="ghost">Register</Button>
      </Link>
    </>
  );
}
