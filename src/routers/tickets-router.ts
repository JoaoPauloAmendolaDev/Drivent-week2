import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { verifyTicketsFromUser } from "@/controllers/ticket-controller";
import { ticketTypeSchema } from "@/schemas/ticket-schema";


const ticketsRouter = Router()


ticketsRouter
    .all("/*", authenticateToken )
    .get("/tickets", verifyTicketsFromUser)
    .post("/tickets", validateBody(ticketTypeSchema))

export {ticketsRouter}