"use client"
import Image from "next/image"
import MockUp from '../mockup/page'
import uploadIcon from '@/lincons/upload-image.png'
import { useDummies } from "../store"
import { useRef } from "react"
import {Toaster, toast} from 'react-hot-toast'

const page = () => {
  const { userData, setProfileInput, setPicture } = useDummies()
  const inputRef = useRef<HTMLInputElement>(null)
  const handleImageClick = () => {
    if (inputRef) {
      inputRef.current?.click()
    }
  }
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setPicture(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='bg-milk'>
      <div className='grid grid-cols-3 gap-3 rounded-md'>
        {/* Mock Up */}
        <MockUp/>
        {/* Profile Details */}
        <div className='bg-white md:mx-6 mx-auto md:col-span-2 col-span-3 p-6'>
            <p className="font-bold text-3xl">Profile Details</p>
            <p className="text-sm text-dark-grey my-3">Add some details to create a personal touch to your profile</p>
            <div className="grid grid-cols-3 bg-milk p-4 rounded-md text-sm text-dark-grey items-center mb-6">
              <div className="m-6">Profile Picture</div>
              <div className="hover:cursor-pointer bg-light-purple px-6 py-12 rounded-lg relative">
                <Image onClick={handleImageClick} src={uploadIcon} alt='Upload' className='w-auto h-auto mx-auto relative'/>
                <input type="file" ref={inputRef} accept="image/*" onChange={handleImageUpload} className="sr-only" /></div>
              <div className="text-xs m-6">Image must be below 1024 x 1024px. Use jpeg or png format</div>              
            </div>
            {/* Form */}
            <div className="grid text-dark-grey text-sm bg-milk p-6">
              <div className="grid grid-cols-3 my-4">
                <div className="col-span-1">First name*</div>
                <input value={userData.profile.firstName} onChange={(e) => setProfileInput('firstName', e.target.value)} type="text" placeholder="e.g. John" 
                className="p-2 w-full col-span-2 border border-light-grey rounded-md outline-none focus:border-purple"/>
              </div>
              <div className="grid grid-cols-3 mb-4">
                <div className="col-span-1">Last name*</div>
                <input value={userData.profile.lastName} onChange={(e) => setProfileInput('lastName', e.target.value)} type="text" placeholder="e.g. Appleseed" 
                className="p-2 w-full col-span-2 border border-light-grey rounded-md outline-none focus:border-purple"/>
              </div>
              <div className="grid grid-cols-3 mb-4">
                <div className="col-span-1">Email*</div>
                <input value={userData.profile.email} onChange={(e) => setProfileInput('email', e.target.value)} type="text" placeholder="e.g. email@examle.com" 
                className="p-2 w-full col-span-2 border border-light-grey rounded-md outline-none focus:border-purple"/>
              </div>
            </div>
            <div className='border border-light-grey w-full my-6'></div>
            <div className='grid w-full'>
              <button onClick={() => toast('Profile saved!')} className='bg-dark-blue text-white text-xs hover:bg-purple shadow-md py-3 px-6 rounded-md justify-self-end'>Save</button>
              <Toaster />
            </div>
        </div>
      </div>
    </div>
  ) 
}
  
  export default page
