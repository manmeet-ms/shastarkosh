import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/discussions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/discussions/"!</div>
}
