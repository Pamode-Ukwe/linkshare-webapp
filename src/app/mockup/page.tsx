import Image from "next/image"
import logo from '@/lincons/profile-details.png'
import { useDummies } from "../store"

const mockup = () => {
    const { userData, displayIcons } = useDummies()
  return (
    <div className='md:table ml-6 col-span-1 hidden'>
        <div className="max-h-svh text-dark-grey">
            <div className="w-full h-full bg-white p-4 mx-auto">
                <div className="grid mx-auto w-[85%] h-full bg-milk rounded-3xl border border-black">
                <div className='border-2 w-36 h-36 rounded-full mx-auto my-4 bg-white'>
                    <Image src={userData.profile.picture} height={70} width={250} alt='.' className='mx-auto my-auto w-40 h-36 rounded-full'/>
                </div>
                <div className='w-[60%] h-8 overflow-hidden bg-white mx-auto border-2 rounded-md mt-2 mb-4 text-center'>{userData.profile.firstName} {userData.profile.lastName}</div>
                <div className= 'w-[65%] h-8 overflow-hidden bg-white mx-auto border-2 rounded-md mb-8 text-center'>{userData.profile.email}</div>
                { displayIcons ? userData.icons.map((item) =>
                (<a href={item.siteLink} key={item.id}><Image priority src={item.icon || logo} height={35} width={250} alt='ICON' className='w-auto mx-auto mb-4'/></a>)) : 
                <div className='text-dark-grey w-[85%] h-10 bg-white mx-auto border-2 rounded-md mb-4'></div> }
                <div className='text-xs font-semibold text-center my-6 text-black'>+ Links</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default mockup
