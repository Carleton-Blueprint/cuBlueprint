// import { RenderBlocks } from '@/blocks/RenderBlocks'
// import { queryPageBySlug } from './[slug]/page'
// import { Page } from '@/payload-types'
// import { RenderHero } from '@/heros/RenderHero'
import Home from './home/page'

// export async function generateStaticParams() {
//   const homePage = await queryPageBySlug({ slug: 'home' })

//   return { props: { page: homePage } }
// }

export default async function App() {
  // const homePage = await queryPageBySlug({ slug: 'home' })

  // if (!homePage) {
  //   return <div>Page not found</div>
  // }

  return (
    // <article className="overflow-x-hidden pb-24">
    //   {/* <RenderHero {...homePage.hero} />
    //   <RenderBlocks blocks={homePage.layout} /> */}
    // </article>
    <Home />
  )
}
