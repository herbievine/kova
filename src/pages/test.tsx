import type { NextPage } from 'next'
import type React from 'react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { wordModel } from '../utils/schema'
import { trpc } from '../utils/trpc'

interface testProps {}

const Test: NextPage<testProps> = () => {
  const p = useQuery('word', async () => {
    const apiData = await (
      await fetch('http://localhost:3000/temp.json')
    ).json()

    const purifiedData = wordModel.parse(apiData)

    const data = purifiedData.words.map(({ id, ...rest }) => ({
      ...rest
    }))

    return data
  })
  const { mutate } = trpc.useMutation('test.save')

  return (
    <div className="">
      <button onClick={() => mutate(p.data)}>do it</button>
      {p.data && <p>{JSON.stringify(p.data)}</p>}
    </div>
  )
}

export default Test
