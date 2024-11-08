import { PrismaClient, User } from "@prisma/client";
import bcrypt, { compareSync, hashSync } from "bcryptjs"
import ApiError from "../../errors/ApiErr";
import {
    StatusCodes,

} from 'http-status-codes';



const prisma = new PrismaClient()


const createUserIntoDB = async (payload: User) => {

    try {
        const result = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })
        if (result?.email) {
            throw new ApiError(StatusCodes.CONFLICT, "User already exit")
        }
        const user = await prisma.user.create({
            data: {
                ...payload,
                password: hashSync(payload.password)
            }
        })
        return user
    }
    catch (error) {
        throw error
    }
}


const logInUserFromDB = async (payload: User) => {

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "user  not found")
    }
    const isPasswordValid = compareSync(payload.password, user.password)
    if (!isPasswordValid) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "your  password is not valid")
    }
    const name = user?.name
    const email = user?.email

    
    return {name, email} 
}


export const userService = { createUserIntoDB, logInUserFromDB }