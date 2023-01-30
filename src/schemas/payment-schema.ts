import joi from "joi"

export const paymentSchema = joi.object({
    ticketId: joi.number().required(),
    cardData: joi.object().required().keys({
        issuer: joi.string().required(),
        number: joi.number().required(),
        name: joi.string().required(),
        expirationDate: joi.date().required(),
        cvv: joi.number().required()
    })
})