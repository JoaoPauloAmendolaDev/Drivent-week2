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

async function getPrice(ticketTypeId : number){
    const price = await prisma.payment.findFirst({
        where : {
            id : ticketTypeId
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
            cardLastDigits : cardData.number.toString().substring(cardData.number.toString().length - 4),
            createdAt : new Date(),
            updatedAt : new Date(),
        }
    })
    return info
}

const paymentsRepository = {
    verifyTicketId,
    verifyIfUserHaveTicket,
    getPrice,
    paymentSucess
}

export default paymentsRepository