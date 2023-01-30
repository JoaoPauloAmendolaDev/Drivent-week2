import { cardData } from "@/controllers/payments-controller"
import { notFoundError, unauthorizedError } from "@/errors"
import paymentsRepository from "@/repositories/payments-repository"



async function verifyTicketId(TicketId : number){
    const result = await paymentsRepository.verifyTicketId(TicketId)
    if(!result) {
        throw notFoundError()
    }
    return result
}

async function verifyIfUserHaveTicket(id : number){
    const result = await paymentsRepository.verifyIfUserHaveTicket(id)
    if(!result) throw unauthorizedError()
    return result
}

async function verifyIfUserTicketIsGivenTicked(id: number, ticketId: number){
    const result = await paymentsRepository.verifyIfUserTicketIsGivenTicked(id, ticketId)
    if(!result) throw unauthorizedError()
    return result
}

async function paymentSucess(TicketId : number, cardData : cardData){
    const ticketType = await paymentsRepository.verifyTicketId(TicketId)
    const price = await paymentsRepository.getPrice(ticketType.ticketTypeId)
    const result = await paymentsRepository.paymentSucess(TicketId, price.TicketType.price, cardData)
    const updateTickedToPaid = await paymentsRepository.updateTickedToPaid(TicketId)
    if(!result) throw notFoundError()
    return result
}

async function verifyPayment(TicketId : number){
    const data = await paymentsRepository.getPaymentData(TicketId)
    return data
}

const paymentsService = {
    verifyTicketId,
    verifyIfUserHaveTicket,
    verifyIfUserTicketIsGivenTicked,
    paymentSucess,
    verifyPayment
}

export default paymentsService