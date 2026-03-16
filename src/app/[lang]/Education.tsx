import { educationDict } from './dictionary/education'
import type { Lang } from './dictionary/utils'

type Props = {
  lang: Lang
}

export default function Education({ lang }: Props) {
  return (
    <div className="card overflow-hidden">
      <table>
        <thead>
          <tr>
            <td>{educationDict.학력_이름[lang]}</td>
            <td>{educationDict.세부[lang]}</td>
            <td>{educationDict.기간[lang]}</td>
            <td>{educationDict.비고[lang]}</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="font-pixel">
              <a href="https://www.hufs.ac.kr" target="_blank" rel="noreferrer">
                {educationDict.한국외국어대학교[lang]}
              </a>
            </td>

            <td className="font-body">
              {educationDict.학력_학위[lang]}
              <div className="text-sm text-[var(--text-muted)]">{educationDict.학력_비고[lang]}</div>
            </td>

            <td className="text-center font-body">{educationDict.학력_기간[lang]}</td>
            <td className="text-center font-body">{educationDict.비고_내용[lang]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
