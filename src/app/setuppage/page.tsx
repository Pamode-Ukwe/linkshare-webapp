"use client"
import Image from 'next/image'
import MockUp from '../mockup/page'
import starterPic from '@/lincons/Frame 3.png'
import { ArrowDown, Menu } from 'lucide-react'
import { useDropStore, useDummies } from '../store'
import { FaFacebook, FaGithub, FaLinkedin, FaStackOverflow, FaTwitch, FaYoutube } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import gh from '@/lincons/GH.png'
import fb from '@/lincons/FB.png'
import twi from '@/lincons/TWI.png'
import yt from '@/lincons/YT.png'
import ldn from '@/lincons/LDN.png'
import x from '@/lincons/X.png'
import sov from '@/lincons/SOV.png'
import { useEffect } from 'react'
import {Toaster, toast} from 'react-hot-toast'


const Page = () => {
  const { addIcon, removeIcon, updateIcons, iconsSwitch, userData, setLink } = useDummies()
  const {activeDropdownId, switchActiveDropdownId, selectedPlatform, setSelectedPlatform} = useDropStore()
  const optionStyle = 'hover:cursor-pointer hover:bg-light-purple p-1 flex gap-2 border-t-2 text-sm'
  function populateUserData(){
    addIcon(userData.icons.length * Math.random(), '', '')
  }
  function toggleDropDown(id: string){
    switchActiveDropdownId(activeDropdownId === id ? null : id)
  }
  function togglePlatform(itemId: string, option: string, icon: string){
    //Set the image url from the dropdown here
    setSelectedPlatform(itemId, option);
    updateIcons(Number(itemId), icon)
    iconsSwitch(true)
  }
  function editLink(itemId: number, link: string) {
    setLink( itemId, link )
  }

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userData))
  }, [userData])
  

  return (
    <div className='bg-milk'>
      <div className='grid grid-cols-3 gap-3 rounded-md'>
        {/* Mock Up */}
        <MockUp/>
        {/* Profile */}
        <div className='grid col-span-3 md:col-span-2 bg-milk mx-6 rounded-md'>
          <div className='p-6 bg-white'>
            <p className="font-bold text-3xl">Customize your links</p>
            <p className="text-sm text-dark-grey my-3">Add/edit/remove links below and then share your profile with the rest of the world!</p>
            <button onClick={() => populateUserData()} className='w-full text-dark-blue my-3 border border-dark-blue hover:bg-light-purple text-xs font-semibold p-2 rounded-md'>
              + Add new link</button>
            {userData.icons.length < 1 && <Image src={starterPic} alt='LOGO' className='h-96 w-auto mx-auto'/>}
            {userData.icons.length >= 1 && userData.icons.map((item) => (<div key={item.id} className='p-12 bg-milk text-dark-grey mb-6'>
                <div className='flex justify-between mb-4'>
                  <p className='flex text-sm text-dark-grey items-center gap-1'><Menu className='size-4 font-thin'/><span className='font-semibold'>
                    Link #{userData.icons.indexOf(item) + 1}</span></p>
                  <button onClick={() => removeIcon(item.id)} className='text-sm text-dark-grey'>Remove</button>
                </div>
                <p className='text-xs my-2'>Platform</p>
                <div>
                  <div onClick={() => toggleDropDown(item.id.toString())} className='flex relative justify-between w-full bg-white p-3 hover:cursor-pointer'>
                    <span>{selectedPlatform[item.id] ? selectedPlatform[item.id] : '__Select Platform__'}</span><ArrowDown className='size-5'/></div>
                  {activeDropdownId === item.id.toString() && (
                    <div onClick={() => toggleDropDown(item.id.toString())} className='absolute bg-milk w-[52%] rounded-sm max-h-48 overflow-auto'>
                      <p onClick={() => togglePlatform(item.id.toString(), 'GitHub', gh.src)} className={optionStyle}><FaGithub className='size-4 mx-3'/>GitHub</p>
                      <p onClick={() => togglePlatform(item.id.toString(), 'YouTube', yt.src)} className={optionStyle}><FaYoutube className='size-4 mx-3'/>YouTube</p>
                      <p onClick={() => togglePlatform(item.id.toString(), 'Facebook', fb.src)} className={optionStyle}><FaFacebook className='size-4 mx-3'/>Facebook</p>
                      <p onClick={() => togglePlatform(item.id.toString(), 'Linkedin', ldn.src)} className={optionStyle}><FaLinkedin className='size-4 mx-3'/>Linkedin</p>
                      <p onClick={() => togglePlatform(item.id.toString(), 'X', x.src)} className={optionStyle}><FaX className='size-4 mx-3'/>X</p>
                      <p onClick={() => togglePlatform(item.id.toString(), 'Twitch', twi.src)} className={optionStyle}><FaTwitch className='size-4 mx-3'/>Twitch</p>
                      <p onClick={() => togglePlatform(item.id.toString(), 'Stack Overflow', sov.src)} className={optionStyle}><FaStackOverflow className='size-4 mx-3'/>Stack Overflow</p>
                    </div>
                  )}
                </div>
                <p className='text-xs my-2'>Link</p>
                <input type="text" value={item.siteLink} onChange={(e) => editLink(item.id, e.target.value)}
                  className='p-3 w-full outline-none text-sm focus:outline-purple rounded-sm' placeholder='🔗'/>
              </div>))}
            <div className='border border-light-grey w-full my-6'></div>
            <div className='grid w-full'>
              <button onClick={() => toast('Profile saved')} className='bg-dark-blue text-white text-xs hover:bg-purple shadow-md py-3 px-6 rounded-md justify-self-end'>Save</button>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </div>
    ) 
  }
  
  export default Page
  