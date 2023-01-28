import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { postTicket, verifyTicketsFromUser } from "@/controllers/ticket-controller";
import { ticketTypeSchema } from "@/schemas/ticket-schema";
import { enrollmentVerify } from "@/middlewares/enrollment-middleware";


const ticketsRouter = Router()


ticketsRouter
    .all("/*", authenticateToken )
    .get("/" ,enrollmentVerify, verifyTicketsFromUser)
    .post("/", validateBody(ticketTypeSchema) ,enrollmentVerify , postTicket)
    .get("/types", getTicketTypes)

export {ticketsRouter}