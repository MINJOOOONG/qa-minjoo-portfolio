import { getContents } from '../lib/content'
import HomeClient from './HomeClient'

export const dynamic = 'force-dynamic'

const SECTION_KEYS = ['한줄소개', 'work_experience', 'portfolio_section']

export default async function HomePage() {
  const contents = await getContents(SECTION_KEYS)

  return <HomeClient contents={contents} />
}
