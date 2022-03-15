import jwt from "jsonwebtoken"

export const jwtSign = value => {
    return jwt.sign({ value }, process.env.SECRET, {
        expiresIn: "3d"
    })
}

export const jwtVerify = (token) => jwt.verify(token, process.env.SECRET)
