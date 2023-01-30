import { ticketProcessController } from "@/controllers/payments-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { paymentSchema } from "@/schemas/payment-schema";
import { Router } from "express";

const paymentsRouter = Router()

paymentsRouter
    .all("*/", authenticateToken)
    .post("/process", validateBody(paymentSchema) , ticketProcessController)


export default paymentsRouter