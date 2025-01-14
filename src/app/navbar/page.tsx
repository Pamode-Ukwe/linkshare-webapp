"use client"
import Image from 'next/image'
import Logo from "@/lincons/Logo.png"
import { Link2, User } from 'lucide-react'
import Link from 'next/link'
import { useNavStore } from '../store'
import SetUpPage from '../setuppage/page'
import ProfilePage from '../profilepage/page'

const Page = () => {  
  const {top, switchTop} = useNavStore()
  return (
    <div className='bg-milk'>
      <div className='flex justify-between bg-white px-6 py-3 text-dark-grey items-center m-6 rounded-md'>
        <div className='mx-3 hover:cursor-pointer'>
          <Link href={'/'}><Image src={Logo} alt='LOGO' className='mx-auto my-3'/></Link>
        </div>
        <div className='flex gap-6'>
          <div onClick={() => switchTop(true)} className={`flex hover:cursor-pointer md:gap-2 gap-1 py-3 px-6 rounded-md ${top && 'text-dark-blue bg-light-purple'}`}>
            <Link2 className='size-5'/><span className='hidden md:flex'>Links</span></div>
          <div onClick={() => switchTop(false)} className={`flex mx-2 hover:cursor-pointer md:gap-2 gap-1 py-3 px-6 rounded-md ${!top && 'text-dark-blue bg-light-purple'}`}>
            <User className='size-5'/><span className='hidden md:flex'>Profile Details</span></div>
        </div>
        <div>
          <Link href={'newlink'}><button className='p-2 border border-dark-blue text-dark-blue rounded-md hover:bg-light-purple'>Preview</button></Link>
        </div>
      </div>
      {top ? <SetUpPage/> : <ProfilePage/>}
    </div>
  )
}

export default Page
