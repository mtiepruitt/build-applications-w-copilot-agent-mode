export function extractCollection(payload, preferredKey) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [
    payload[preferredKey],
    payload.results,
    payload.items,
    payload.docs,
    payload.data,
    payload.data?.[preferredKey],
    payload.data?.results,
    payload.data?.items,
    payload.data?.docs,
  ]

  return candidates.find(Array.isArray) ?? []
}

export function formatDate(value) {
  if (!value) {
    return 'Not recorded'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function useLocalApiFallback() {
  return !import.meta.env.VITE_CODESPACE_NAME
}