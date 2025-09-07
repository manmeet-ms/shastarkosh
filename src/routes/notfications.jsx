import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notfications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/notfications"!</div>
}
