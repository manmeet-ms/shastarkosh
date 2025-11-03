import Markdown from 'react-markdown'
import { createFileRoute } from '@tanstack/react-router'
import LandingHeader from '../components/Header/LandingHeader'
import LandingFooter from '../components/Footer/LandingFooter'

export const Route = createFileRoute('/roadmap')({
  component: RouteComponent,
})

function RouteComponent({
  title = "Shastarkosh Roadmap",
  experience = [
    {
      title: "Phase 1: Foundation & Core Features",
      details: "Platform Development • Digital Library",
      period: "Q1 2025 - Q2 2025",
      company: "Completed",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/claude-icon.svg",
      description:
        "Established the core digital library infrastructure with comprehensive resource management. Implemented user authentication, resource upload system, and basic search functionality. Created initial collections of Vedic texts and ancient weapon documentation with detailed metadata.",
    },
    {
      title: "Phase 2: Community & Collaboration",
      details: "Social Features • User Engagement",
      period: "Q3 2025 - Q4 2025",
      company: "In Progress",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/vercel-icon.svg",
      description:
        "Building community features including discussion forums, user profiles, and contribution tracking. Implementing collaborative annotation tools for scholars to add notes and insights. Developing reputation system and expert verification badges for quality content.",
    },
    {
      title: "Phase 3: Advanced Research Tools",
      details: "AI-Powered Analysis • Cross-References",
      period: "Q1 2026 - Q2 2026",
      company: "Planned",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
      description:
        "Integrating AI-powered Sanskrit translation and transliteration tools. Developing advanced cross-referencing system to connect related texts, artifacts, and historical contexts. Creating interactive timelines and geographical maps for historical visualization.",
    },
    {
      title: "Phase 4: Global Expansion & Partnerships",
      details: "Institutional Collaboration • Content Expansion",
      period: "Q3 2026 onwards",
      company: "Future",
      logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/figma-icon.svg",
      description:
        "Partnering with museums, universities, and cultural institutions worldwide to expand the collection. Implementing multilingual support for broader accessibility. Developing educational programs and certification courses for students and researchers.",
    },
  ],
}) {
  return <div>
      <LandingHeader/>
    
        <section className="py-16">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12  text-4xl font-medium leading-tight md:text-7xl">
            {title}
          </h2>

          <div className="space-y-8">
            {experience.map(
              ({ title, details, period, company, logo, description }, idx) => (
                <div
                  key={idx}
                  className="border-border border-b pb-6 last:border-b-0"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    <div className="md:w-2/3">
                      <div className="mb-2 flex items-center gap-3">
                        <img
                          src={logo}
                          alt={`${company} logo`}
                          className="h-5 object-contain"
                        />
                        <h3 className="text-xl">{title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-3 text-sm">
                        {details}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                      </p>
                    </div>
                    <div className="text-right md:w-1/3 md:text-right">
                      <p className="mb-1 text-sm font-medium">{period}</p>
                      <p className="text-muted-foreground text-sm">{company}</p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
<LandingFooter/>
        
  </div>
}
