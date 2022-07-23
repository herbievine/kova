import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Auth from '../components/Auth'
import Exit from '../assets/Exit'
import Link from 'next/link'

interface PageProps {
  title: string
  children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  const { status } = useSession()

  return (
    <div className="w-full min-h-screen flex font-bold bg-neutral-900 text-neutral-200">
      <div className="flex flex-col justify-between items-center border-r border-neutral-700">
        <div>
          <div className="p-6">
            <Link href="/">K</Link>
          </div>
          <div className="p-6">
            <Link href="/progress">P</Link>
          </div>
        </div>
        {status === 'authenticated' && (
          <div className="p-6 cursor-pointer" onClick={() => signOut()}>
            <Exit width={22} fill="#E5E5E5" />
          </div>
        )}
      </div>
      <div className="w-full h-screen flex flex-col">
        <div className="w-full py-4 px-6 flex justify-between items-center border-b border-neutral-700">
          <h1 className="text-lg">{title}</h1>
          <Auth />
        </div>
        <div className="h-full w-full p-6">{children}</div>
      </div>
    </div>
  )
}

export default Page
