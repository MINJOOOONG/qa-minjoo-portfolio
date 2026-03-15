import { Language } from '../contexts/LanguageContext'

export const formatSession = (session: number, lang: Language): string => {
  const sessionFormats: Record<Language, string> = {
    ko: `제${session}회`,
    en: session === 1 ? '1st' : session === 2 ? '2nd' : session === 3 ? '3rd' : `${session}th`,
    ja: `第${session}回`,
    zh: `第${session}届`,
    fr: session === 1 ? '1re' : `${session}e`,
  }
  return sessionFormats[lang]
}

export const formatDate = (year: number, month: number, day: number, lang: Language): string => {
  const months = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  }

  const dateFormats: Record<Language, string> = {
    ko: `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`,
    en: `${months.en[month - 1]} ${day}, ${year}`,
    ja: `${year}年${month}月${day}日`,
    zh: `${year}年${month}月${day}日`,
    fr: `${day} ${months.fr[month - 1]} ${year}`,
  }

  return dateFormats[lang]
}

export const formatDateSimple = (year: number, month: number, day: number): { ko: string; en: string; ja: string; zh: string; fr: string } => {
  const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthsFr = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
  return {
    ko: `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`,
    en: `${monthsEn[month - 1]} ${day}, ${year}`,
    ja: `${year}年${month}月${day}日`,
    zh: `${year}年${month}月${day}日`,
    fr: `${day} ${monthsFr[month - 1]} ${year}`,
  }
}
