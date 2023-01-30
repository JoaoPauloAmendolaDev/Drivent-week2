import { prisma } from "@/config";
import {cardData} from "@/controllers/payments-controller"

async function verifyTicketId(id: number){
    const data = await prisma.ticket.findFirst({
        where : {
            id
        }
    })
    return data
}

async function verifyIfUserHaveTicket(id: number){
    const data = await prisma.ticket.findFirst({
        where: {
            Enrollment :{
                userId : id
            }
        }
    })
    return data
}

async function verifyIfUserTicketIsGivenTicked(id : number, ticketId : number){
    const data = await prisma.ticket.findFirst({
        where:{
            AND: [
            {id : ticketId}, 
            {Enrollment:{
                    userId : id
            }}
        ]}
    })
    return data
}

async function getPrice(TicketTypeId : number){
    const price = await prisma.ticket.findFirst({
        where : {
            TicketType : {
                id : TicketTypeId
            },
        },
        select:{
            TicketType : true
        }
    })
    return price
}

async function paymentSucess(id: number, value : number , cardData: cardData){
    const info = await prisma.payment.create({
        data: {
            ticketId: id,
            value: value,
            cardIssuer : cardData.issuer,
            cardLastDigits : cardData.number.slice(-4),
            createdAt : new Date(),
            updatedAt : new Date(),
        }
    })
    return info
}

async function updateTickedToPaid(ticketId: number){
    const info = await prisma.ticket.update({
        where: {
            id : ticketId
        },
        data: {
            status : 'PAID'
        }
    })
    return info
}

async function getPaymentData(ticketId: number){
    const data = await prisma.payment.findFirst({
        where: {
            ticketId : ticketId
        }
    })
    return data
}

const paymentsRepository = {
    verifyTicketId,
    verifyIfUserHaveTicket,
    getPrice,
    verifyIfUserTicketIsGivenTicked,
    paymentSucess,
    updateTickedToPaid,
    getPaymentData
}

export default paymentsRepository