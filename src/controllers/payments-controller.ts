import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express"
import httpStatus, { BAD_REQUEST } from "http-status";

export type cardData = {
    issuer : string,
    number: string,
    name: string,
    expirationDate: string,
    cvv: string;
}

export async function ticketProcessController(req: AuthenticatedRequest, res: Response){
    const {ticketId, cardData} = req.body as {ticketId : number, cardData : cardData}
    const id = req.userId
    try {

        await paymentsService.verifyTicketId(ticketId)

        await paymentsService.verifyIfUserHaveTicket(id)

        await paymentsService.verifyIfUserTicketIsGivenTicked(id, ticketId)

        const result = await paymentsService.paymentSucess(ticketId, cardData)
        return res.status(httpStatus.OK).send(result)
    } catch (error) {
        if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND)
        else if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED)
        return res.sendStatus(500)
    
}
}

export async function paymentGetController(req: AuthenticatedRequest, res: Response){
    const ticketId = parseInt(req.query.ticketId as string)
    const id = req.userId

    if(!ticketId){
        return res.sendStatus(400)
    }

    try {
    
        await paymentsService.verifyTicketId(ticketId)

        await paymentsService.verifyIfUserHaveTicket(id)

        await paymentsService.verifyIfUserTicketIsGivenTicked(id, ticketId)

        const sucess = await paymentsService.verifyPayment(ticketId)
        return res.status(200).send(sucess)
    } catch (error) {
        if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND)
        else if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED)
        
        return res.sendStatus(500)
    }
}