import httpStatus from "http-status";
import { Response } from "express"
import { AuthenticatedRequest } from "@/middlewares";
import ticketsRepository from "@/repositories/tickets-repository";

export async function verifyTicketsFromUser(req: AuthenticatedRequest, res: Response){
    const id = req.userId

    try {
        const listOfTickets = await ticketsRepository.findTicketsByUserId(id)
        if(listOfTickets.length === 0){
            console.log('aqui ele não tem tickets')
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        
    } catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT)
    }

}