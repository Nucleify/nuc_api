import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import * as nucleify from 'nucleify'

describe('apiRequest', () => {
  beforeEach(() => vi.clearAllMocks())

  it('calls $fetch with all HTTP methods and returns response', async () => {
    for (const method of nucleify.httpMethods) {
      nucleify.mockGlobalFetch(vi, { ok: method })
      const res = await nucleify.apiRequest('/api/test', method, { a: 1 })
      expect(
        (globalThis as unknown as { $fetch: Mock }).$fetch
      ).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({ method, body: { a: 1 } })
      )
      expect(res).toEqual({ ok: method })
    }
  })

  it('calls $fetch with id in url', async () => {
    nucleify.mockGlobalFetch(vi, { id: 2 })
    await nucleify.apiRequest('/api/test', 'GET', null, 2)
    expect(
      (globalThis as unknown as { $fetch: Mock }).$fetch
    ).toHaveBeenCalledWith('/api/test/2', expect.anything())
  })
})
