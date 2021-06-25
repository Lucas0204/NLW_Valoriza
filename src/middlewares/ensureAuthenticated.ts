import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    // Receber o token
    const authToken = req.headers.authorization

    // Verificar se o token está preenchido
    if (!authToken) {
        return res.status(401).json({
            status: 401,
            error: 'Unauthorized!' 
        })
    }

    const token = authToken.split(' ')[1]

    // Verificar se o token é válido
    // Se não for válido, o próprio JWT lança um erro que é capturado no middleware do server
    const { sub } = verify(token, '6425ddbf9cd648e1e4d33c4340d3373d') as IPayload
    
    // Salvar o id do usuário, recebido pelo payload do JWT, dentro da requisição
    req.user_id = sub

    return next()
}
