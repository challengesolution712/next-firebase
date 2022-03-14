import jwt from "jsonwebtoken"

export const jwtSign = value => {
    return jwt.sign({ value }, process.env.SECRET, {
        expiresIn: process.env.EXP
    })
}

export const jwtVerify = (token) => jwt.verify(token, process.env.SECRET)
