import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/resources')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet/>
}
