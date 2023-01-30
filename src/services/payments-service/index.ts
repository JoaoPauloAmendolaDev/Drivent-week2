import { cardData } from "@/controllers/payments-controller"
import { notFoundError, unauthorizedError } from "@/errors"
import paymentsRepository from "@/repositories/payments-repository"



async function verifyTicketId(TicketId : number){
    const result = await paymentsRepository.verifyTicketId(TicketId)
    if(!result) throw notFoundError()
    return result
}

async function verifyIfUserHaveTicket(TicketId : number){
    const result = await paymentsRepository.verifyIfUserHaveTicket(TicketId)
    if(!result) throw unauthorizedError()
    return result
}

async function paymentSucess(TicketId : number, cardData : cardData){
    const ticketType = await paymentsRepository.verifyTicketId(TicketId)
    const price = await paymentsRepository.getPrice(ticketType.id)
    const result = await paymentsRepository.paymentSucess(TicketId, price.value, cardData)
    if(!result) throw notFoundError()
    return result
}



const paymentsService = {
    verifyTicketId,
    verifyIfUserHaveTicket,
    paymentSucess
}

export default paymentsService