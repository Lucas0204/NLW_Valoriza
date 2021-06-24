import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        // Verificar se existe esse usuário
        const user = await usersRepositories.findOne({ email })

        if (!user) {
            throw new Error('Email/Password incorrect!')
        }

        // Verificar se a senha está correta
        const passwordMatch = compareSync(password, user.password)

        if (!passwordMatch) {
            throw new Error('Email/Password incorrect!')
        }

        // Gerar token
        const token = sign({
            email: user.email
        }, 
        '6425ddbf9cd648e1e4d33c4340d3373d', 
        {
            subject: user.id,
            expiresIn: '1d'
        })

        return token
    }
}

export { AuthenticateUserService }
