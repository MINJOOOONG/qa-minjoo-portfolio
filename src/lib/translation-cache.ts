import { createHash } from 'crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const CACHE_DIR = join(process.cwd(), '.cache', 'translations')

// Ensure cache directory exists
function ensureCacheDir() {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true })
  }
}

// Generate a hash key for the cache
function getCacheKey(text: string, targetLang: string): string {
  const hash = createHash('md5').update(text).digest('hex').slice(0, 12)
  return `${hash}-${targetLang}`
}

// Get cached translation
export function getCachedTranslation(text: string, targetLang: string): string | null {
  try {
    ensureCacheDir()
    const key = getCacheKey(text, targetLang)
    const filePath = join(CACHE_DIR, `${key}.txt`)

    if (existsSync(filePath)) {
      return readFileSync(filePath, 'utf-8')
    }
  } catch (error) {
    console.error('Cache read error:', error)
  }
  return null
}

// Save translation to cache
export function setCachedTranslation(text: string, targetLang: string, translation: string): void {
  try {
    ensureCacheDir()
    const key = getCacheKey(text, targetLang)
    const filePath = join(CACHE_DIR, `${key}.txt`)
    writeFileSync(filePath, translation, 'utf-8')
  } catch (error) {
    console.error('Cache write error:', error)
  }
}

// In-memory cache for runtime (faster lookups)
const memoryCache = new Map<string, string>()

export function getMemoryCachedTranslation(text: string, targetLang: string): string | null {
  const key = getCacheKey(text, targetLang)
  return memoryCache.get(key) ?? null
}

export function setMemoryCachedTranslation(text: string, targetLang: string, translation: string): void {
  const key = getCacheKey(text, targetLang)
  memoryCache.set(key, translation)
}
