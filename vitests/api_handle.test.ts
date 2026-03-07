import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as nucleify from 'nucleify'

describe('apiHandle', () => {
  let onSuccess: ReturnType<typeof vi.fn>,
    setLoading: ReturnType<typeof vi.fn>,
    apiHandle: typeof nucleify.apiHandle,
    apiErrors: ReturnType<typeof vi.fn>

  beforeEach(async () => {
    onSuccess = vi.fn()
    setLoading = vi.fn()
    apiErrors = vi.fn()
    vi.spyOn(nucleify, 'useApiErrors').mockReturnValue({ apiErrors })
    apiHandle = nucleify.apiHandle
  })

  it('calls onSuccess with response data', async () => {
    vi.spyOn(nucleify, 'apiRequest').mockResolvedValueOnce({ data: 'ok' })
    await apiHandle({ url: '/api/test', onSuccess })
    expect(onSuccess).toHaveBeenCalledWith('ok')
  })

  it('calls setLoading true/false', async () => {
    vi.spyOn(nucleify, 'apiRequest').mockResolvedValueOnce({ data: 'ok' })
    await apiHandle({ url: '/api/test', onSuccess, setLoading })
    expect(setLoading).toHaveBeenCalledWith(true)
    expect(setLoading).toHaveBeenCalledWith(false)
  })

  it('calls apiErrors on error', async () => {
    vi.spyOn(nucleify, 'apiRequest').mockRejectedValueOnce(new Error('fail'))
    await apiHandle({ url: '/api/test', onSuccess, setLoading })
    expect(apiErrors).toHaveBeenCalled()
  })
})
