import { WhatsappIcon } from "hugeicons-react"

import { person } from "@/lib/content"

export function WhatsAppButton() {
  return (
    <a
      href={person.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${person.name} on WhatsApp (opens in a new tab)`}
      title="Chat on WhatsApp"
      className="group fixed bottom-24 right-4 z-40 inline-flex size-14 items-center justify-center rounded-full border border-white/25 bg-[#25D366] text-white shadow-[0_14px_35px_-12px_rgba(37,211,102,0.75)] transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-[0_18px_40px_-12px_rgba(37,211,102,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:bottom-6 sm:right-6 sm:size-16"
    >
      <WhatsappIcon className="size-7 sm:size-8" aria-hidden />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  )
}
