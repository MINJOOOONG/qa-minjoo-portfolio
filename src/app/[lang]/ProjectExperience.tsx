'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { verifyPassword } from '../actions/auth'
import { saveProjects } from '../actions/content'
import type { Lang } from './dictionary/utils'
import type { ProjectItem } from './project-data'

type Props = {
  lang: Lang
  projects: ProjectItem[]
}

/* ── TechBadge (reuse same style as WorkExperiences) ── */
const TechBadge = ({ tech }: { tech: string }) => (
  <span className="px-2 py-0.5 bg-[var(--accent-soft)] border border-[var(--border-solid)] font-pixel text-xs text-[var(--text-sub)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200">
    {tech}
  </span>
)

/* ── Project Card (View Mode) ── */
function ProjectCard({ project, lang }: { project: ProjectItem; lang: Lang }) {
  return (
    <div className="card overflow-hidden">
      {project.image && (
        <div className="relative w-full aspect-video bg-[var(--bg-surface)]">
          <Image
            src={project.image}
            alt={project.title[lang]}
            fill
            className="object-cover"
            sizes="(max-width: 1040px) 100vw, 1040px"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-pixel text-lg text-[var(--text)]">{project.title[lang]}</h4>
          <span className="font-body text-sm text-[var(--text-muted)] whitespace-nowrap ml-4">
            {project.period[lang]}
          </span>
        </div>

        <p className="font-body text-base text-[var(--text-sub)] mb-4">{project.description[lang]}</p>

        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        )}

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-body text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition"
              >
                <span>&#8599;</span> {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Project Edit Card ── */
function ProjectEditCard({
  project,
  lang,
  onChange,
  onDelete,
}: {
  project: ProjectItem
  lang: Lang
  onChange: (updated: ProjectItem) => void
  onDelete: () => void
}) {
  const [newTech, setNewTech] = useState('')
  const [newLinkLabel, setNewLinkLabel] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')

  const inputClass =
    'w-full border border-[var(--border-solid)] px-3 py-2 text-sm text-[var(--text)] bg-[var(--bg-elevated)] focus:outline-none focus:border-[var(--accent)] font-body'

  const labelClass = 'block text-xs font-pixel uppercase tracking-wider text-[var(--accent)] mb-1'

  return (
    <div className="border-2 border-[var(--accent)] bg-[var(--bg-card)] p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-pixel text-sm text-[var(--accent)]">Edit Project</span>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-xs font-pixel border border-red-500/50 text-red-400 hover:bg-red-500/10 transition"
        >
          Delete
        </button>
      </div>

      {/* Image URL */}
      <div>
        <label className={labelClass}>Image URL</label>
        <input
          type="text"
          value={project.image}
          onChange={(e) => onChange({ ...project, image: e.target.value })}
          placeholder="https://..."
          className={inputClass}
        />
        {project.image && (
          <div className="mt-2 relative w-full aspect-video bg-[var(--bg-surface)] overflow-hidden border border-[var(--border-solid)]">
            <Image
              src={project.image}
              alt="preview"
              fill
              className="object-cover"
              sizes="600px"
            />
          </div>
        )}
      </div>

      {/* Title */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Title (KO)</label>
          <input
            type="text"
            value={project.title.ko}
            onChange={(e) => onChange({ ...project, title: { ...project.title, ko: e.target.value } })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Title (EN)</label>
          <input
            type="text"
            value={project.title.en}
            onChange={(e) => onChange({ ...project, title: { ...project.title, en: e.target.value } })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Period */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Period (KO)</label>
          <input
            type="text"
            value={project.period.ko}
            onChange={(e) => onChange({ ...project, period: { ...project.period, ko: e.target.value } })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Period (EN)</label>
          <input
            type="text"
            value={project.period.en}
            onChange={(e) => onChange({ ...project, period: { ...project.period, en: e.target.value } })}
            className={inputClass}
          />
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Description (KO)</label>
          <textarea
            value={project.description.ko}
            onChange={(e) => onChange({ ...project, description: { ...project.description, ko: e.target.value } })}
            rows={3}
            className={inputClass + ' resize-y'}
          />
        </div>
        <div>
          <label className={labelClass}>Description (EN)</label>
          <textarea
            value={project.description.en}
            onChange={(e) => onChange({ ...project, description: { ...project.description, en: e.target.value } })}
            rows={3}
            className={inputClass + ' resize-y'}
          />
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <label className={labelClass}>Tech Stack</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--bg-surface)] border border-[var(--border-solid)] font-pixel text-xs text-[var(--text-sub)]"
            >
              {tech}
              <button
                onClick={() =>
                  onChange({ ...project, techStack: project.techStack.filter((_, j) => j !== i) })
                }
                className="text-red-400 hover:text-red-300 ml-1"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newTech.trim()) {
                onChange({ ...project, techStack: [...project.techStack, newTech.trim()] })
                setNewTech('')
              }
            }}
            placeholder="Add tech..."
            className={inputClass + ' flex-1'}
          />
          <button
            onClick={() => {
              if (newTech.trim()) {
                onChange({ ...project, techStack: [...project.techStack, newTech.trim()] })
                setNewTech('')
              }
            }}
            className="px-3 py-1 text-xs font-pixel border border-[var(--border-solid)] text-[var(--accent)] hover:bg-[var(--accent-soft)] transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Links */}
      <div>
        <label className={labelClass}>Links</label>
        <div className="space-y-2 mb-2">
          {project.links.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-body text-sm text-[var(--text-sub)] flex-1 truncate">
                {link.label}: {link.url}
              </span>
              <button
                onClick={() =>
                  onChange({ ...project, links: project.links.filter((_, j) => j !== i) })
                }
                className="text-red-400 hover:text-red-300 text-xs"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newLinkLabel}
            onChange={(e) => setNewLinkLabel(e.target.value)}
            placeholder="Label"
            className={inputClass + ' w-1/3'}
          />
          <input
            type="text"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            placeholder="https://..."
            className={inputClass + ' flex-1'}
          />
          <button
            onClick={() => {
              if (newLinkLabel.trim() && newLinkUrl.trim()) {
                onChange({
                  ...project,
                  links: [...project.links, { label: newLinkLabel.trim(), url: newLinkUrl.trim() }],
                })
                setNewLinkLabel('')
                setNewLinkUrl('')
              }
            }}
            className="px-3 py-1 text-xs font-pixel border border-[var(--border-solid)] text-[var(--accent)] hover:bg-[var(--accent-soft)] transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Password Modal (follows EditToolbar pattern) ── */
function PasswordModal({
  onAuth,
  onCancel,
}: {
  onAuth: () => void
  onCancel: () => void
}) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = () => {
    setError('')
    startTransition(async () => {
      const result = await verifyPassword(password)
      if (result.success) {
        setPassword('')
        onAuth()
      } else {
        setError(result.error ?? '비밀번호가 틀렸습니다.')
      }
    })
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={() => { onCancel(); setPassword(''); setError('') }}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg-surface)] border-2 border-[var(--border-solid)] p-6 w-80">
        <h3 className="text-sm font-pixel text-[var(--accent)] mb-3 uppercase tracking-wider">Password</h3>
        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter password"
          className="w-full border border-[var(--border-solid)] px-3 py-2 text-sm text-[var(--text)] bg-[var(--bg-elevated)] focus:outline-none focus:border-[var(--accent)] mb-3 placeholder:text-[var(--text-muted)] font-body"
        />
        {error && <p className="text-red-400 text-xs mb-3 font-body">{error}</p>}
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => { onCancel(); setPassword(''); setError('') }}
            className="px-3 py-1.5 text-xs font-pixel border border-[var(--border-solid)] text-[var(--text-sub)] hover:bg-[var(--bg-elevated)] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending || !password}
            className="px-3 py-1.5 text-xs font-pixel bg-[var(--accent)] text-white transition disabled:opacity-30 hover:bg-[var(--accent-hover)]"
          >
            {isPending ? '...' : 'Confirm'}
          </button>
        </div>
      </div>
    </>
  )
}

/* ── Main Component ── */
export default function ProjectExperience({ lang, projects: initialProjects }: Props) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects)
  const [drafts, setDrafts] = useState<ProjectItem[]>(initialProjects)
  const [isPending, startTransition] = useTransition()

  // Sync with server data when props change
  useEffect(() => {
    setProjects(initialProjects)
    if (!isEditing) setDrafts(initialProjects)
  }, [initialProjects, isEditing])

  const handleAuth = () => {
    setShowPassword(false)
    setDrafts([...projects])
    setIsEditing(true)
  }

  const handleCancel = () => {
    setDrafts([...projects])
    setIsEditing(false)
  }

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveProjects(drafts)
      if (result.success) {
        setProjects([...drafts])
        setIsEditing(false)
        router.refresh()
      } else {
        alert(result.error)
      }
    })
  }

  const updateProject = (index: number, updated: ProjectItem) => {
    setDrafts((prev) => prev.map((p, i) => (i === index ? updated : p)))
  }

  const deleteProject = (index: number) => {
    setDrafts((prev) => prev.filter((_, i) => i !== index))
  }

  const addProject = () => {
    const newProject: ProjectItem = {
      id: `project-${Date.now()}`,
      title: { ko: '', en: '', ja: '', zh: '' },
      period: { ko: '', en: '', ja: '', zh: '' },
      description: { ko: '', en: '', ja: '', zh: '' },
      techStack: [],
      image: '',
      links: [],
    }
    setDrafts((prev) => [...prev, newProject])
  }

  const displayProjects = isEditing ? drafts : projects

  return (
    <div>
      {/* Edit / Save / Cancel buttons */}
      <div className="flex justify-end mb-4">
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="px-4 py-2 text-xs font-pixel border border-[var(--border-solid)] text-[var(--text-sub)] hover:bg-[var(--bg-elevated)] transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isPending}
              className="px-4 py-2 text-xs font-pixel bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowPassword(true)}
            className="px-3 py-1 text-xs font-pixel border border-[var(--border-solid)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
          >
            Edit
          </button>
        )}
      </div>

      {/* Password Modal */}
      {showPassword && (
        <PasswordModal onAuth={handleAuth} onCancel={() => setShowPassword(false)} />
      )}

      {/* Saving overlay */}
      {isPending && (
        <div className="fixed inset-0 z-50 bg-[var(--bg)]/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-[var(--bg-surface)] border-2 border-[var(--border-solid)] px-6 py-4 text-sm text-[var(--text-sub)] font-pixel">
            Saving...
          </div>
        </div>
      )}

      {/* Project Cards */}
      <div className="space-y-6">
        {displayProjects.map((project, index) =>
          isEditing ? (
            <ProjectEditCard
              key={project.id}
              project={project}
              lang={lang}
              onChange={(updated) => updateProject(index, updated)}
              onDelete={() => deleteProject(index)}
            />
          ) : (
            <ProjectCard key={project.id} project={project} lang={lang} />
          ),
        )}
      </div>

      {/* Add Project button */}
      {isEditing && (
        <button
          onClick={addProject}
          className="mt-4 w-full py-3 border-2 border-dashed border-[var(--border-solid)] text-[var(--text-muted)] font-pixel text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
        >
          + Add Project
        </button>
      )}
    </div>
  )
}
