import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resources/r/$rId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/resources/r/$rid"!</div>
}
