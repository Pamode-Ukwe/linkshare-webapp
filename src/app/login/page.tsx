"use client"
import { Josefin_Sans } from 'next/font/google'
import Image from 'next/image'
import Logo from "@/lincons/Logo.png"
import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { useLoginStore } from '../loginValidation'
import {Toaster, toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { signIn }from 'next-auth/react'
import { useEffect, useState } from 'react'

const josefin =  Josefin_Sans({ weight: ['300', '400', '600'], subsets: ['latin'] })

export default function Home() {
  const { formData, errors, setFormData, setFormType, validateFields, resetFormData } = useLoginStore()
  const [reload, setReload] = useState<number[]>([])
  const router  = useRouter()

  const handleSubmit = async( e: React.FormEvent ) => {
    e.preventDefault()
    const {email, password} = formData
      if ( validateFields() ) {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (res?.ok) {
        resetFormData()
        router.push('/navbar')
      } else if (res?.status === 401) {
        toast('Invalid input')
      }
    } else {
      if (reload.length < 1) {
        window.location.reload()
      } else {
        setReload([])
        toast('Something went wrong. Please refresh your browser and try again')
      }
    }    
  }

  return (
    <div className={`${josefin.className} h-screen w-screen grid bg-milk`}>
      <div className='mx-auto my-auto w-1/3'>
        {/* Logo */}
        <div>
          <Image src={Logo} alt='LOGO' className='mx-auto my-3'/>
        </div>
        {/* Form */}
        <div className='bg-white m-3 p-6 rounded-md shadow-sm shadow-dark-grey'>
          <div className='my-6'>
            <p className='text-2xl font-bold my-3'>Login</p>
            <p className='text-dark-grey text-sm my-3'>Add your details below to get back into the app</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='items-center my-4 relative'>
              <p className='text-xs my-3'>Email address</p>
              <div className='relative w-full max-w-sm'>
                <label htmlFor='email' className='absolute inset-y-0 left-3 flex items-center'><Mail className='size-4 text-dark-grey'/></label>
                <input type="email" placeholder='e.g alex@gmail.com' value={formData.email} onChange={(e) => setFormData('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border border-dark-grey rounded-md shadow-sm focus:outline-purple focus:shadow-md text-base ${errors.email && 'border-rose-300'}`}/>
              </div>
              {errors.email && <p className={`text-rose-300 text-xs h-4 italic my-1`}>{errors.email}</p>}
            </div>
            <div className='items-center my-4 relative'>
              <p className='text-xs my-3'>Password</p>
              <div className='relative w-full max-w-sm'>
                <label htmlFor='password' className='absolute inset-y-0 left-3 flex items-center'><Lock className='size-4 text-dark-grey'/></label>
                <input type='password' placeholder='Enter your password' value={formData.password} onChange={(e) => setFormData('password', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border border-dark-grey rounded-md shadow-sm focus:outline-purple focus:shadow-md text-base ${errors.email && 'border-rose-300'}`}/>
              </div>
              {errors.password && <p className={`text-rose-300 text-xs h-4 italic my-1`}>{errors.password}</p>}
            </div>
            <button type='submit' className='bg-dark-blue w-full p-3 rounded-lg text-light-purple my-3 hover:bg-purple'>Login</button>
          </form>  
          <p onClick={() => setFormType('signup')} className='text-center'>Don&apos;t have an account? <Link href={`/signup`} className='text-dark-blue'>Create account</Link></p>              
          </div>
      </div>
    </div>    
  )
}
