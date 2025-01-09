"use client"
import { createContext, ReactNode, useContext, useState } from "react"

interface FormData {
    firstName: string
    lastName: string
    emaiL: string
}

interface FormDataContextProps {
    formData: FormData
    setFormData: (data: FormData) => void
}

const FormDataContext = createContext<FormDataContextProps | undefined>(undefined)

const FormDataProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [formData, setFormData] = useState<FormData>({firstName: '',lastName: '',emaiL: ''})

    return (
        <FormDataContext.Provider value={{formData, setFormData}}>
            {children}
        </FormDataContext.Provider>
    )
}

const useFormData = () => {
    const context = useContext(FormDataContext)
    if (!context) {
        throw new Error('useFormData must be used within a FormDDataProvider')
    }
    return context
}

export {FormDataProvider, useFormData}
