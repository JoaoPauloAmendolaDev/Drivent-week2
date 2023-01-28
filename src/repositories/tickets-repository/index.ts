import {prisma} from "@/config"

async function findTicketsByUserId(id: number){
     const data = prisma.ticket.findMany({
        where : {
            id
        }
    })
    return data
}

const ticketsRepository = {
    findTicketsByUserId,
};

export default ticketsRepository;