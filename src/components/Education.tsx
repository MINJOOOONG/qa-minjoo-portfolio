'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { educationDict } from '../dictionaries/education'
import { getDictValue } from '../hooks/useDictionary'

export default function Education() {
  const { lang } = useLanguage()
  const d = (key: keyof typeof educationDict) => getDictValue(educationDict[key], lang)

  return (
    <table>
      <thead>
        <tr>
          <td>{d('학력_이름')}</td>
          <td>{d('세부')}</td>
          <td>{d('기간')}</td>
          <td>{d('비고')}</td>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="font-semibold">
            <a href="https://www.hufs.ac.kr" target="_blank" rel="noreferrer">
              {d('한국외국어대학교')}
            </a>
          </td>

          <td>
            {d('학력_학위')}
            <div className="text-xs text-gray-500">{d('학력_비고')}</div>
          </td>

          <td className="text-center">{d('학력_기간')}</td>
          <td className="text-center">{d('비고_내용')}</td>
        </tr>
      </tbody>
    </table>
  )
}
