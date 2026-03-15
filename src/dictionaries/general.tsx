import { formatDateSimple } from './utils'

export const 작성일 = formatDateSimple(2025, 12, 26)

export const generalDict = {
  이력서: {
    ko: '이력서',
    en: 'Resume',
    ja: '履歴書',
    zh: '简历',
    fr: 'CV',
  },
  한줄소개: {
    ko: '코드를 이해하고 직접 다루며 품질을 검증하는 QA Engineer입니다. 고객의 불편을 기능 단위가 아닌 구조와 코드 관점에서 분석하고, 제품이 \'왜 그렇게 동작해야 하는지\'를 끝까지 질문합니다.',
    en: 'I am a QA Engineer who understands and works directly with code to validate quality. I analyze user issues not at the feature level, but from a structural and code-level perspective, continuously questioning why a product should work the way it does.',
    ja: 'コードを理解し、直接扱いながら品質を検証するQAエンジニアです。顧客の不便を機能単位ではなく構造とコードの観点から分析し、製品が「なぜそのように動作すべきか」を最後まで問い続けます。',
    zh: '我是一名能够理解代码并直接操作来验证质量的QA工程师。我从结构和代码角度而非功能单元来分析用户问题，始终追问产品"为什么应该这样运行"。',
    fr: 'Je suis ingénieure QA, capable de comprendre et manipuler directement le code pour valider la qualité. J\'analyse les problèmes utilisateurs non pas au niveau fonctionnel, mais du point de vue structurel et du code, en questionnant sans cesse pourquoi un produit devrait fonctionner ainsi.',
  },
  히어로태그라인: {
    ko: '개발을 이해하고, 사용자 경험을 개선하는 QA 엔지니어',
    en: 'QA Engineer who understands development and improves user experience',
    ja: '開発を理解し、ユーザー体験を改善するQAエンジニア',
    zh: '理解开发、改善用户体验的QA工程师',
    fr: 'Ingénieure QA qui comprend le développement et améliore l\'expérience utilisateur',
  },
  개발경력: {
    ko: '경력',
    en: 'Work Experience',
    ja: '職歴',
    zh: '工作经历',
    fr: 'Expérience professionnelle',
  },
  경력기간: {
    ko: '(3개월, 2025.12.26 기준)',
    en: '(3 months, as of Dec 26, 2025)',
    ja: '(3ヶ月、2025.12.26基準)',
    zh: '(3个月，截至2025.12.26)',
    fr: '(3 mois, au 26 déc. 2025)',
  },
  학력: {
    ko: '학력',
    en: 'Education',
    ja: '学歴',
    zh: '学历',
    fr: 'Formation',
  },
  기술스택: {
    ko: '기술 스택',
    en: 'Tech Stack',
    ja: '技術スタック',
    zh: '技术栈',
    fr: 'Stack technique',
  },
  포트폴리오: {
    ko: '포트폴리오',
    en: 'Portfolio',
    ja: 'ポートフォリオ',
    zh: '作品集',
    fr: 'Portfolio',
  },
  준비중: {
    ko: '준비 중입니다.',
    en: 'Coming soon.',
    ja: '準備中です。',
    zh: '准备中。',
    fr: 'Bientôt disponible.',
  },
  작성자: {
    ko: '작성자: 서민주',
    en: 'Author: Minjoo Suh',
    ja: '作成者: ソ・ミンジュ',
    zh: '作者：徐旼珠',
    fr: 'Autrice : Minjoo Suh',
  },
}
