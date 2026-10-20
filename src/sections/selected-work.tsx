import { ArrowUpRight01Icon, FileDownloadIcon } from "hugeicons-react"
import { projects, type Project } from "@/lib/content"
import { useGsap } from "@/lib/use-gsap"
import { cn } from "@/lib/utils"

export function SelectedWork() {
  const ref = useGsap<HTMLElement>(({ gsap, reduced }) => {
    if (reduced) return

    gsap.utils.toArray<HTMLElement>(".work-block").forEach((block) => {
      const copy = block.querySelectorAll(".work-copy")
      const media = block.querySelectorAll(".work-media")

      gsap.from(copy, {
        y: 28,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: { trigger: block, start: "top 82%" },
      })

      gsap.from(media, {
        clipPath: "inset(0 0 100% 0)",
        scale: 1.035,
        duration: 1,
        ease: "power4.inOut",
        stagger: 0.1,
        scrollTrigger: { trigger: block, start: "top 85%" },
      })
    })
  })

  return (
    <section
      ref={ref}
      id="work"
      className="relative scroll-mt-8 border-t border-border px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
    >
      <header className="mb-12 flex items-center gap-3 sm:mb-16">
        <span className="size-1.5 rounded-full bg-ember" aria-hidden />
        <span className="eyebrow text-muted-foreground">Selected Work</span>
      </header>

      <div className="mx-auto max-w-[92rem] space-y-20 sm:space-y-28">
        {projects.map((project) => (
          <ProjectBlock key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectBlock({ project }: { project: Project }) {
  return (
    <article id={project.id} className="work-block scroll-mt-12 border-t border-border pt-12 sm:pt-16 first:border-t-0 first:pt-0">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,.62fr)_minmax(14rem,.38fr)] lg:items-end lg:gap-16">
        <div className="work-copy">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-ember">{project.index}</span>
            <span className="h-3 w-px bg-border" aria-hidden />
            <span className="eyebrow text-muted-foreground">{project.category}</span>
          </div>
          <h3 className="display mt-5 max-w-[18ch] text-[2rem] leading-[1.02] text-foreground sm:text-[clamp(2.1rem,3vw,3rem)] sm:leading-[0.96]">
            {project.name}
          </h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            {project.built}
          </p>
        </div>

        <div className="work-copy flex flex-col gap-5 lg:items-end lg:text-right">
          <TechList project={project} />
          <ProjectLinks project={project} />
        </div>
      </div>

      <Gallery
        screenshots={project.screenshots}
        name={project.name}
        wideFirst={project.widePreview}
        className="mt-10 sm:mt-12"
      />
    </article>
  )
}

function Gallery({
  screenshots,
  name,
  wideFirst,
  className,
}: {
  screenshots: string[]
  name: string
  wideFirst?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "-mx-5 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:gap-5 sm:px-8 lg:mx-0 lg:px-0 [scrollbar-width:thin]",
        className,
      )}
    >
      {screenshots.map((src, i) => (
        <figure
          key={src}
          className={cn(
            "work-media group relative aspect-[16/9] w-[68vw] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-ember/50 motion-reduce:transform-none motion-reduce:transition-none sm:w-[40vw] lg:w-[28rem] xl:w-[32rem]",
            wideFirst && i === 0 && "w-[86vw] sm:w-[72vw] lg:w-[48rem] xl:w-[58rem]",
          )}
        >
          <img
            src={src}
            alt={`${name} — screenshot ${i + 1}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <figcaption className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-border bg-background/70 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
            {String(i + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.presentation) {
    return <LiveLink url={project.url} label={project.ctaLabel} />
  }

  return (
    <div className="work-copy flex flex-col gap-3 sm:flex-row lg:justify-end">
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="btn-ember group/btn"
      >
        {project.ctaLabel ?? "Visit site"}
        <ArrowUpRight01Icon className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
      </a>
      <a
        href={project.presentation}
        download
        className="btn-ghost-line"
      >
        View Presentation <FileDownloadIcon className="size-4" />
      </a>
    </div>
  )
}

function LiveLink({
  url,
  label = "Live demo",
  className,
}: {
  url: string
  label?: string
  className?: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ember transition-colors duration-300 hover:text-foreground",
        className,
      )}
    >
      {label} <ArrowUpRight01Icon className="size-3.5" />
    </a>
  )
}

function TechList({ project }: { project: Project }) {
  if (project.tech.length === 0) return null

  return (
    <div className="work-copy">
      <p className="eyebrow mb-3 text-muted-foreground">Technology</p>
      <p className="font-mono text-[0.68rem] leading-relaxed uppercase tracking-[0.1em] text-foreground">
        {project.tech.slice(0, 5).join(" / ")}
      </p>
    </div>
  )
}
