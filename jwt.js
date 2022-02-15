
import dayjs from 'dayjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
import * as config from './config.js'

const { jwt: jwtConfig } = config


// Get the header token
export function getTokenFromHeader(req) {
     const hasToken =
          (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
          (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')

     return hasToken ? req.headers.authorization.split(' ')[1] : null
}


//Generate the JWT
export async function generateJWT({
     expiration = jwtConfig.expiration,
     timeUnit = jwtConfig.timeUnit,
     secret = jwtConfig.secret,
     user,
}) {
     const payload = {
          exp: dayjs().add(expiration, timeUnit).unix(),
          user: { id: user._id },
     }

     const token = jwt.sign(payload, secret)

     return token
}

// Get and Verify Token
export function getAndVerifyJWT(requestObject) {
     try {
          const token = getTokenFromHeader(requestObject)
          if (token) {
               const payload = jwt.verify(token, jwtConfig.secret)
               return payload
          }
          return null
     } catch (err) {
          throw new Error('Invalid or Expired token ')
     }
}