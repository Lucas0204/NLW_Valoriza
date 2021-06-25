import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const usersRepositories = getCustomRepository(UsersRepositories)

    const { admin } = await usersRepositories.findOne({ id: req.user_id }) 

    if (admin) {
        return next()
    }

    return res.status(401).json({
        error: 'Unauthorized!'
    })
}
