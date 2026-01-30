'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { certificatesDict } from '../dictionaries/certificates'
import { formatDate, formatSession } from '../dictionaries/utils'
import { getDictValue } from '../hooks/useDictionary'

export default function Certificates() {
  const { lang } = useLanguage()
  const d = (key: keyof typeof certificatesDict) => getDictValue(certificatesDict[key], lang)

  return (
    <table>
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
          <td>
            <a
              href="https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd=1320"
              target="_blank"
              rel="noreferrer"
            >
              {d('정기기사1회')}
            </a>
          </td>
          <td className="text-center">
            <a href="/pdf/2025-06-13_정보처리기사.pdf" target="_blank">
              {d('정보처리기사')}
            </a>
          </td>
          <td className="text-center">{d('과학기술정보통신부')}</td>
          <td className="text-center">{formatDate(2025, 6, 13, lang)}</td>
        </tr>
        <tr>
          <td>
            <a href="https://www.topcit.or.kr/home.do" target="_blank" rel="noreferrer">
              TOPCIT
            </a>{' '}
            {formatSession(15, lang)}
          </td>
          <td className="text-center">
            <a href="/pdf/2021-05-22_TOPCIT_15회.pdf" target="_blank">
              627{d('점')} ({d('전국4등')})
            </a>
          </td>
          <td className="text-center">{d('과학기술정보통신부')}</td>
          <td className="text-center">{formatDate(2021, 5, 22, lang)}</td>
        </tr>
        <tr>
          <td>
            <a href="https://www.g-telp.co.kr:335/" target="_blank" rel="noreferrer">
              G-TELP (Level 2)
            </a>
          </td>
          <td className="text-center">
            <a href="/images/2020-gtelp.webp" target="_blank">
              82{d('점')}
            </a>
          </td>
          <td className="text-center">{d('국제테스트연구원')}</td>
          <td className="text-center">{formatDate(2020, 5, 3, lang)}</td>
        </tr>
        <tr>
          <td>
            <a href="https://www.hanja.ne.kr/index_original.asp" target="_blank" rel="noreferrer">
              {d('대한검정회')}
            </a>
          </td>
          <td className="text-center">
            <a href="/images/2009-hanja.webp" target="_blank">
              {d('준1급')}
            </a>
          </td>
          <td className="text-center">{d('대한민국한자교육연구회')}</td>
          <td className="text-center">{formatDate(2009, 11, 28, lang)}</td>
        </tr>
      </tbody>
    </table>
  )
}
