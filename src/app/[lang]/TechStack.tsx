import {
  siCloudflare,
  siCss,
  siDatadog,
  siDocker,
  siDrizzle,
  siElasticsearch,
  siGoogleanalytics,
  siGooglecloud,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPwa,
  siPython,
  siReact,
  siRedis,
  siSentry,
  siSocketdotio,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVitest,
} from 'simple-icons'

type TechItem = {
  name: string
  href: string
  icon: null | { hex: string; path: string }
}

type TechCategory = {
  title: string
  items: TechItem[]
}

const techCategories: TechCategory[] = [
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript (ES2023)', href: 'https://javascript.info/', icon: siJavascript },
      { name: 'TypeScript', href: 'https://www.typescriptlang.org/', icon: siTypescript },
      { name: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS', icon: siCss },
      { name: 'Python', href: 'https://www.python.org/', icon: siPython },
      { name: 'SQL', href: 'https://en.wikipedia.org/wiki/SQL', icon: null },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'Next.js App Router', href: 'https://nextjs.org/', icon: siNextdotjs },
      { name: 'React.js', href: 'https://react.dev/', icon: siReact },
      { name: 'Tailwind CSS', href: 'https://tailwindcss.com/', icon: siTailwindcss },
      { name: 'Zustand', href: 'https://zustand-demo.pmnd.rs/', icon: null },
      { name: 'Playwright', href: 'https://playwright.dev/', icon: null },
      { name: 'PWA', href: 'https://web.dev/progressive-web-apps/', icon: siPwa },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', href: 'https://nodejs.org/en/', icon: siNodedotjs },
      { name: 'Socket.IO', href: 'https://socket.io/', icon: siSocketdotio },
      { name: 'Drizzle ORM', href: 'https://orm.drizzle.team/', icon: siDrizzle },
      { name: 'Docker', href: 'https://www.docker.com/', icon: siDocker },
      { name: 'PostgreSQL', href: 'https://www.postgresql.org/', icon: siPostgresql },
      { name: 'Redis', href: 'https://redis.io/', icon: siRedis },
      { name: 'Elasticsearch', href: 'https://www.elastic.co/kr/enterprise-search', icon: siElasticsearch },
    ],
  },
  {
    title: 'Cloud',
    items: [
      { name: 'Vercel', href: 'https://vercel.com/', icon: siVercel },
      { name: 'Supabase', href: 'https://supabase.com/', icon: siSupabase },
      { name: 'Cloudflare', href: 'https://www.cloudflare.com/', icon: siCloudflare },
      { name: 'Google Cloud', href: 'https://cloud.google.com/gcp/', icon: siGooglecloud },
      { name: 'AWS', href: 'https://aws.amazon.com/ko/', icon: null },
    ],
  },
  {
    title: 'Operations',
    items: [
      { name: 'Sentry', href: 'https://sentry.io/welcome/', icon: siSentry },
      { name: 'Datadog', href: 'https://datadoghq.com/', icon: siDatadog },
      { name: 'Vitest', href: 'https://vitest.dev/', icon: siVitest },
      { name: 'Google Analytics', href: 'https://analytics.google.com/analytics/web/', icon: siGoogleanalytics },
      { name: 'Amplitude', href: 'https://amplitude.com/', icon: null },
      { name: 'GrowthBook', href: 'https://www.growthbook.io/', icon: null },
    ],
  },
  {
    title: 'AI',
    items: [
      { name: 'ComfyUI', href: 'https://github.com/comfyanonymous/ComfyUI', icon: null },
      { name: 'LoRA (Kohya SS)', href: 'https://github.com/bmaltais/kohya_ss', icon: null },
    ],
  },
]

export default function TechStack() {
  return (
    <div className="card overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {techCategories.map((category, index) => (
          <div
            key={index}
            className="px-6 py-5 border-b border-[var(--border-solid)] sm:odd:border-r last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
          >
            <h4 className="font-pixel text-[0.65rem] text-[var(--accent)] uppercase tracking-widest opacity-70 mb-3">{category.title}</h4>

            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[var(--accent-soft)] border border-[var(--border-solid)] font-body text-xs text-[var(--text-sub)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                >
                  {item.icon && (
                    <svg
                      className="w-3 h-3 opacity-70"
                      viewBox="0 0 24 24"
                      fill={`#${item.icon.hex}`}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d={item.icon.path} />
                    </svg>
                  )}
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
