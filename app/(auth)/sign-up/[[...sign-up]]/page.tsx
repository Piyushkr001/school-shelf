import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'


export default function Page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-blue-200 via-white to-green-400  dark:from-gray-700 dark:via-gray-300 dark:to-gray-800'>
      <div>
        <div className='flex flex-col items-center justify-center space-y-4 mt-20'>
          <h2 className='text-xl md:text-4xl font-bold text-center'>Welcome To {' '} <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-300 to-emerald-700'>SchoolShelf</span></h2>
          <p className='text-sm text-gray-500 text-center'>Continue to sign in to access your account.</p>
        </div>
        <Image src="/Images/SignUp.webp" width={700} height={1000} alt='SignIn' className='w-full'/>
      </div>
      <div className='flex justify-center items-center h-screen order-first md:order-last'>
        <SignUp />
      </div>
    </div>
  )
}