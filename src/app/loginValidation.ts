import { create } from 'zustand'

interface LoginState {
    formData: {
        email: string
        password: string
        confirmPassword?: string 
    }
    errors: {
        email: string
        password: string
        confirmPassword?: string 
    }
    setFormData: (field: string, value: string) => void
    resetFormData: () => void
    validateFields: () => boolean
    formType: 'login' | 'signup'
    setFormType: (type: 'login' | 'signup') => void
    eye: boolean
    blink: () => void
}

export const useLoginStore = create<LoginState>((set) => ({
    formData: { email: '', password: '', confirmPassword: '' },
    errors: { email: '', password: '', confirmPassword: '' },
    setFormData(field, value) {
        set((state) => ({
            formData: {
                ...state.formData, [field]: value
            },
            errors: {
                ...state.errors, [field]: undefined
            },
        })
    )},
    resetFormData: () => set({formData: { email: '', password: '', confirmPassword: '' }}),
    formType: 'login',
    setFormType: (type) => set({formType: type}),
    eye: true,
    blink: () =>  set((state) => ({eye: !state.eye})) ,
    validateFields() {
        let hasError = false
        set((state) => {
            const errors = {email: '', password: '', confirmPassword: ''}
            // Email validation
            if ( !state.formData.email ) {
                errors.email = 'Email is required'
                hasError = true
            } else if ( !state.formData.email.includes('@') || !state.formData.email.includes('.')) {
                errors.email = 'Please enter a valid email'
                hasError = true
            }
            // Password validation
            if ( !state.formData.password ) {
                errors.password = 'Password is required'
                hasError = true
            } else if ( state.formData.password.length < 8 ) {
                errors.password = 'Password must be at least 8 characters'
                hasError = true
            }
            // Password match
            if (state.formType === 'signup'){
                if ( !state.formData.confirmPassword ) {
                    errors.confirmPassword = 'Field is empty'
                    hasError = true
                } else if (state.formData.password !== state.formData.confirmPassword) {
                    errors.confirmPassword = 'Passwords do not match'
                    hasError = true
                }
            }            
            return { errors }
        })
        return !hasError
    }
}))
