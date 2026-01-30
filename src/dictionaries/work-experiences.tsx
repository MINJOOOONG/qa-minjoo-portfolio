import { PropsWithChildren } from 'react'

const SubText = ({ children }: PropsWithChildren) => (
  <span className="text-gray-500 font-medium text-xs">{children}</span>
)

export const workExperiencesDict = {
  현재: { ko: '현재', en: 'Current' },
  과거: { ko: '과거', en: 'Past' },

  // TOSS
  TOSS_회사명: { ko: '토스', en: 'Toss' },
  TOSS_팀: {
    ko: (
      <>
        QA Engineer <SubText>(Contract)</SubText>
      </>
    ),
    en: (
      <>
        QA Engineer <SubText>(Contract)</SubText>
      </>
    ),
  },
  TOSS_기간: { ko: '2025.11 ~ 현재', en: 'Nov 2025 ~ Present' },
  TOSS_설명: {
    ko: `토스 쇼핑(이커머스) 서비스에서 QA Assistant로 근무하며, 내부 기획 툴과 테스트 관리 도구를 활용한 전반적인 품질 검증 업무를 수행하고 있습니다.
자체 Figma 툴인 Deus와 Notion/Jira를 통해 기획서를 분석하고, TestRail 기반 테스트 케이스 실행 및 결과 관리를 통해 기능 안정성을 검증합니다.
또한 Slack 중심 커뮤니케이션을 운영하며 반복 업무 효율화를 위해 Slack Bot을 직접 제작·활용하는 등 QA 프로세스 개선에도 기여하고 있습니다.`,
    en: `Working as a QA Assistant for Toss Shopping (e-commerce), performing end-to-end quality verification using internal planning tools and test management systems.
I analyze requirements via Deus (internal Figma) and Notion/Jira, and validate feature stability by executing and managing test cases in TestRail.
I also collaborate across teams via Slack and contribute to QA process improvements by building and using a Slack bot to streamline repetitive workflows.`,
  },
  TOSS_업무설명: {
    ko: `요구사항 분석 → 테스트 케이스 설계/수행 → 결과 리포팅까지 E2E 품질 검증을 수행합니다.
결제/쿠폰/배송비/주문(CTA) 등 핵심 플로우 리그레션 테스트를 통해 릴리즈 안정성을 확보합니다.`,
    en: `Conduct end-to-end quality validation from requirement analysis to test case design/execution and reporting.
Ensure release stability through regression testing across core flows such as payment, coupons, shipping fees, and ordering (CTA).`,
  },
  TOSS_성과1: {
    ko: '테스트 케이스 실행/관리(Testrail) 및 이슈 트래킹(Jira)을 통해 리그레션 품질을 안정적으로 운영',
    en: 'Operated stable regression quality by managing test runs in TestRail and tracking issues in Jira',
  },
  TOSS_성과2: {
    ko: 'Slack 기반 협업 및 반복 업무 자동화를 통해 QA 커뮤니케이션/프로세스 효율화에 기여',
    en: 'Improved QA communication and process efficiency through Slack-based collaboration and workflow automation',
  },

  // RIWON
  RIWON_회사명: { ko: '라이원소프트', en: 'RIWON' },
  RIWON_팀: {
    ko: (
      <>
        QA Engineer <SubText>(Intern)</SubText>
      </>
    ),
    en: (
      <>
        QA Engineer <SubText>(Intern)</SubText>
      </>
    ),
  },
  RIWON_기간: { ko: '2025.07 ~ 2025.08', en: 'Jul 2025 ~ Aug 2025' },
  RIWON_설명: {
    ko: `모바일 게임 '케로로 건슈팅' 출시 전 QA로 참여하여 약 3주간 테스트를 수행했습니다.
Redmine을 통해 50건 이상의 버그를 리포트하고, UI/UX 및 서버 연동 테스트를 진행하며 실제 서비스 품질 안정화 과정에 기여했습니다.
개발자와 협업하며 원인을 추적하고 개선안을 제시하며, QA가 단순 테스트를 넘어 사용자 경험과 완성도를 높이는 과정임을 체감했습니다.`,
    en: `Participated in pre-release QA for the mobile game "Keroro Gun Shooting" and executed testing for about three weeks.
Reported 50+ bugs via Redmine, conducted UI/UX and server-integration testing, and contributed to service quality stabilization.
By collaborating with developers to trace root causes and propose improvements, I learned QA is not just testing—it's about improving user experience and product completeness.`,
  },
  RIWON_업무설명: {
    ko: `테스트 케이스 작성, 기능 검증, 버그 재현 및 리포팅을 수행했습니다.
UI/UX 및 서버 연동 테스트를 통해 릴리즈 품질 안정화에 기여했습니다.`,
    en: `Created test cases, validated features, reproduced and reported bugs.
Contributed to release quality stabilization through UI/UX and server-integration testing.`,
  },
}
