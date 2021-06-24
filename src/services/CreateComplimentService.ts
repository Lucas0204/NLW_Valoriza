import { getCustomRepository } from 'typeorm'
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories'
import { TagsRepositories } from '../repositories/TagsRepositories'
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComlimentService {

    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const tagsRepositories = getCustomRepository(TagsRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)

        // Verificar se o usuário não está mandando para ele mesmo
        if (user_sender === user_receiver) {
            throw new Error('User receiver incorrect!')
        }

        // Verificar se existe um usuário para receber o elogio
        const userReceiver = await usersRepositories.findOne(user_receiver)

        if (!userReceiver) {
            throw new Error('User receiver does not exists!')
        }

        // Verificar se a Tag existe
        const tagExists = await tagsRepositories.findOne(tag_id)
        
        if (!tagExists) {
            throw new Error(`The tag's not exists!`)
        }

        // Verificar se a mensagem do elogio já não está cadastrada
        const messageAlreadyExists = await complimentsRepositories.findOne({ message })

        if (messageAlreadyExists) {
            throw new Error('This message is alreay exists!')
        }

        const compliment = complimentsRepositories.create({
            user_sender,
            user_receiver,
            tag_id,
            message
        })

        await complimentsRepositories.save(compliment)

        return compliment
    }
}

export { CreateComlimentService }
