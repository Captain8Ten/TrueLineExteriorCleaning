/**
 * Pages Function: forwards POST/OPTIONS to the standalone email Worker.
 * Pages cannot use [[send_email]] in wrangler.toml; the Worker in /email-worker can.
 *
 * Set EMAIL_WORKER_URL to your deployed Worker URL, e.g.
 * https://trueline-contact-email.<your-subdomain>.workers.dev
 * (Pages → Settings → Environment variables, or wrangler.toml [vars])
 */

async function proxyToEmailWorker(request, env) {
  const base = (env.EMAIL_WORKER_URL || '').trim().replace(/\/$/, '')
  if (!base) {
    return Response.json(
      {
        error:
          'EMAIL_WORKER_URL is not set. Deploy email-worker (npm run deploy:email), then set EMAIL_WORKER_URL in Pages → Settings → Variables to your *.workers.dev URL.',
      },
      { status: 500 }
    )
  }

  const url = `${base}/`

  const headers = new Headers()
  const ct = request.headers.get('Content-Type')
  if (ct) headers.set('Content-Type', ct)
  const origin = request.headers.get('Origin')
  if (origin) headers.set('Origin', origin)

  const init = {
    method: request.method,
    headers,
  }
  if (request.method === 'POST') {
    init.body = await request.text()
  }

  const res = await fetch(url, init)
  const text = await res.text()
  const outHeaders = new Headers()
  const outCt = res.headers.get('Content-Type')
  if (outCt) outHeaders.set('Content-Type', outCt)
  const acao = res.headers.get('Access-Control-Allow-Origin')
  if (acao) outHeaders.set('Access-Control-Allow-Origin', acao)
  const acam = res.headers.get('Access-Control-Allow-Methods')
  if (acam) outHeaders.set('Access-Control-Allow-Methods', acam)
  const acah = res.headers.get('Access-Control-Allow-Headers')
  if (acah) outHeaders.set('Access-Control-Allow-Headers', acah)

  return new Response(text, { status: res.status, headers: outHeaders })
}

export async function onRequestPost(context) {
  return proxyToEmailWorker(context.request, context.env)
}

export async function onRequestOptions(context) {
  return proxyToEmailWorker(context.request, context.env)
}
