import { useCallback, useState } from 'react'

export const useHttp = () => {
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState(false)

  const request = useCallback(
    async (url: string,
      method: string = 'get',
      headers: {} = {},
      body: string | null = null
    ) => {
      try {
        setLoading(true)
        if (body) {
          body = JSON.stringify(body)
        }
        headers = {
          ...headers, 'Content-type': 'application/json; charset=UTF-8'
        }
        console.log('headers', url, headers, method, body)
        const res = await fetch(url, { method, body, headers })
        const data = await res.json()

        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        setErrors('Запрос не выполнен, повторите позже')
      }
    },
    []
  )

  const clearErrors = useCallback(() => {
    setErrors('')
  }, [])

  return { errors, loading, request, clearErrors }
}
