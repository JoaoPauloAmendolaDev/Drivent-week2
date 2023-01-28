import httpStatus from "http-status";
import { Response, Request } from "express"
import { AuthenticatedRequest } from "@/middlewares";
import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket } from "@prisma/client";
import ticketService from "@/services/ticket-service";


export async function verifyTicketsFromUser(req: AuthenticatedRequest, res: Response):Promise<Response<Ticket>>{
    const id = req.userId

    try {
        const ticket = await ticketService.verifyTicketFromUser(id)
        return res.status(httpStatus.OK).send(ticket)
    } catch (error) {
        console.log(error)
        if(error.message === "NOT_FOUND") {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        return res.sendStatus(httpStatus.NO_CONTENT)
    }

}

export async function postTicket(req: AuthenticatedRequest, res : Response):Promise<Response<Ticket>>{
    const {userId} = req
    const {ticketTypeId} = req.body as {ticketTypeId: number}

    if(!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST)

    try {
        
        const ticket = await ticketService.postTicket(userId, ticketTypeId)
        return res.status(httpStatus.CREATED).send(ticket)
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}