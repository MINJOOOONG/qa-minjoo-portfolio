'use client'

export default function Education({ d }: { d: (key: string) => any }) {
  return (
    <div className="py-1">
      <a
        href="https://www.hufs.ac.kr"
        target="_blank"
        rel="noreferrer"
        className="text-lg font-semibold tracking-tight text-[var(--text)] hover:text-[var(--accent)] transition"
      >
        {d('한국외국어대학교')}
      </a>
      <p className="text-sm text-[var(--text-sub)] mt-1">
        {d('학력_학위')}
        <span className="mx-2 text-[var(--text-muted)]">&middot;</span>
        {d('학력_비고')}
      </p>
      <p className="text-xs text-[var(--text-muted)] tracking-wider mt-1">{d('학력_기간')}</p>
    </div>
  )
}
