import AboutUsBlock from './_components/AboutUsBlock'
import HeroBlock from './_components/HeroBlock'
import OurValuesBlock from './_components/OurValuesBlock'
import ProjectsBlock from './_components/ProjectsBlock'
import EventsBlock from './_components/EventsBlock'
import SponsorsBlock from './_components/SponsorsBlock'
import Image from 'next/image'
import blueprinter from './_assets/mission.svg'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroBlock />
      <div className="flex flex-col">
        <AboutUsBlock />
        <div className="relative">
          <Image
            className="md:hidden absolute w-40 bottom-8 right-1/12 justify-self-center"
            src={blueprinter}
            alt="Blueprinter characters"
            width={300}
          />
        </div>
        <ProjectsBlock />
        <EventsBlock />
        <SponsorsBlock />
        <OurValuesBlock />
      </div>
    </div>
  )
}
