import type { NextPage } from 'next'
import React from 'react'
import Card from '../../components/Card'
import Page from '../../layouts/Page'
import { useRouter } from 'next/router'

interface LearnProps {}

const Learn: NextPage<LearnProps> = () => {
  const { push } = useRouter()

  return (
    <Page title="Learn">
      <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-6">
        <div className="col-span-1 row-span-1 border border-red-900 rounded">
          <Card
            title="Flashcards"
            text="Get familiar with the words and their meanings"
            action={() => push('/learn/flashcards')}
          />
        </div>
        <div className="col-span-1 row-span-1 border border-blue-900 rounded">
          <Card
            title="Coming soon"
            text=""
            action={() => push('/learn/flashcards')}
          />
        </div>
        <div className="col-span-2 row-span-1 border border-green-900 rounded">
          <Card
            title="Coming soon"
            text=""
            action={() => push('/learn/flashcards')}
          />
        </div>
      </div>
    </Page>
  )
}

export default Learn
