import 'server-only'
import { formatDate } from './utils'

export const 작성일 = {
  ko: formatDate(2025, 12, 26, 'ko'),
  en: formatDate(2025, 12, 26, 'en'),
  ja: formatDate(2025, 12, 26, 'ja'),
  zh: formatDate(2025, 12, 26, 'zh'),
}

export const generalDict = {
  이력서: {
    ko: '이력서',
    en: 'Resume',
    ja: '履歴書',
    zh: '简历',
  },
  한줄소개: {
    ko: (
      <>
        코드를 이해하고 직접 다루며 품질을 검증하는 QA Engineer입니다.
        고객의 불편을 기능 단위가 아닌 구조와 코드 관점에서 분석하고, 제품이 '왜 그렇게 동작해야 하는지'를 끝까지 질문합니다.
      </>
    ),
    en: (
      <>
      I am a QA Engineer who understands and works directly with code to validate quality.I analyze user issues not at the feature level, but from a structural and code-level perspective, continuously questioning why a product should work the way it does.
      </>
    ),
    ja: (
      <>
        コードを理解し、直接扱いながら品質を検証するQAエンジニアです。
        ユーザーの不便を機能単位ではなく、構造とコードの観点から分析し、製品が「なぜそう動作すべきか」を最後まで問い続けます。
      </>
    ),
    zh: (
      <>
        我是一名理解代码并直接操作代码来验证质量的QA工程师。
        我从结构和代码的角度分析用户问题，而非仅从功能层面，持续追问产品"为什么应该这样运行"。
      </>
    ),
  },
  히어로태그라인: {
    ko: '개발을 이해하고, 사용자 경험을 개선하는 QA 엔지니어',
    en: 'A QA Engineer who understands development and improves user experience',
    ja: '開発を理解し、ユーザー体験を改善するQAエンジニア',
    zh: '理解开发、改善用户体验的QA工程师',
  },
  개발경력: {
    ko: '경력',
    en: 'Work Experience',
    ja: '職歴',
    zh: '工作经历',
  },
  경력기간: {
    ko: `(3개월, ${작성일.ko} 기준)`,
    en: `(3months, as of ${작성일.en})`,
    ja: `(3ヶ月、${작성일.ja}時点)`,
    zh: `(3个月，截至${작성일.zh})`,
  },
  학력: {
    ko: '학력',
    en: 'Education',
    ja: '学歴',
    zh: '教育经历',
  },
  자격증: {
    ko: '자격증',
    en: 'Certificates',
    ja: '資格',
    zh: '资格证书',
  },
  기술스택: {
    ko: '기술 스택',
    en: 'Tech Stack',
    ja: '技術スタック',
    zh: '技术栈',
  },
  추가정보: {
    ko: '추가 정보',
    en: 'Additional Information',
    ja: '追加情報',
    zh: '附加信息',
  },
  개발경험: {
    ko: '개발 경험',
    en: 'Development Experience',
    ja: '開発経験',
    zh: '开发经验',
  },
  개발활동: {
    ko: '개발 활동',
    en: 'Development Activities',
    ja: '開発活動',
    zh: '开发活动',
  },
  수상: {
    ko: '수상',
    en: 'Awards',
    ja: '受賞',
    zh: '获奖',
  },
  소개: {
    ko: '소개',
    en: 'About',
    ja: '紹介',
    zh: '介绍',
  },
  문제해결경험: {
    ko: '문제 해결 경험',
    en: 'Problem Solving Experience',
    ja: '問題解決経験',
    zh: '问题解决经验',
  },
  직무성취경험: {
    ko: '직무 성취 경험',
    en: 'Job Achievement Experience',
    ja: '職務達成経験',
    zh: '工作成就经验',
  },
  가치관및신조: {
    ko: '가치관 및 신조',
    en: 'Values and Beliefs',
    ja: '価値観と信条',
    zh: '价值观与信念',
  },
  이루고싶은것: {
    ko: '이루고 싶은 것',
    en: 'What I Want to Achieve',
    ja: '達成したいこと',
    zh: '想要实现的目标',
  },
  성격의장단점: {
    ko: '성격의 장단점',
    en: 'Personality Strengths and Weaknesses',
    ja: '性格の長所と短所',
    zh: '性格优缺点',
  },
  급여있음: {
    ko: '(급여 O, 4대보험 X)',
    en: '(Paid, No Social Insurance)',
    ja: '(有給、社会保険なし)',
    zh: '(有薪，无社保)',
  },
  급여없음: {
    ko: '(급여 X)',
    en: '(Unpaid)',
    ja: '(無給)',
    zh: '(无薪)',
  },
  약950자: {
    ko: '약 950자',
    en: 'About 950 words',
    ja: '約950字',
    zh: '约950字',
  },
  약900자: {
    ko: '약 900자',
    en: 'About 900 words',
    ja: '約900字',
    zh: '约900字',
  },
  약850자: {
    ko: '약 850자',
    en: 'About 850 words',
    ja: '約850字',
    zh: '约850字',
  },
  약300자: {
    ko: '약 300자',
    en: 'About 300 words',
    ja: '約300字',
    zh: '约300字',
  },
  작성자: {
    ko: '작성자: 서민주',
    en: 'Author: Minjoo Suh',
    ja: '著者：ソ・ミンジュ',
    zh: '作者：徐敏珠',
  },
}
