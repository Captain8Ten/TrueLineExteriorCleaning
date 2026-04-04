/**
 * Standalone Worker for contact form → Email Routing (NOTIFY binding works in wrangler.toml).
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

function parseAllowedOrigins(env) {
  const raw = (env.ALLOWED_ORIGIN || '').trim()
  if (!raw) return []
  return raw.split(',').map((s) => s.trim()).filter(Boolean)
}

function corsForRequest(request, env) {
  const origin = request.headers.get('Origin')
  const allowed = parseAllowedOrigins(env)
  let allowOrigin = '*'
  if (allowed.length > 0) {
    if (origin && allowed.includes(origin)) {
      allowOrigin = origin
    } else if (origin) {
      return null
    } else {
      allowOrigin = allowed[0]
    }
  }
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

export default {
  async fetch(request, env) {
    const cors = corsForRequest(request, env)
    if (request.method === 'OPTIONS') {
      if (cors === null) {
        return new Response(null, { status: 403 })
      }
      return new Response(null, { status: 204, headers: cors })
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, cors)
    }

    if (cors === null) {
      return json({ error: 'Origin not allowed' }, 403, null)
    }

    const ct = request.headers.get('Content-Type') || ''
    if (!ct.includes('application/json')) {
      return json({ error: 'Use application/json' }, 415, cors)
    }

    const raw = await request.text()
    if (raw.length > 20000) {
      return json({ error: 'Payload too large' }, 413, cors)
    }

    let data
    try {
      data = JSON.parse(raw)
    } catch {
      return json({ error: 'Invalid JSON' }, 400, cors)
    }

    const name = sanitizeLine(data.name, 200).trim()
    const email = sanitizeLine(data.email, 320).trim()
    const phone = sanitizeLine(data.phone, 80).trim()
    const service = sanitizeLine(data.service, 120).trim()
    const message = sanitizeLine(data.message, 8000).trim()

    if (!name || !email) {
      return json({ error: 'Name and email are required' }, 400, cors)
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email address' }, 400, cors)
    }

    const fromAddr = (env.CONTACT_FROM || '').trim()
    const toAddr = (env.CONTACT_TO || '').trim()

    if (!fromAddr || !toAddr) {
      return json({ error: 'Server email is not configured' }, 500, cors)
    }

    if (!env.NOTIFY) {
      return json(
        {
          error:
            'NOTIFY binding missing on this Worker. Redeploy email-worker with wrangler.toml send_email.',
        },
        500,
        cors
      )
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
      console.error('cloudflare:email', e)
      return json({ error: 'Email module unavailable in this environment' }, 503, cors)
    }

    const emailMessage = new EmailMessage(fromAddr, toAddr, rawMime)

    try {
      await env.NOTIFY.send(emailMessage)
    } catch (e) {
      console.error('send_email failed', e)
      return json(
        {
          error:
            'Could not send. Check Email Routing destinations, CONTACT_FROM/CONTACT_TO in this Worker’s vars, and Workers logs.',
        },
        502,
        cors
      )
    }

    return json({ ok: true }, 200, cors)
  },
}

function json(body, status, cors) {
  const headers = { 'Content-Type': 'application/json' }
  if (cors) {
    Object.assign(headers, cors)
  }
  return new Response(JSON.stringify(body), { status, headers })
}
