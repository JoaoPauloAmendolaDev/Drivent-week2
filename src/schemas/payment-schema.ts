import joi from "joi"

export const paymentSchema = joi.object({
    ticketId: joi.number().required(),
    cardData: joi.object().required().keys({
        issuer: joi.string().required(),
        number: joi.string().required(),
        name: joi.string().required(),
        expirationDate: joi.string().required(),
        cvv: joi.string().required()
    })
})