import { Language } from '../contexts/LanguageContext'

export const formatSession = (session: number, lang: Language): string => {
  const sessionFormats: Record<Language, string> = {
    ko: `제${session}회`,
    en: session === 1 ? '1st' : session === 2 ? '2nd' : session === 3 ? '3rd' : `${session}th`,
    ja: `第${session}回`,
  }
  return sessionFormats[lang]
}

export const formatDate = (year: number, month: number, day: number, lang: Language): string => {
  const months = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }

  const dateFormats: Record<Language, string> = {
    ko: `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`,
    en: `${months.en[month - 1]} ${day}, ${year}`,
    ja: `${year}年${month}月${day}日`,
  }

  return dateFormats[lang]
}

export const formatDateSimple = (year: number, month: number, day: number): { ko: string; en: string; ja: string } => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return {
    ko: `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`,
    en: `${months[month - 1]} ${day}, ${year}`,
    ja: `${year}年${month}月${day}日`,
  }
}
