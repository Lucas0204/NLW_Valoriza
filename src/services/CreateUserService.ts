import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, admin }: IUserRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        if (!email) {
            throw new Error('Email incorrect.')
        }

        const emailAlreadyExists = await usersRepositories.findOne({ email })

        if (emailAlreadyExists) {
            throw new Error('User is already exists!')
        }

        const user = usersRepositories.create({
            name,
            email,
            admin
        })

        await usersRepositories.save(user)

        return user
    }
}

export { CreateUserService }
