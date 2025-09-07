import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/discussions/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/discussions/create"!</div>
}
