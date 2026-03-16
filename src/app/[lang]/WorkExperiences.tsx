import { PropsWithChildren, ReactNode } from 'react'

import { workExperiencesDict } from './dictionary/work-experiences'
import type { Lang } from './dictionary/utils'

type Props = {
  lang: Lang
}

export const TechBadge = ({ tech }: { tech: string }) => (
  <span className="px-2 py-0.5 bg-[var(--accent-soft)] border border-[var(--border-solid)] font-pixel text-xs text-[var(--text-sub)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200">{tech}</span>
)

const Achievement = ({ children }: PropsWithChildren) => (
  <div className="flex items-start gap-2">
    <span className="text-[var(--accent)] mt-0.5 font-pixel text-xs opacity-60">&#9654;</span>
    <div>{children}</div>
  </div>
)

const PositionDetails = ({
  title,
  team,
  period,
  open = true,
  children,
}: {
  title: string
  team: ReactNode
  period: string
  open?: boolean
  children: ReactNode
}) => (
  <details className="group" open={open}>
    <summary className="cursor-pointer list-none">
      <div className="flex justify-between items-center px-5 py-3.5 bg-[var(--bg-elevated)] border border-[var(--border-solid)] hover:border-[var(--accent)] transition-colors duration-200">
        <div>
          <h4 className="font-pixel text-sm text-[var(--text)]">{title}</h4>
          <p className="font-body text-xs text-[var(--text-muted)] mt-0.5">{team}</p>
        </div>
        <span className="font-body text-xs text-[var(--text-muted)]">{period}</span>
      </div>
    </summary>
    <div className="px-5 py-4 space-y-3.5 border-x border-b border-[var(--border-solid)]">{children}</div>
  </details>
)

export default function WorkExperiences({ lang }: Props) {
  return (
    <div className="space-y-5">
      {/* TOSS */}
      <div className="card overflow-hidden">
        <div className="px-6 py-5 border-b border-[var(--border-solid)]">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <h3 className="font-pixel text-base text-[var(--text)]">
                {workExperiencesDict.TOSS_회사명[lang]}
              </h3>
              <span className="status-chip">
                <span className="status-dot" />
                {workExperiencesDict.현재[lang]}
              </span>
            </div>
            <span className="font-body text-xs text-[var(--text-muted)] mt-1">
              {workExperiencesDict.TOSS_기간[lang]}
            </span>
          </div>
          <p className="font-body text-sm text-[var(--text-sub)] leading-relaxed">
            {workExperiencesDict.TOSS_설명[lang]}
          </p>
        </div>

        <div className="p-6">
          <PositionDetails
            title="QA Assistant"
            team={workExperiencesDict.TOSS_팀[lang]}
            period={workExperiencesDict.TOSS_기간[lang]}
          >
            <p className="font-body text-sm text-[var(--text-sub)] leading-relaxed">{workExperiencesDict.TOSS_업무설명[lang]}</p>

            <div className="flex flex-wrap gap-1.5">
              {['Jira', 'TestRail', 'Regression Test', 'E-commerce QA'].map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>

            <div className="space-y-2.5">
              <Achievement>
                <p className="font-body text-sm text-[var(--text-sub)] leading-relaxed">
                  {workExperiencesDict.TOSS_성과1[lang]}
                </p>
              </Achievement>
              <Achievement>
                <p className="font-body text-sm text-[var(--text-sub)] leading-relaxed">
                  {workExperiencesDict.TOSS_성과2[lang]}
                </p>
              </Achievement>
            </div>
          </PositionDetails>
        </div>
      </div>

      {/* RIWON */}
      <div className="card overflow-hidden">
        <div className="px-6 py-5 border-b border-[var(--border-solid)]">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <h3 className="font-pixel text-base text-[var(--text)]">
                {workExperiencesDict.RIWON_회사명[lang]}
              </h3>
              <span className="font-pixel text-[0.65rem] text-[var(--text-muted)] px-2 py-0.5 border border-[var(--border-solid)] bg-[var(--bg-elevated)]">
                {workExperiencesDict.과거[lang]}
              </span>
            </div>
            <span className="font-body text-xs text-[var(--text-muted)] mt-1">
              {workExperiencesDict.RIWON_기간[lang]}
            </span>
          </div>
          <p className="font-body text-sm text-[var(--text-sub)] leading-relaxed">
            {workExperiencesDict.RIWON_설명[lang]}
          </p>
        </div>

        <div className="p-6">
          <PositionDetails
            title="QA Engineer"
            team={workExperiencesDict.RIWON_팀[lang]}
            period={workExperiencesDict.RIWON_기간[lang]}
          >
            <p className="font-body text-sm text-[var(--text-sub)] leading-relaxed">{workExperiencesDict.RIWON_업무설명[lang]}</p>

            <div className="flex flex-wrap gap-1.5">
              {['QA', 'Test Case', 'Bug Report', 'Game QA'].map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          </PositionDetails>
        </div>
      </div>
    </div>
  )
}
