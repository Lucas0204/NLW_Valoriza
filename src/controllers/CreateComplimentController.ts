import { Request, Response } from 'express'
import { CreateComlimentService } from '../services/CreateComplimentService'

class CreateComplimentController {

    async handle(req: Request, res: Response) {
        const { user_receiver, tag_id, message } = req.body
        const { user_id } = req
        
        const createComplimentService = new CreateComlimentService()

        const compliment = await createComplimentService.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message
        })

        return res.json(compliment)
    }
}

export { CreateComplimentController }
