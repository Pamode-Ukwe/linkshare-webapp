"use client"
import { Josefin_Sans } from 'next/font/google'
import Image from 'next/image'
import Logo from "@/lincons/Logo.png"
import { Lock, Mail, ScanEye,  } from 'lucide-react'
import Link from 'next/link'
import { useLoginStore } from '../loginValidation'
import {Toaster, toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const josefin =  Josefin_Sans({ weight: ['300', '400', '600'], subsets: ['latin']})

const Page = () => {
  const { formData, errors, setFormData, setFormType, validateFields, resetFormData } = useLoginStore()
  const router  = useRouter()

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault()
    if ( validateFields() ) {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      router.push('/login')
    } else if (res.status === 400) {
      toast('User already exist')
    } else if (res.status === 500) {
      toast('Something went wrong')
    }
    toast('User created')
    resetFormData()    
  } else {
    toast('Please check that your input meets the conditions')
    e.preventDefault()
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
          <div className='my-8'>
            <p className='text-2xl font-bold my-3'>Create account</p>
            <p className='text-dark-grey text-sm my-3'>Let&apos;s get you started sharing your links!</p>
          </div>
          <form  onSubmit ={handleSubmit}>
          <div className='items-center my-4 relative'>
              <p className='text-xs my-3'>Email address</p>
              <div className='relative w-full max-w-sm'>
                <label htmlFor='email' className='absolute inset-y-0 left-3 flex items-center'><Mail className='size-4 text-dark-grey'/></label>
                <input type="email" placeholder='e.g alex@gmail.com' value={formData.email} onChange={(e) => setFormData('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border border-dark-grey rounded-md shadow-sm focus:outline-purple focus:shadow-md text-base ${errors.email && 'border-rose-300'}`}/>
              </div>
              {errors.email && <p className={`text-rose-300 text-xs h-4 italic my-1`}>{errors.email}</p>}
            </div>
            {/* Create Password */}
            <div className='items-center my-4 relative'>
              <p className='text-xs my-3'>Password</p>
              <div className='relative w-full max-w-sm'>
                <label htmlFor='password' className='absolute inset-y-0 left-3 flex items-center'><Lock className='size-4 text-dark-grey'/></label>
                <input  type='password' placeholder='Enter your password' value={formData.password} onChange={(e) => setFormData('password', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border border-dark-grey rounded-md shadow-sm focus:outline-purple focus:shadow-md text-base ${errors.email && 'border-rose-300'}`}/>
              </div>
              {errors.password && <p className={`text-rose-300 text-xs h-4 italic my-1`}>{errors.password}</p>}
            </div>
            <div className='items-center my-4 relative'>
              <p className='text-xs my-3'>Confirm password</p>
              <div className='relative w-full max-w-sm'>
                <label htmlFor='confirmPassword' className='absolute inset-y-0 left-3 flex items-center'><ScanEye className='size-4 text-dark-grey'/></label>
                <input  type='password' placeholder='Passwords must match' value={formData.confirmPassword} onChange={(e) => setFormData('confirmPassword', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border border-dark-grey rounded-md shadow-sm focus:outline-purple focus:shadow-md text-base ${errors.email && 'border-rose-300'}`}/>
              </div>
              {errors.confirmPassword && <p className={`text-rose-300 text-xs h-4 italic my-1`}>{errors.confirmPassword}</p>}
            </div>
            <button type='submit'
            className='bg-dark-blue w-full p-3 rounded-lg text-light-purple my-3 hover:bg-purple'>Create account</button>
          </form>  
          <p onClick={() => setFormType('login')} className='text-center'>Already have an account? <Link href={`/`} className='text-dark-blue'>Login</Link></p>              
          </div>
      </div>
    </div>    
  )
}

export default Page
