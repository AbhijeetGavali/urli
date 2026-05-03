/**
 * Extracts a human-readable error message from any backend error shape.
 *
 * Backend sends one of:
 *   { error: string }
 *   { error: string, details: { fieldErrors: Record<string, string[]>, formErrors: string[] } }
 *
 * RTK Query wraps this as: { status: number, data: { error, details? } }
 * Network failures:        { status: 'FETCH_ERROR', error: string }
 * Parse failures:          { status: 'PARSING_ERROR', error: string }
 */
export function extractError(err: unknown, fallback = 'Something went wrong'): string {
  if (!err || typeof err !== 'object') return fallback

  const e = err as any

  // RTK Query FetchBaseQueryError with backend JSON body
  if (e.data) {
    const { error, details } = e.data
    if (details?.fieldErrors) {
      const first = Object.values(details.fieldErrors as Record<string, string[]>)
        .flat()
        .find(Boolean)
      if (first) return first
    }
    if (error) return error
  }

  // RTK Query network / parse error
  if (e.error) return e.error

  // Plain Error object
  if (e.message) return e.message

  return fallback
}
