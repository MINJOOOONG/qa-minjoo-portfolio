import { certificatesDict } from './dictionary/certificates'
import { type Lang } from './dictionary/utils'

type Props = {
  lang: Lang
}

export default function Certificates({ lang }: Props) {
  const dict = certificatesDict

  return (
    <div className="card overflow-hidden">
      <table>
        <thead>
          <tr>
            <td>{dict.이름[lang]}</td>
            <td>{dict.내용[lang]}</td>
            <td>{dict.주관[lang]}</td>
            <td>{dict.일시[lang]}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="text-center font-body text-sm text-[var(--text-muted)] py-6">
              {lang === 'ko' && '자격증 정보를 추가해주세요'}
              {lang === 'en' && 'Please add your certificates'}
              {lang === 'ja' && '資格情報を追加してください'}
              {lang === 'zh' && '请添加您的证书信息'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
