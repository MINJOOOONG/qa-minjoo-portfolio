export type Lang = 'ko' | 'en' | 'ja' | 'zh'

export const formatSession = (session: number, lang: Lang): string => {
  const sessionFormats: Record<Lang, string> = {
    ko: `제${session}회`,
    en: session === 1 ? '1st' : session === 2 ? '2nd' : session === 3 ? '3rd' : `${session}th`,
    ja: `第${session}回`,
    zh: `第${session}届`,
  }
  return sessionFormats[lang]
}

export const formatDate = (
  year: number,
  month: number,
  day: number,
  lang: Lang,
): string => {
  const months = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }

  const dateFormats: Record<Lang, string> = {
    ko: `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`,
    en: `${months.en[month - 1]} ${day}, ${year}`,
    ja: `${year}年${month}月${day}日`,
    zh: `${year}年${month}月${day}日`,
  }

  return dateFormats[lang]
}
