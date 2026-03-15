'use server'

import { sql } from './db'

export async function getContent(sectionKey: string): Promise<string | null> {
  const rows = await sql`
    SELECT content FROM portfolio_content WHERE section_key = ${sectionKey}
  `
  return rows[0]?.content ?? null
}

export async function getContents(keys: string[]): Promise<Record<string, string>> {
  const rows = await sql`
    SELECT section_key, content FROM portfolio_content WHERE section_key = ANY(${keys})
  `
  const result: Record<string, string> = {}
  for (const row of rows) {
    result[row.section_key] = row.content
  }
  return result
}
