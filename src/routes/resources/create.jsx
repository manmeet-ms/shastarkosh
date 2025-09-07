import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resources/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/resources/create"!</div>
}
