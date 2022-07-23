import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'
import Spinner from './Spinner'

interface AuthProps {}

const Auth: React.FC<AuthProps> = () => {
  const { data, status } = useSession()

  return (
    <div className="py-2 px-6 flex text-sm border border-neutral-700 rounded cursor-pointer">
      {status === 'authenticated' ? (
        <div>{data && data.user?.name}</div>
      ) : status === 'unauthenticated' ? (
        <div onClick={() => signIn('github')}>Login with Github</div>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Auth
