import { useState, type FormEvent } from "react"
import { ArrowUpRight01Icon, CheckmarkCircle01Icon, Copy01Icon } from "hugeicons-react"
import { Magnetic } from "@/components/magnetic"
import { useGsap } from "@/lib/use-gsap"
import { person, projectTypes, budgetRanges } from "@/lib/content"
import { isWeb3FormsConfigured, submitContactForm } from "@/lib/web3forms"

type FormValues = {
  name: string
  email: string
  subject: string
  projectType: string
  budget: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type SubmitStatus = "idle" | "submitting" | "success" | "error"

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  projectType: projectTypes[0],
  budget: budgetRanges[0],
  message: "",
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) {
    errors.name = "Please enter your name."
  } else if (name.length < 2) {
    errors.name = "Your name must be at least 2 characters."
  } else if (name.length > 80) {
    errors.name = "Your name must be 80 characters or fewer."
  }

  if (!email) {
    errors.email = "Please enter your email address."
  } else if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address."
  } else if (email.length > 254) {
    errors.email = "That email address is too long."
  }

  if (!subject) {
    errors.subject = "Please add a subject."
  } else if (subject.length < 3) {
    errors.subject = "Your subject must be at least 3 characters."
  } else if (subject.length > 120) {
    errors.subject = "Your subject must be 120 characters or fewer."
  }

  if (!message) {
    errors.message = "Please tell me a little about your project."
  } else if (message.length < 20) {
    errors.message = "Please add at least 20 characters about your project."
  } else if (message.length > 5000) {
    errors.message = "Project details must be 5,000 characters or fewer."
  }

  return errors
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const ref = useGsap<HTMLDivElement>(({ gsap, reduced }) => {
    if (reduced) return
    gsap.from(".contact-reveal", {
      y: 28,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: ".contact-reveal", start: "top 80%" },
    })
  })

  async function copyEmail() {
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable")
      await navigator.clipboard.writeText(person.email)
    } catch {
      const field = document.createElement("textarea")
      field.value = person.email
      field.setAttribute("readonly", "")
      field.style.position = "fixed"
      field.style.opacity = "0"
      document.body.appendChild(field)
      field.select()
      document.execCommand("copy")
      field.remove()
    }
  }

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
    if (status === "success" || status === "error") {
      setStatus("idle")
      setStatusMessage("")
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "submitting") return

    const form = event.currentTarget
    const honeypot = new FormData(form).get("botcheck")

    if (typeof honeypot === "string" && honeypot.length > 0) {
      setStatus("success")
      setStatusMessage("Thanks for reaching out. I'll get back to you soon.")
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      document.getElementById(firstError)?.focus()
      setStatus("idle")
      setStatusMessage("")
      return
    }

    if (!isWeb3FormsConfigured) {
      setStatus("error")
      setStatusMessage(
        "The contact form is not configured yet. Add your Web3Forms access key to .env.local and restart the dev server."
      )
      return
    }

    setStatus("submitting")
    setStatusMessage("")

    try {
      await submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        projectType: values.projectType,
        budget: values.budget,
        message: values.message.trim(),
        botcheck: typeof honeypot === "string" ? honeypot : null,
      })
      setStatus("success")
      setStatusMessage(
        "Thanks for reaching out. Your enquiry has been sent — I'll get back to you soon."
      )
      setValues(initialValues)
      setErrors({})
    } catch (error) {
      setStatus("error")
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again or email me directly."
      )
    }
  }

  return (
    <section id="contact" className="contact-stage relative scroll-mt-8 border-t border-border px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="mb-14 flex items-center gap-3 sm:mb-20">
        <span className="size-1.5 rounded-full bg-ember" aria-hidden />
        <span className="eyebrow text-muted-foreground">Contact</span>
      </div>
      <div ref={ref} className="contact-inner grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        {/* LEFT — invitation */}
        <div className="contact-reveal flex flex-col justify-between">
          <div>
            <h2 className="display max-w-2xl text-[clamp(2.25rem,5vw,4rem)] text-foreground">
              Let's build something <span className="text-ember">reliable.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Have a website, web app, or full stack project in mind? Let's talk.
            </p>
          </div>

          {/* email with copy interaction */}
          <div className="mt-10">
            <p className="eyebrow mb-3 text-muted-foreground">Email</p>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="group inline-flex max-w-full items-center gap-3 text-left"
            >
              <span className="display break-all text-xl text-foreground transition-colors duration-300 group-hover:text-ember sm:text-2xl">
                {person.email}
              </span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover:border-ember group-hover:text-ember">
                {copied ? (
                  <CheckmarkCircle01Icon className="size-4 text-ember" />
                ) : (
                  <Copy01Icon className="size-4" />
                )}
              </span>
            </button>
            {copied && (
              <p className="mt-2 font-mono text-[0.66rem] uppercase tracking-wide text-ember">
                Copied to clipboard
              </p>
            )}
          </div>

          {/* phone */}
          <div className="mt-8">
            <p className="eyebrow mb-3 text-muted-foreground">Phone</p>
            <a
              href={`tel:${person.phone}`}
              className="display text-xl text-foreground transition-colors duration-300 hover:text-ember sm:text-2xl"
            >
              {person.phone}
            </a>
          </div>

          {/* meta grid */}
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border sm:grid-cols-2">
            <div className="bg-card p-5">
              <dt className="eyebrow mb-1.5 text-muted-foreground">Location</dt>
              <dd className="text-sm text-foreground">{person.location}</dd>
            </div>
            <div className="bg-card p-5">
              <dt className="eyebrow mb-1.5 text-muted-foreground">Status</dt>
              <dd className="flex items-center gap-2 text-sm text-foreground">
                <span className="status-dot" aria-hidden /> {person.status}
              </dd>
            </div>
          </dl>

          {/* socials */}
          <div className="mt-8">
            <p className="eyebrow mb-3 text-muted-foreground">Elsewhere</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={person.social.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost-line"
              >
                GitHub <ArrowUpRight01Icon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <form
          noValidate
          className="contact-reveal surface space-y-5 p-6 sm:p-8 lg:p-10"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <Field
              id="name"
              label="Name"
              placeholder="Your name"
              autoComplete="name"
              maxLength={80}
              value={values.name}
              onChange={(value) => updateField("name", value)}
              error={errors.name}
              required
            />
            <Field
              id="email"
              label="Email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              maxLength={254}
              value={values.email}
              onChange={(value) => updateField("email", value)}
              error={errors.email}
              required
            />
          </div>

          <Field
            id="subject"
            label="Subject"
            placeholder="Project enquiry"
            maxLength={120}
            value={values.subject}
            onChange={(value) => updateField("subject", value)}
            error={errors.subject}
            required
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <SelectField
              id="projectType"
              label="Project type"
              value={values.projectType}
              onChange={(value) => updateField("projectType", value)}
              options={projectTypes}
            />
            <SelectField
              id="budget"
              label="Budget"
              value={values.budget}
              onChange={(value) => updateField("budget", value)}
              options={budgetRanges}
            />
          </div>

          <TextareaField
            id="message"
            label="Project details"
            rows={5}
            maxLength={5000}
            placeholder="A few lines about what you're building…"
            value={values.message}
            onChange={(value) => updateField("message", value)}
            error={errors.message}
            required
          />

          <div className="hidden" aria-hidden="true">
            <label htmlFor="botcheck">Leave this field empty</label>
            <input id="botcheck" name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />
          </div>

          <div aria-live="polite" aria-atomic="true">
            {status === "success" && statusMessage && (
              <div
                role="status"
                className="rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-sm leading-relaxed text-foreground"
              >
                <div className="flex items-start gap-2.5">
                  <CheckmarkCircle01Icon className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden />
                  <p>{statusMessage}</p>
                </div>
              </div>
            )}
            {status === "error" && statusMessage && (
              <div
                role="alert"
                className="rounded-lg border border-ember/50 bg-ember/10 px-4 py-3 text-sm leading-relaxed text-foreground"
              >
                {statusMessage}
              </div>
            )}
          </div>

          <Magnetic strength={5}>
            <button
              type="submit"
              className="btn-ember w-full disabled:pointer-events-none disabled:opacity-70"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
            >
              {status === "submitting" ? (
                <>
                  <span
                    className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    aria-hidden
                  />
                  Sending…
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowUpRight01Icon className="size-4" />
                </>
              )}
            </button>
          </Magnetic>
        </form>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  maxLength,
  value,
  onChange,
  error,
  required,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
  maxLength?: number
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ember aria-invalid:border-ember"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.72rem] leading-relaxed text-ember">
          {error}
        </p>
      )}
    </div>
  )
}

function TextareaField({
  id,
  label,
  rows,
  maxLength,
  placeholder,
  value,
  onChange,
  error,
  required,
}: {
  id: string
  label: string
  rows?: number
  maxLength?: number
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-muted-foreground">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        maxLength={maxLength}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ember aria-invalid:border-ember"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.72rem] leading-relaxed text-ember">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 block text-muted-foreground">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ember"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
