'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { certificatesDict } from '../dictionaries/certificates'
import { formatDate, formatSession } from '../dictionaries/utils'
import { getDictValue } from '../hooks/useDictionary'

export default function OtherCertificates() {
  const { lang } = useLanguage()
  const d = (key: keyof typeof certificatesDict) => getDictValue(certificatesDict[key], lang)

  return (
    <details className="mt-4">
      <summary className="w-fit mx-auto text-slate-500 text-sm cursor-pointer hover:text-slate-700 transition">
        {d('기타자격증보기')}
      </summary>
      <table className="mt-2">
        <thead>
          <tr>
            <td>{d('이름')}</td>
            <td>{d('내용')}</td>
            <td>{d('주관')}</td>
            <td>{d('일시')}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TOPCIT {formatSession(14, lang)}</td>
            <td className="text-center">523{d('점')}</td>
            <td className="text-center">{d('과학기술정보통신부')}</td>
            <td className="text-center">{formatDate(2020, 10, 31, lang)}</td>
          </tr>
          <tr>
            <td>TOPCIT {formatSession(13, lang)}</td>
            <td className="text-center">609{d('점')}</td>
            <td className="text-center">{d('과학기술정보통신부')}</td>
            <td className="text-center">{formatDate(2020, 6, 20, lang)}</td>
          </tr>
          <tr>
            <td>TOPCIT {formatSession(12, lang)}</td>
            <td className="text-center">488{d('점')}</td>
            <td className="text-center">{d('과학기술정보통신부')}</td>
            <td className="text-center">{formatDate(2019, 10, 19, lang)}</td>
          </tr>
          <tr>
            <td>TOPCIT {formatSession(11, lang)}</td>
            <td className="text-center">383{d('점')}</td>
            <td className="text-center">{d('과학기술정보통신부')}</td>
            <td className="text-center">{formatDate(2019, 5, 18, lang)}</td>
          </tr>
          <tr>
            <td>TOPCIT {formatSession(10, lang)}</td>
            <td className="text-center">343{d('점')}</td>
            <td className="text-center">{d('과학기술정보통신부')}</td>
            <td className="text-center">{formatDate(2018, 10, 20, lang)}</td>
          </tr>
          <tr>
            <td>TOPCIT {formatSession(9, lang)}</td>
            <td className="text-center">397{d('점')}</td>
            <td className="text-center">{d('과학기술정보통신부')}</td>
            <td className="text-center">{formatDate(2018, 5, 19, lang)}</td>
          </tr>
          <tr>
            <td>{d('태권도')}</td>
            <td className="text-center">1{d('단')}</td>
            <td className="text-center">{d('국기원')}</td>
            <td className="text-center">{formatDate(2015, 11, 18, lang)}</td>
          </tr>
          <tr>
            <td>{d('유도')}</td>
            <td className="text-center">2{d('단')}</td>
            <td className="text-center">{d('대한유도회')}</td>
            <td className="text-center">{formatDate(2013, 11, 27, lang)}</td>
          </tr>
          <tr>
            <td>{d('그래픽기술자격')}</td>
            <td className="text-center">3{d('급')}</td>
            <td className="text-center">{d('한국생산성본부')}</td>
            <td className="text-center">{formatDate(2010, 11, 26, lang)}</td>
          </tr>
          <tr>
            <td>
              {d('정보기술자격')}
              <br />
              {d('한글파워포인트')}
            </td>
            <td className="text-center">A{d('등급')}</td>
            <td className="text-center">{d('한국생산성본부')}</td>
            <td className="text-center">{formatDate(2009, 12, 3, lang)}</td>
          </tr>
          <tr>
            <td>{d('워드프로세서')}</td>
            <td className="text-center">3{d('급')}</td>
            <td className="text-center">{d('대한상공회의소')}</td>
            <td className="text-center">{formatDate(2008, 12, 26, lang)}</td>
          </tr>
        </tbody>
      </table>
    </details>
  )
}
