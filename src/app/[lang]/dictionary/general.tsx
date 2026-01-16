import 'server-only'
import { formatDate } from './utils'

export const 작성일 = {
  ko: formatDate(2025, 12, 26, 'ko'),
  en: formatDate(2025, 12, 26, 'en'),
}

export const generalDict = {
  이력서: {
    ko: '이력서',
    en: 'Resume',
  },
  한줄소개: {
    ko: (
      <>
        코드를 이해하고 직접 다루며 품질을 검증하는 QA Engineer입니다. 
        고객의 불편을 기능 단위가 아닌 구조와 코드 관점에서 분석하고, 제품이 ‘왜 그렇게 동작해야 하는지’를 끝까지 질문합니다.
      </>
    ),
    en: (
      <>
      I am a QA Engineer who understands and works directly with code to validate quality.I analyze user issues not at the feature level, but from a structural and code-level perspective, continuously questioning why a product should work the way it does.
      </>
    ),
  },
  히어로태그라인: {
    ko: '개발을 이해하고, 사용자 경험을 개선하는 QA 엔지니어',
    en: '개발을 이해하고, 사용자 경험을 개선하는 QA 엔지니어',
  },
  개발경력: {
    ko: '경력',
    en: 'Work Experience',
  },
  경력기간: {
    ko: `(3개월, ${작성일.ko} 기준)`,
    en: `(3months, as of ${작성일.en})`,
  },
  학력: {
    ko: '학력',
    en: 'Education',
    },
  자격증: {
    ko: '자격증',
    en: 'Certificates',
  },
  기술스택: {
    ko: '기술 스택',
    en: 'Tech Stack',
  },
  추가정보: {
    ko: '추가 정보',
    en: 'Additional Information',
  },
  개발경험: {
    ko: '개발 경험',
    en: 'Development Experience',
  },
  개발활동: {
    ko: '개발 활동',
    en: 'Development Activities',
  },
  수상: {
    ko: '수상',
    en: 'Awards',
  },
  소개: {
    ko: '소개',
    en: 'About',
  },
  문제해결경험: {
    ko: '문제 해결 경험',
    en: 'Problem Solving Experience',

  },
  직무성취경험: {
    ko: '직무 성취 경험',
    en: 'Job Achievement Experience',
 
  },
  가치관및신조: {
    ko: '가치관 및 신조',
    en: 'Values and Beliefs',

  },
  이루고싶은것: {
    ko: '이루고 싶은 것',
    en: 'What I Want to Achieve',

  },
  성격의장단점: {
    ko: '성격의 장단점',
    en: 'Personality Strengths and Weaknesses',
  
  },
  급여있음: {
    ko: '(급여 O, 4대보험 X)',
    en: '(Paid, No Social Insurance)',
 
  },
  급여없음: {
    ko: '(급여 X)',
    en: '(Unpaid)',
 
  },
  약950자: {
    ko: '약 950자',
    en: 'About 950 words',
 
  },
  약900자: {
    ko: '약 900자',
    en: 'About 900 words',
  
  },
  약850자: {
    ko: '약 850자',
    en: 'About 850 words',

  },
  약300자: {
    ko: '약 300자',
    en: 'About 300 words',

  },
  작성자: {
    ko: '작성자: 서민주',
    en: 'Author: Minjoo Suh',
  },
}
