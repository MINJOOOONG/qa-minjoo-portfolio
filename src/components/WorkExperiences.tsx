'use client'

import { PropsWithChildren, ReactNode } from 'react'

import { useLanguage } from '../contexts/LanguageContext'
import { workExperiencesDict } from '../dictionaries/work-experiences'
import { getDictValue } from '../hooks/useDictionary'

const TimelineDot = ({
  children,
  isActive = false,
}: {
  children: ReactNode
  isActive?: boolean
}) => (
  <div className={`timeline-dot ${isActive ? '' : 'past'}`}>
    {children}
  </div>
)

const ExperienceCard = ({ children }: PropsWithChildren) => (
  <div className="ml-20 glass-card p-6">{children}</div>
)

const TechBadge = ({ tech }: { tech: string }) => (
  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-gray-300 border border-white/10">
    {tech}
  </span>
)

const Achievement = ({ children }: PropsWithChildren) => (
  <div className="flex items-start gap-3">
    <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-400/60" />
    <div className="text-sm text-gray-300">{children}</div>
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
      <div className="flex justify-between items-center p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
        <div>
          <h4 className="font-semibold text-gray-100">{title}</h4>
          <p className="text-sm text-gray-400 mt-0.5">{team}</p>
        </div>
        <span className="text-xs text-gray-500 font-mono">{period}</span>
      </div>
    </summary>
    <div className="p-4 space-y-4">{children}</div>
  </details>
)

export default function WorkExperiences() {
  const { lang } = useLanguage()
  const d = <K extends keyof typeof workExperiencesDict>(key: K) =>
    getDictValue(workExperiencesDict[key], lang)

  return (
    <ul className="space-y-6">
      {/* TOSS */}
      <li className="relative">
        <TimelineDot isActive>{d('현재')}</TimelineDot>

        <ExperienceCard>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-gray-100">{d('TOSS_회사명')}</h3>
            <span className="text-xs text-gray-500 font-mono">{d('TOSS_기간')}</span>
          </div>

          <p className="text-sm text-gray-400 mb-4 leading-relaxed">{d('TOSS_설명')}</p>

          <PositionDetails
            title="QA Assistant"
            team={d('TOSS_팀')}
            period={d('TOSS_기간') as string}
          >
            <p className="text-sm text-gray-400 leading-relaxed">{d('TOSS_업무설명')}</p>

            <div className="flex flex-wrap gap-1.5">
              {['Jira', 'TestRail', 'Regression Test', 'E-commerce QA'].map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>

            <div className="space-y-2">
              <Achievement>{d('TOSS_성과1')}</Achievement>
              <Achievement>{d('TOSS_성과2')}</Achievement>
            </div>
          </PositionDetails>
        </ExperienceCard>
      </li>

      {/* RIWON */}
      <li className="relative">
        <TimelineDot>{d('과거')}</TimelineDot>

        <ExperienceCard>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-gray-100">{d('RIWON_회사명')}</h3>
            <span className="text-xs text-gray-500 font-mono">{d('RIWON_기간')}</span>
          </div>

          <p className="text-sm text-gray-400 mb-4 leading-relaxed">{d('RIWON_설명')}</p>

          <PositionDetails
            title="QA Engineer"
            team={d('RIWON_팀')}
            period={d('RIWON_기간') as string}
          >
            <p className="text-sm text-gray-400 leading-relaxed">{d('RIWON_업무설명')}</p>

            <div className="flex flex-wrap gap-1.5">
              {['QA', 'Test Case', 'Bug Report', 'Game QA'].map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
          </PositionDetails>
        </ExperienceCard>
      </li>
    </ul>
  )
}
