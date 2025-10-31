import { createFileRoute, Outlet } from '@tanstack/react-router'
import App from '../../App'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  return <App><Outlet/></App>
}
