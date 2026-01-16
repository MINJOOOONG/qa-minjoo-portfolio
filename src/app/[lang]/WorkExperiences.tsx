import { PropsWithChildren, ReactNode } from 'react'

import { workExperiencesDict } from './dictionary/work-experiences'

type Props = {
  lang: 'ko' | 'en'
}

const TimelineDot = ({
  children,
  className = 'bg-blue-100 text-blue-700',
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={`absolute left-0 top-2 w-16 h-16 rounded-full flex items-center justify-center ${className}`}
  >
    <span className="text-xs font-bold">{children}</span>
  </div>
)

const ExperienceCard = ({ children }: PropsWithChildren) => (
  <div className="ml-24 bg-white rounded-xl border-2 border-gray-200 p-6">{children}</div>
)

export const TechBadge = ({ tech }: { tech: string }) => (
  <span className="px-2 py-1 bg-gray-100 rounded text-xs">{tech}</span>
)


const Achievement = ({ children }: PropsWithChildren) => (
  <div className="flex items-start gap-2">
    <span className="text-blue-500 mt-px">•</span>
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
      <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-700">{team}</p>
        </div>
        <span className="text-sm text-gray-500">{period}</span>
      </div>
    </summary>
    <div className="p-4 space-y-3">{children}</div>
  </details>
)

export default function WorkExperiences({ lang }: Props) {
  return (
    <ul className="space-y-8">
      {/* TOSS */}
      <li className="relative">
        <TimelineDot>{workExperiencesDict.현재[lang]}</TimelineDot>

        <ExperienceCard>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold">
              {workExperiencesDict.TOSS_회사명[lang]}
            </h3>
            <span className="text-sm text-gray-500">
              {workExperiencesDict.TOSS_기간[lang]}
            </span>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            {workExperiencesDict.TOSS_설명[lang]}
          </p>

          <PositionDetails
            title="QA Assistant"
            team={workExperiencesDict.TOSS_팀[lang]}
            period={workExperiencesDict.TOSS_기간[lang]}
          >
            <p className="text-sm">{workExperiencesDict.TOSS_업무설명[lang]}</p>

            <div className="flex flex-wrap gap-1">
              {['Jira', 'TestRail', 'Regression Test', 'E-commerce QA'].map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>

            <div className="space-y-2 mt-2">
              <Achievement>
                <p className="text-sm text-gray-600">
                  {workExperiencesDict.TOSS_성과1[lang]}
                </p>
              </Achievement>
              <Achievement>
                <p className="text-sm text-gray-600">
                  {workExperiencesDict.TOSS_성과2[lang]}
                </p>
              </Achievement>
            </div>
          </PositionDetails>
        </ExperienceCard>
      </li>

      {/* RIWON */}
      <li className="relative">
        <TimelineDot className="bg-gray-100 text-gray-700">
          {workExperiencesDict.과거[lang]}
        </TimelineDot>

        <ExperienceCard>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold">
              {workExperiencesDict.RIWON_회사명[lang]}
            </h3>
            <span className="text-sm text-gray-500">
              {workExperiencesDict.RIWON_기간[lang]}
            </span>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            {workExperiencesDict.RIWON_설명[lang]}
          </p>

          <PositionDetails
            title="QA Engineer"
            team={workExperiencesDict.RIWON_팀[lang]}
            period={workExperiencesDict.RIWON_기간[lang]}
          >
            <p className="text-sm">{workExperiencesDict.RIWON_업무설명[lang]}</p>

            <div className="flex flex-wrap gap-1">
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
