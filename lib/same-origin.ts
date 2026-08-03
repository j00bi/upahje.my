export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')

  if (!origin) {
    return true
  }

  let originHost: string
  try {
    originHost = new URL(origin).host
  } catch {
    return false
  }

  // Prefer the request URL host, which is always present and authoritative.
  try {
    if (new URL(request.url).host === originHost) {
      return true
    }
  } catch {
    return false
  }

  // Fall back to the Host header for proxies that rewrite the URL.
  const host = request.headers.get('host')
  if (host) {
    return host === originHost
  }

  const referer = request.headers.get('referer')
  if (referer) {
    try {
      return new URL(referer).host === originHost
    } catch {
      return false
    }
  }

  return false
}

export function previewDataEnabled() {
  return process.env.PREVIEW_DATA_ENABLED === 'true'
}
