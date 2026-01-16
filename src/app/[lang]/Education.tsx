import { educationDict } from './dictionary/education'

type Props = {
  lang: 'ko' | 'en'
}

export default function Education({ lang }: Props) {
  return (
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
          <td className="font-semibold">
            <a href="https://www.hufs.ac.kr" target="_blank" rel="noreferrer">
              {educationDict.한국외국어대학교[lang]}
            </a>
          </td>

          <td>
            {educationDict.학력_학위[lang]}
            <div className="text-xs text-gray-500">{educationDict.학력_비고[lang]}</div>
          </td>

          <td className="text-center">{educationDict.학력_기간[lang]}</td>
          <td className="text-center">{educationDict.비고_내용[lang]}</td>
        </tr>
      </tbody>
    </table>
  )
}
