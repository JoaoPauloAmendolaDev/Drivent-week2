import {prisma} from "@/config"
import { Ticket } from "@prisma/client";

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

const ticketsRepository = {
    findTicketsByUserId,
    getEnrollmentByUserId,
    postTicket
};

export default ticketsRepository;