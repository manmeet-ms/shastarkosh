import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/discord/discord')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/discord"!</div>
}
