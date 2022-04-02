import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface TokenPayload {
    exp: number;
    name: string;
    userId: number;
}
  

export const JWT = {
    
    secret: process.env.JWT_SECRET,
    authentication: async (req: Request, res: Response, next: NextFunction) =>{
        try{
            const bearerToken = req.headers.authorization
            
            if(!bearerToken){
                return res.status(400).json({ message: 'Invalid Token!' });
            }

            const token = bearerToken.split(' ')[1]

            const decodedPayload = await JWT.validateToken(token)

            if(!decodedPayload){
                return res.status(400).json({ message: 'Invalid Token!' });
            }

            next()

        }catch(err: any){

            if (err.name === 'TokenExpiredError') {
                
                return res.status(401).json({ message: 'Expired token' });
            }

            return res.status(500).json({ message: 'Failed to authenticate user' });
        }
    },

    validateToken : async (token: string) : Promise<TokenPayload | string> => {
        let secret = JWT.secret ||  ''
      
        let decodedPayload = await verify(token, secret , { algorithms: ['HS256'] }) as TokenPayload
              
        return decodedPayload
            
    }

}