/**
 * Contact form → Cloudflare Email Routing (send_email binding).
 * Set CONTACT_FROM (your @custom-domain address) and CONTACT_TO (verified destination)
 * in wrangler.toml [vars] or the Pages dashboard.
 */

function sanitizeLine(s, max = 2000) {
  return String(s ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .slice(0, max)
}

function buildPlainEmail({ fromAddr, toAddr, replyTo, subject, text }) {
  const subj = subject.replace(/[\r\n]/g, ' ').slice(0, 200)
  const lines = [
    `From: TrueLine Website <${fromAddr}>`,
    `To: ${toAddr}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subj}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    text,
  ]
  return lines.join('\r\n')
}

export async function onRequestPost(context) {
  const { request, env } = context

  const allowedOrigin = (env.ALLOWED_ORIGIN || '').trim()
  if (allowedOrigin) {
    const origin = request.headers.get('Origin')
    if (origin && origin !== allowedOrigin) {
      return Response.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const ct = request.headers.get('Content-Type') || ''
  if (!ct.includes('application/json')) {
    return Response.json({ error: 'Use application/json' }, { status: 415 })
  }

  const raw = await request.text()
  if (raw.length > 20000) {
    return Response.json({ error: 'Payload too large' }, { status: 413 })
  }

  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = sanitizeLine(data.name, 200).trim()
  const email = sanitizeLine(data.email, 320).trim()
  const phone = sanitizeLine(data.phone, 80).trim()
  const service = sanitizeLine(data.service, 120).trim()
  const message = sanitizeLine(data.message, 8000).trim()

  if (!name || !email) {
    return Response.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const fromAddr = (env.CONTACT_FROM || '').trim()
  const toAddr = (env.CONTACT_TO || '').trim()

  if (!fromAddr || !toAddr) {
    return Response.json({ error: 'Server email is not configured' }, { status: 500 })
  }

  const bodyText = [
    `New quote request from the website contact form`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '(not provided)'}`,
    `Service: ${service || '(not selected)'}`,
    ``,
    `Message:`,
    message || '(none)',
  ].join('\n')

  const subject = service ? `Quote request: ${service} — ${name}` : `Quote request from ${name}`

  const rawMime = buildPlainEmail({
    fromAddr,
    toAddr,
    replyTo: email,
    subject,
    text: bodyText,
  })

  let EmailMessage
  try {
    ;({ EmailMessage } = await import('cloudflare:email'))
  } catch (e) {
    console.error('cloudflare:email unavailable (local dev cannot send)', e)
    return Response.json(
      {
        error:
          'Email sending is only available on Cloudflare. Deploy this project to Pages or use a preview deployment to test.',
      },
      { status: 503 }
    )
  }

  const emailMessage = new EmailMessage(fromAddr, toAddr, rawMime)

  try {
    await env.NOTIFY.send(emailMessage)
  } catch (e) {
    console.error('send_email failed', e)
    return Response.json({ error: 'Could not send message. Try again or call us.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
