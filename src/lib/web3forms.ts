export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"

const ACCESS_KEY_PLACEHOLDER = "YOUR_WEB3FORMS_ACCESS_KEY"

export const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || ACCESS_KEY_PLACEHOLDER

export const isWeb3FormsConfigured =
  WEB3FORMS_ACCESS_KEY !== ACCESS_KEY_PLACEHOLDER && WEB3FORMS_ACCESS_KEY.length > 0

export type ContactSubmission = {
  name: string
  email: string
  subject: string
  projectType: string
  budget: string
  message: string
  botcheck: string | null
}

type Web3FormsResponse = {
  success: boolean
  message?: string
}

export async function submitContactForm(
  values: ContactSubmission
): Promise<Web3FormsResponse> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: values.subject,
        from_name: values.name,
        name: values.name,
        email: values.email,
        replyto: values.email,
        project_type: values.projectType,
        budget: values.budget,
        message: values.message,
        botcheck: values.botcheck,
      }),
      signal: controller.signal,
    })

    const data = (await response.json().catch(() => null)) as Web3FormsResponse | null

    if (!response.ok || !data?.success) {
      throw new Error(
        data?.message || "Your message could not be sent. Please try again or email me directly."
      )
    }

    return data
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("The request timed out. Please check your connection and try again.")
    }
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}
