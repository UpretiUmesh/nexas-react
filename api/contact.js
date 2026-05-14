const toEmail = process.env.CONTACT_TO_EMAIL || 'contact@codevora.in'
const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Codevora Website <onboarding@resend.dev>'

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function clean(value) {
  return String(value || '').trim()
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return jsonResponse({ success: false, message: 'Email service is not configured.' }, 500)
  }

  let data
  try {
    data = await request.json()
  } catch {
    return jsonResponse({ success: false, message: 'Invalid request body.' }, 400)
  }

  const name = clean(data.name)
  const email = clean(data.email)
  const company = clean(data.company)
  const budget = clean(data.budget)
  const service = clean(data.service)
  const message = clean(data.message)

  if (!name || !email || !message) {
    return jsonResponse({ success: false, message: 'Name, email, and message are required.' }, 422)
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ success: false, message: 'Please enter a valid email address.' }, 422)
  }

  const text = [
    'New contact form submission',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || 'Not provided'}`,
    `Budget: ${budget || 'Not provided'}`,
    `Service: ${service || 'Not provided'}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New website inquiry from ${name}`,
      text,
    }),
  })

  if (!resendResponse.ok) {
    return jsonResponse({ success: false, message: 'Unable to send your message right now.' }, 500)
  }

  return jsonResponse({ success: true, message: 'Message sent successfully.' })
}
