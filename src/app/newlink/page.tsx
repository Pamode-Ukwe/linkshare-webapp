"use client"
import Image from "next/image"
import { useDummies, useGeneralStore } from "../store"
import logo from "@/lincons/profile-details.png"
import {Toaster, toast} from 'react-hot-toast'

const page = () => {  
  const {userData} = useDummies()
  const {setCopied} = useGeneralStore()
  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href
      await navigator.clipboard.writeText(currentUrl)
      setCopied(0)
      toast('✔')
    } catch (err) {
      toast('Failed to copy link')
    }
  }
    return (
      <div className="relative h-svh">
        {/* Background */}
        <div className="absolute inset-0 z-10">
          <div>
            {/* Navbar */}
            <div className="md:bg-dark-blue h-96 px-3 py-6 rounded-b-3xl z-30">
              <div className="bg-white py-3 px-4 rounded-lg flex justify-between gap-6">
                <a href='/login'><button className="py-3 px-6 border border-dark-blue text-dark-blue rounded-md hover:bg-light-purple">Back to Editor</button></a>
                <button onClick={handleCopyLink} className="bg-dark-blue text-white hover:bg-purple shadow-md py-3 px-6 rounded-md">Share Link</button>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
        {/* Card */}
        <div className="absolute inset-0 z-20 md:mt-[10%] mt-[20%]">
        <div className='md:w-[40%] ms:w-[50%] w-[100%] mx-auto text-black'>
            <div className="max-h-svh">
              <div className="w-full h-full p-4 mx-auto">
                <div className="grid mx-auto w-[80%] h-full bg-light-purple rounded-3xl shadow-dark-grey md:shadow-sm">
                  <div className='border-2 w-36 h-36 rounded-full mx-auto my-4 bg-white'>
                    <Image src={userData.profile.picture} height={70} width={250} alt='.' className='mx-auto my-auto w-40 h-36 rounded-full'/>
                  </div>
                  <div className='w-[50%] h-8 overflow-hidden bg-white mx-auto border-2 rounded-md mt-2 mb-4 text-center'>{userData.profile.firstName} {userData.profile.lastName}</div>
                  <div className= 'w-[55%] h-8 overflow-hidden bg-white mx-auto border-2 rounded-md mb-8 text-center'>{userData.profile.email}</div>
                  { userData.icons.map((item) => <a href={item.siteLink} key={item.id}><Image src={item.icon.length > 0 ? item.icon : logo} height={35} width={250} alt='ICON' 
                    className='w-auto mx-auto mb-4'/></a>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default page
