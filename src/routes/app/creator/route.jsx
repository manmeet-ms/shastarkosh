import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/creator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet/>
}
