import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express"
import httpStatus from "http-status";

export type cardData = {
    issuer : string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
}

export async function ticketProcessController(req: AuthenticatedRequest, res: Response){

    const {ticketId, cardData} = req.body as {ticketId : number, cardData : cardData}

    console.log(ticketId, cardData)
    try {
        await paymentsService.verifyTicketId(ticketId)
        await paymentsService.verifyIfUserHaveTicket(ticketId)
        const result = await paymentsService.paymentSucess(ticketId, cardData)
        return res.status(httpStatus.OK).send(result)
    } catch (error) {
        console.log(error.message, 'AQUI É O ERRO')
        if(error.message === "NOT_FOUND") return res.sendStatus(httpStatus.NOT_FOUND)
        else if (error.message === "UNAUTHORIZED") return res.sendStatus(httpStatus.UNAUTHORIZED)
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}