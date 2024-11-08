import { Request, Response } from "express";
import { userService } from "./userService";
import catchAsync from "../../shared/catchAsync";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../shared/sendResponse";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createUserIntoDB(req.body)
    // res.status(StatusCodes.CREATED).json(result)
    sendResponse(res, { message: "user create successfully ", success: true, data: result, statusCode: StatusCodes.CREATED })
})

const logInUser = catchAsync(async(req : Request, res : Response)=>{

    const result = await userService.logInUserFromDB(req.body)

    sendResponse(res, {statusCode : StatusCodes.ACCEPTED, message : "logIn successful", success: true, data : result})

})






export const userController = { createUser, logInUser } 