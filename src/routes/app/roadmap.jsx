import Markdown from 'react-markdown'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/roadmap')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    
        <Markdown>
- real data aggregation
- likes comments will require an account
- more smooth login prompt as a modal
- image handling for shastars, resource material, posts
- definitive smooth loading states
- importved navigation and animation flow betwwee
- pdf support for resource materials 
- large files handling 
- real time ui updates in like comments and
- reputation system awared from interaxtion (l,c,s)
- amanedsments and moderation update
- ai context for easy and natural deep queries
- intelligent caching
- more login options, google discord etc
- optimisin system stability and prefoamcne by mimising api calls
- pagination wherever required
        </Markdown>
        
  </div>
}
