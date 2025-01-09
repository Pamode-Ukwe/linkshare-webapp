import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import User from '@/models/user'
import connectToDatabase from '@/lib/mongodb'

export async function POST(request: Request) {
    const { email, password} = await request.json()

    try {
        await connectToDatabase()
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ message: 'User already exist' }, { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            email,
            password: hashedPassword,
        })
        await newUser.save()
        return NextResponse.json({message: 'User is active ✔'}, {status: 201})

    } catch( error ) {
        return NextResponse.json({message: 'Oh no.. something went wrong'}, {status: 500})
    }
    
}
