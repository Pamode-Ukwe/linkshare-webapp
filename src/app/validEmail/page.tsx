"use client"
import React, { useState } from 'react'

interface ValidEmailProps {
    value: string
    onChange: (value: string) => void
    validate?: (input: string) => string
}

const Page = ({value, onChange, validate}: ValidEmailProps) => {
    const [error, setError] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.toString()
        onChange(inputValue)
        
        if (validate) {
          const validationError = validate(inputValue);
          setError(validationError);
      }
    }
  return (
    <div className='space-y-2'>
        <input type="text" value={value} onChange={handleChange} className={`border p-2 rounded w-full ${error && 'border-rose-200'}`}/>
        {error && <p className='text-rose-200 text-sm'>{error}</p>}
    </div>
  )
}

export default Page
