import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { compareSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AuthenticateError } from '../customErrors/usersErrors'
import { config } from 'dotenv'
config()

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
            throw new AuthenticateError()
        }

        // Verificar se a senha está correta
        const passwordMatch = compareSync(password, user.password)

        if (!passwordMatch) {
            throw new AuthenticateError()
        }

        // Gerar token
        const token = sign({
            email: user.email
        }, 
        process.env.JWT_SECRET, 
        {
            subject: user.id,
            expiresIn: '1d'
        })

        return token
    }
}

export { AuthenticateUserService }
