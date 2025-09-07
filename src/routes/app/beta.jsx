import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/app/beta')({
  component: RouteComponent,
})

function RouteComponent() {
    const dispatch = useDispatch();
    const {user}=useSelector((state)=>state.auth)
  
  
  return (
  
  <Link target='_blank' to='http://localhost:3000/api/auth/discord/login'><Button>Login with Discord</Button></Link>
  
  )
}
