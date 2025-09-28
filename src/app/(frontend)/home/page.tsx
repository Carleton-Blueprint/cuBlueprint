import AboutUsBlock from './_components/AboutUsBlock'
import HeroBlock from './_components/HeroBlock'
import OurValuesBlock from './_components/OurValuesBlock'
import ProjectsBlock from './_components/ProjectsBlock'
import EventsBlock from './_components/EventsBlock'
import SponsorsBlock from './_components/SponsorsBlock'
import accessPayload from '@/hooks/usePayload'

export default async function Home() {
  const { payload } = await accessPayload()

  const resGlobal = await payload.findGlobal({
    slug: 'homePage',
    depth: 3,
  })

  const heroBlockData = {
    title: resGlobal.heroBlock.title,
    subtitle: resGlobal.heroBlock.subtitle,
    image: resGlobal.heroBlock.heroImage,
    buttonText: resGlobal.heroBlock.buttonText,
    buttonLink: resGlobal.heroBlock.buttonLink,
  }

  const aboutUsBlockData = {
    visibility: resGlobal.aboutUsBlock.visibility,
    title: resGlobal.aboutUsBlock.title,
    text: resGlobal.aboutUsBlock.text,
    image: resGlobal.aboutUsBlock.image,
    linkText: resGlobal.aboutUsBlock.linkText,
    linkUrl: resGlobal.aboutUsBlock.linkUrl,
    roundedCorners: resGlobal.aboutUsBlock.roundedCorners,
  }

  const projectsBlockData = {
    visibility: resGlobal.projectsBlock.visibility,
    title: resGlobal.projectsBlock.projectsTitle,
    image: resGlobal.projectsBlock.projectsBlueprinter,
    data: resGlobal.projectsBlock.featuredProjects,
    roundedCorners: resGlobal.projectsBlock.roundedCorners,
  }

  const eventsBlockData = {
    visibility: resGlobal.eventsBlock.visibility,
    title: resGlobal.eventsBlock.newsAndEventsTitle,
    image: resGlobal.eventsBlock.eventsBlueprinter,
    data: resGlobal.eventsBlock.newsAndEvents,
    roundedCorners: resGlobal.eventsBlock.roundedCorners,
  }

  const sponsorsBlockData = {
    visibility: resGlobal.sponsorsBlock.visibility,
    title: resGlobal.sponsorsBlock.sponsorsTitle,
    data: resGlobal.sponsorsBlock.sponsors,
    image: resGlobal.sponsorsBlock.blueprinter,
    roundedCorners: resGlobal.sponsorsBlock.roundedCorners,
  }

  const ourValuesBlockData = {
    values: resGlobal.ourValuesBlock.values,
    visibility: resGlobal.ourValuesBlock.visibility,
    title: resGlobal.ourValuesBlock.valuesTitle,
    roundedCorners: resGlobal.ourValuesBlock.roundedCorners,
  }

  return (
    <div className="overflow-x-hidden">
      <HeroBlock {...heroBlockData} />
      <div className="flex flex-col">
        <AboutUsBlock {...aboutUsBlockData} />
        <ProjectsBlock {...projectsBlockData} />
        <EventsBlock {...eventsBlockData} />
        <SponsorsBlock {...sponsorsBlockData} />
        <OurValuesBlock {...ourValuesBlockData} />
      </div>
    </div>
  )
}
