import {prisma} from "@/config"
import { Ticket, TicketType } from "@prisma/client";

function findTicketsByUserId(id: number):Promise<Ticket>{
     const data = prisma.ticket.findFirst({
        where : {
            Enrollment :{
                userId : id
            }
        },
        include:{
            TicketType: true
        }
    })
    return data
}

function getEnrollmentByUserId(id: number): Promise<{id: number}>{
    const data = prisma.enrollment.findUnique({
        where : {
            userId: id
        },
        select : {
            id: true
        }
    })
    return data
}

function postTicket(enrollmentId: number, ticketTypeId: number){
    const data = prisma.ticket.create({
        data: {
            ticketTypeId,
            enrollmentId,
            status : "RESERVED"
        },
        include: {
            TicketType: true
        }
    })
    return data
}

function getAllTicketTypes():Promise<TicketType[]>{
    const data = prisma.ticketType.findMany()

    return data
}

const ticketsRepository = {
    findTicketsByUserId,
    getEnrollmentByUserId,
    postTicket,
    getAllTicketTypes
};



export default ticketsRepository;