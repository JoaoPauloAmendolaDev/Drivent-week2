import {prisma} from "@/config"
import { Ticket, TicketType } from "@prisma/client";

async function findTicketsByUserId(id: number):Promise<Ticket>{
     const data = await prisma.ticket.findFirst({
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

async function getEnrollmentByUserId(id: number): Promise<{id: number}>{
    const data = await prisma.enrollment.findUnique({
        where : {
            userId: id
        },
        select : {
            id: true
        }
    })
    console.log(data, id)
    return data
}

async function postTicket(enrollmentId: number, ticketTypeId: number){
    console.log(enrollmentId, 'AQUI É O POSTTICKED REPOSITORY')
    const data = await prisma.ticket.create({
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

async function getAllTicketTypes():Promise<TicketType[]>{
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