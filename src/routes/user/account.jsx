import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/user/account')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    
    <Link to="/auth/login" >Login </Link>
    <Link to="/auth/register" >Register</Link>
    </>
  )
}
