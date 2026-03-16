import type { Lang } from './dictionary/utils'

export type ProjectItem = {
  id: string
  title: Record<Lang, string>
  period: Record<Lang, string>
  description: Record<Lang, string>
  techStack: string[]
  image: string
  links: { label: string; url: string }[]
}

export const defaultProjects: ProjectItem[] = [
  {
    id: 'portfolio-website',
    title: {
      ko: 'QA 엔지니어 포트폴리오 웹사이트',
      en: 'QA Engineer Portfolio Website',
      ja: 'QAエンジニア ポートフォリオウェブサイト',
      zh: 'QA工程师作品集网站',
    },
    period: {
      ko: '2025.01 ~ 현재',
      en: 'Jan 2025 ~ Present',
      ja: '2025.01 ~ 現在',
      zh: '2025.01 ~ 至今',
    },
    description: {
      ko: '경력, 프로젝트 경험, 자격증, 기술 스택 등을 한눈에 보여주는 개인 포트폴리오 웹사이트입니다. 다국어(한/영/일/중) 지원, 픽셀 아트 기반 개발자 스타일 UI, 애니메이션 배경, 인라인 편집 기능(비밀번호 인증), Neon DB를 활용한 데이터 저장 등을 구현했습니다. Google Analytics, Amplitude, Cloudflare Analytics를 통한 사용자 분석도 연동되어 있습니다.',
      en: 'A personal portfolio website showcasing career history, project experience, certifications, and tech stack at a glance. Features include multi-language support (KO/EN/JA/ZH), pixel-art developer-style UI, animated background, inline editing with password authentication, and data persistence via Neon DB. User analytics are integrated through Google Analytics, Amplitude, and Cloudflare Analytics.',
      ja: 'キャリア、プロジェクト経験、資格、技術スタックを一目で確認できる個人ポートフォリオウェブサイトです。多言語対応（韓/英/日/中）、ピクセルアートベースの開発者スタイルUI、アニメーション背景、インライン編集機能（パスワード認証）、Neon DBを活用したデータ保存などを実装しました。',
      zh: '展示职业经历、项目经验、证书和技术栈的个人作品集网站。支持多语言（韩/英/日/中）、像素艺术风格UI、动画背景、内联编辑功能（密码认证）、通过Neon DB实现数据持久化。集成了Google Analytics、Amplitude和Cloudflare Analytics用户分析。',
    },
    techStack: [
      'Next.js 15',
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Neon PostgreSQL',
      'Vercel',
      'Google Analytics',
      'Amplitude',
      'Cloudflare Analytics',
    ],
    image: '/images/portfolio-preview.svg',
    links: [
      { label: 'Live Site', url: 'https://gwak2837.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/gwak2837/resume' },
    ],
  },
]
