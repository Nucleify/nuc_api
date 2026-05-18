export type ApiHandlerResult =
  | { handled: false }
  | { handled: true; status?: number; body: unknown }

export type GatewayOkContext = {
  ok: (data: unknown, extra?: Record<string, unknown>) => unknown
}

export function apiNotHandled(): ApiHandlerResult {
  return { handled: false }
}

export function apiMethodNotAllowed(): ApiHandlerResult {
  return { handled: true, status: 405, body: { error: 'Method not allowed' } }
}

export function apiDeleted(): ApiHandlerResult {
  return { handled: true, body: { deleted: true } }
}

export function apiError(status: number, message: string): ApiHandlerResult {
  return { handled: true, status, body: { error: message } }
}

export function apiOk(
  ctx: GatewayOkContext,
  data: unknown,
  status?: number
): ApiHandlerResult {
  const result: ApiHandlerResult = { handled: true, body: ctx.ok(data) }
  if (status !== undefined) result.status = status
  return result
}

export function apiBody(body: unknown, status?: number): ApiHandlerResult {
  const result: ApiHandlerResult = { handled: true, body }
  if (status !== undefined) result.status = status
  return result
}

export function fromScopeError(scope: {
  error: string
  status: number
}): ApiHandlerResult {
  return apiError(scope.status, scope.error)
}

export function fromSupabaseError(
  error: { message: string },
  status = 500
): ApiHandlerResult {
  return apiError(status, error.message)
}

export function fromThrown(
  e: unknown,
  status = 500,
  fallback = 'Request failed'
): ApiHandlerResult {
  return apiError(status, e instanceof Error ? e.message : fallback)
}
