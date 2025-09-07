import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/discussions/d/$did')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/discussions/d/$did"!</div>
}
