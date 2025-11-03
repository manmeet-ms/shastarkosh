import { Button } from "@/components/ui/button";

import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import LandingHeader from "../components/Header/LandingHeader";
import LandingFooter from "../components/Footer/LandingFooter";

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})
const defaultCompanies = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

const defaultAchievements = [
  { label: "Ancient Texts", value: "500+" },
  { label: "Weapon Artifacts", value: "1200+" },
  { label: "Active Scholars", value: "2500+" },
  { label: "Research Papers", value: "150+" },
];

function RouteComponent({
  title = "About Shastarkosh",
  description = "Shastarkosh is a comprehensive digital library dedicated to preserving and sharing ancient Indian scriptures, weapons, and historical artifacts. We bridge the gap between ancient wisdom and modern technology.",
  mainImage = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Ancient Indian manuscripts",
  },
  secondaryImage = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    alt: "Historical artifacts",
  },
  breakout = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "Shastarkosh logo",
    title: "Preserving Ancient Wisdom for Future Generations",
    description:
      "Our mission is to digitize, preserve, and make accessible the rich heritage of ancient Indian knowledge, from Vedic texts to historical weaponry.",
    buttonText: "Explore Collection",
    buttonUrl: "/app/resources",
  },
  companiesTitle = "Trusted by Institutions Worldwide",
  companies = defaultCompanies,
  achievementsTitle = "Our Impact in Numbers",
  achievementsDescription = "Building the world's most comprehensive digital archive of ancient Indian knowledge and artifacts.",
  achievements = defaultAchievements,
}) {
  return (<>
 <LandingHeader/> 
  <section className="py-16 px-6">
      <div className="container">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="bg-muted flex flex-col justify-between gap-6 rounded-xl p-7 md:w-1/2 lg:w-auto">
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-12 dark:invert"
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl} target="_blank">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>
        <div className="py-32">
          <p className="text-center">{companiesTitle} </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {companies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8 dark:invert"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-muted relative overflow-hidden rounded-xl p-7 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-semibold md:text-4xl">
              {achievementsTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-2" key={item.label + idx}>
                <span className="text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
                <p className="text-sm md:text-base">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    
   <section className="py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-5">
          <img src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg" alt="logo" className="size-10" />
          <h2 className="text-center text-3xl font-semibold">
            Join our community
            <br />
            <span className="text-muted-foreground/80">
              of designers & developers
            </span>
          </h2>
          <div className="flex items-center gap-4">
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://x.com/shadcnblocks"
                target="_blank"
                className="size-10"
              >
                <IconBrandDiscord />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/shadcnblocks"
                target="_blank"
                className="size-10"
              >
                <IconBrandGithub />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://shadcnblocks.com"
                target="_blank"
                className="size-10"
              >
                <IconBrandDiscord />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
<LandingFooter/>
    
    </>)
}
