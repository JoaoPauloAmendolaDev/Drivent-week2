import ticketsRepository from "@/repositories/tickets-repository"
import { Ticket, TicketType } from "@prisma/client"

async function verifyTicketFromUser (id : number):Promise<Ticket>{
    const ticket = await ticketsRepository.findTicketsByUserId(id)
    if (!ticket) throw new Error("NOT_FOUND")
    return ticket
}

async function postTicket(userId : number,ticketTypeId: number):Promise<Ticket>{

    const enrollment = await ticketsRepository.getEnrollmentByUserId(userId)
    const ticket = await ticketsRepository.postTicket(enrollment.id, ticketTypeId) 

    return ticket
}

async function getTicketTypes(): Promise<TicketType[]>{

    const ticketTypes = await ticketsRepository.getAllTicketTypes()
    return ticketTypes
}


const ticketService = {
    verifyTicketFromUser,
    postTicket,
    getTicketTypes
}

export default ticketService