import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface FirstState { 
    copied: number
    setCopied: (update: number) => void
    pass: boolean
    setPass: (update: boolean) => void
}

// Makes sure the form validation function mounts on render

export const useGeneralStore = create<FirstState>((set) => ({
    copied: 0,
    setCopied: (update) => set({copied: update}),
    pass: true,
    setPass: (update) => set({pass: update})
}))

//////////////////////////////////////////////////////////////////////////////////////////////// Navbar changes

interface NavState {
    top: boolean
    switchTop: (item: boolean) => void
}

export const useNavStore = create<NavState>((set) => ({
    top: true,
    switchTop: (item) => set({top: item})
}))

//////////////////////////////////////////////////////////////////////////////////////////////// Main data structure for users overall profile

interface ProfileObject{
    picture: string
    firstName: string
    lastName: string
    email: string
}
interface IconsObject{
    id: number
    icon: string
    siteLink: string
}
interface Userinfo {
    profile: ProfileObject
    icons: IconsObject[]
}

interface DummyArray {
    userData: Userinfo
    setProfileInput: (field: keyof ProfileObject, value: string) => void
    updateprofile: (update: ProfileObject) => void
    addIcon: (id: number, icon: string, siteLink: string) => void
    removeIcon: (id: number) => void
    setLink: (id: number, updatedLink: string) => void
    updateIcons: (id: number, icon: string) => void
    displayIcons: boolean
    iconsSwitch: (item: boolean) => void
    setPicture: (picture: string) => void
}

export const useDummies = create<DummyArray>()(
    persist(
        (set) => ({
            userData: {
                profile: {
                    picture: '',
                    firstName: '',
                    lastName: '',
                    email: ''
                },
                icons: []}
            ,
            setProfileInput(field, value) {
                set((state) => ({
                    userData: {
                        ...state.userData,
                        profile: {
                            ...state.userData.profile,
                            [field]: value
                        }
                    }
                }))
            },
            updateprofile(update) {
                set((state) => ({
                    userData: { // Not sure if this is still useful but keep till the end
                        ...state.userData,
                        profile: {...state.userData.profile, ...update}
                    }
                }))
            },
            displayIcons: false,
            iconsSwitch: (item) => set({displayIcons: item}),
            addIcon(id, icon, siteLink) {
                set((state) => ({
                    userData: {
                        ...state.userData,
                        icons: [...state.userData.icons, {id, icon, siteLink}]
                    }
                }))
            },
            removeIcon(id) {
                set((state) => ({
                    userData: {
                        ...state.userData,
                        icons: state.userData.icons.filter((item) => item.id !== id)
                    }
                }))
            },
            setLink(id, updatedLink) {
                set((state) => ({
                    userData: {
                        ...state.userData,
                        icons: state.userData.icons.map((item) => item.id === id ? { ...item, siteLink: updatedLink}: item)
                    }
                }))
            },
            updateIcons(id, newIcon) {
                set((state) => ({
                    userData: {
                        ...state.userData,
                        icons: state.userData.icons.map((item) => item.id === id ? { ...item, icon: newIcon}: item)
                    }
                }))
            },
            setPicture(picture) {
                set((state) => ({
                    userData: {
                        ...state.userData,
                        profile: {
                            ...state.userData.profile,
                            picture
                        }
                    }
                }))
            },
        }),
        {
            name: 'user-data',
        }
    )
)

//////////////////////////////////////////////////////////////////////////////////////////////// Independent platform Options

interface DropState {
    activeDropdownId: string | null
    switchActiveDropdownId: (id: string | null) => void
    selectedPlatform: Record<string, string>
    setSelectedPlatform: (id: string, value: string) => void
}

export const useDropStore = create<DropState>()(
    persist(
        (set) => ({
            activeDropdownId: null,
            switchActiveDropdownId: (id) => set({activeDropdownId: id}),
            selectedPlatform: {},
            setSelectedPlatform(id, value) {
                set((state) => ({
                    selectedPlatform: { ...state.selectedPlatform, [id]: value }
                }))
            },
        }),
        {
            name: 'icon-data'
        }
    )
)
