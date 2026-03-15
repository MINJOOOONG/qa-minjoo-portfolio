'use server'

import { checkAuth } from './auth'
import { sql } from '../../lib/db'

export async function updateContent(
  sectionKey: string,
  content: string,
): Promise<{ success: boolean; error?: string }> {
  const authed = await checkAuth()
  if (!authed) {
    return { success: false, error: '인증이 필요합니다.' }
  }

  await sql`
    UPDATE portfolio_content
    SET content = ${content}, updated_at = now()
    WHERE section_key = ${sectionKey}
  `

  return { success: true }
}

export async function saveAllContents(
  entries: { key: string; content: string }[],
): Promise<{ success: boolean; error?: string }> {
  const authed = await checkAuth()
  if (!authed) {
    return { success: false, error: '인증이 필요합니다.' }
  }

  for (const entry of entries) {
    await sql`
      INSERT INTO portfolio_content (section_key, content, updated_at)
      VALUES (${entry.key}, ${entry.content}, now())
      ON CONFLICT (section_key)
      DO UPDATE SET content = ${entry.content}, updated_at = now()
    `
  }

  return { success: true }
}
