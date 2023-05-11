import { useEffect, useState } from 'react'
import { Layout } from '@components/Layout'
import { getPlantList } from '@api'

export default function Home() {
  const [data, setData] = useState<Plant[]>([])
  useEffect(() => {
    getPlantList({ limit: 10 }).then((response) => setData(response))
  }, [])

  return (
    <Layout>
      <p>Hola</p>
    </Layout>
  )
}
