import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/philosophy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/philosophy"!</div>
}
