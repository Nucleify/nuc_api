import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as nucleify from 'nucleify'

describe('apiHandle', () => {
  let onSuccess: ReturnType<typeof vi.fn>
  let setLoading: ReturnType<typeof vi.fn>
  let apiHandle: typeof nucleify.apiHandle

  beforeEach(() => {
    onSuccess = vi.fn()
    setLoading = vi.fn()
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
    const error = new Error('fail')
    const apiErrorsSpy = vi
      .spyOn(nucleify, 'apiErrors')
      .mockImplementation((requestError) => {
        throw requestError
      })

    vi.spyOn(nucleify, 'apiRequest').mockRejectedValueOnce(error)

    await expect(
      apiHandle({ url: '/api/test', onSuccess, setLoading })
    ).rejects.toThrow('fail')
    expect(apiErrorsSpy).toHaveBeenCalledWith(error)
  })
})
