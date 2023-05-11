import { useState, useEffect } from 'react'
import { QueryStatus, getAuthorList } from '@api/index'

export function useAuthors() {
  const [status, setStatus] = useState<QueryStatus>('idle')
  const [data, setData] = useState<Author[] | null>(null)

  useEffect(
    () => {
      setStatus('loading')
      getAuthorList({ limit: 10 })
        .then((returnedData) => {
          setData(returnedData)
          setStatus('success')
        })
        .catch(() => setStatus('error'))
    },
    [
      // Run effect once
    ]
  )

  return {
    status,
    data,
  }
}
