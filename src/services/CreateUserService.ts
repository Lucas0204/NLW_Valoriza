import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { hashSync } from 'bcryptjs'
import { ExistingUserError, AuthenticateError } from '../customErrors/usersErrors'

interface IUserRequest{
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, password, admin = false }: IUserRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        if (!email) {
            throw new Error('Email incorrect.')
        }

        const emailAlreadyExists = await usersRepositories.findOne({ email })

        if (emailAlreadyExists) {
            throw new ExistingUserError()
        }

        const passwordHash = hashSync(password, 8)

        const user = usersRepositories.create({
            name,
            email,
            admin,
            password: passwordHash
        })

        await usersRepositories.save(user)

        return user
    }
}

export { CreateUserService }
