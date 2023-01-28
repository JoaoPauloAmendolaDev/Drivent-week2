import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import enrollmentRepository from "@/repositories/enrollment-repository";
import httpStatus from "http-status";


export async function enrollmentVerify(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const id = req.userId

    try {
        await enrollmentRepository.findWithAddressByUserId(id)    
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
    
    next()
}