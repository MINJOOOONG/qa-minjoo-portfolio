'use client'

import { PropsWithChildren, ReactNode } from 'react'

const TechTag = ({ tech }: { tech: string }) => (
  <span className="pill text-xs">{tech}</span>
)

const Achievement = ({ children }: PropsWithChildren) => (
  <div className="flex items-start gap-2.5">
    <span className="flex-shrink-0 w-1 h-1 mt-[0.55rem] rounded-full bg-[var(--accent)]" />
    <div className="text-sm text-[var(--text-sub)] leading-relaxed">{children}</div>
  </div>
)

const PositionDetails = ({
  team,
  period,
  open = true,
  children,
}: {
  team: ReactNode
  period: string
  open?: boolean
  children: ReactNode
}) => (
  <details className="group" open={open}>
    <summary className="cursor-pointer list-none">
      <div className="flex justify-between items-center py-2.5 px-3.5 rounded-lg border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors">
        <p className="text-sm text-[var(--text-sub)]">{team}</p>
        <span className="text-xs text-[var(--text-muted)] tracking-wider">{period}</span>
      </div>
    </summary>
    <div className="pt-4 space-y-3">{children}</div>
  </details>
)

export default function WorkExperiences({ d }: { d: (key: string) => any }) {
  return (
    <div>
      {/* TOSS */}
      <div className="exp-item">
        <div className="exp-grid">
          <div>
            <div className="inline-block mb-2 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)] border border-[var(--accent)] border-opacity-40 rounded-full">
              {d('현재')}
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-[var(--text)]">{d('TOSS_회사명')}</h3>
            <p className="text-xs text-[var(--text-muted)] tracking-wider mt-1">{d('TOSS_기간')}</p>
          </div>

          <div>
            <p className="text-sm text-[var(--text-sub)] leading-relaxed mb-5 whitespace-pre-line">{d('TOSS_설명')}</p>

            <PositionDetails
              team={d('TOSS_팀')}
              period={d('TOSS_기간') as string}
            >
              <p className="text-sm text-[var(--text-sub)] leading-relaxed whitespace-pre-line">{d('TOSS_업무설명')}</p>
              <div className="flex flex-wrap gap-1.5">
                {['Jira', 'TestRail', 'Regression Test', 'E-commerce QA'].map((tech) => (
                  <TechTag key={tech} tech={tech} />
                ))}
              </div>
              <div className="space-y-2">
                <Achievement>{d('TOSS_성과1')}</Achievement>
                <Achievement>{d('TOSS_성과2')}</Achievement>
              </div>
            </PositionDetails>
          </div>
        </div>
      </div>

      {/* RIWON */}
      <div className="exp-item">
        <div className="exp-grid">
          <div>
            <div className="inline-block mb-2 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] border border-[var(--border)] rounded-full">
              {d('과거')}
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-[var(--text)]">{d('RIWON_회사명')}</h3>
            <p className="text-xs text-[var(--text-muted)] tracking-wider mt-1">{d('RIWON_기간')}</p>
          </div>

          <div>
            <p className="text-sm text-[var(--text-sub)] leading-relaxed mb-5 whitespace-pre-line">{d('RIWON_설명')}</p>

            <PositionDetails
              team={d('RIWON_팀')}
              period={d('RIWON_기간') as string}
            >
              <p className="text-sm text-[var(--text-sub)] leading-relaxed whitespace-pre-line">{d('RIWON_업무설명')}</p>
              <div className="flex flex-wrap gap-1.5">
                {['QA', 'Test Case', 'Bug Report', 'Game QA'].map((tech) => (
                  <TechTag key={tech} tech={tech} />
                ))}
              </div>
            </PositionDetails>
          </div>
        </div>
      </div>
    </div>
  )
}
