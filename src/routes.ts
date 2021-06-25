import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController'
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { ListTagsController } from './controllers/ListTagsController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ensureAdmin } from './middlewares/ensureAdmin'

const router = Router()
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()
const authenticateUserController = new AuthenticateUserController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listTagsController = new ListTagsController

router.post('/users', createUserController.handle)

router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)
router.get('/tags', ensureAuthenticated, listTagsController.handle)

router.post('/login', authenticateUserController.handle)
router.post('/compliments', ensureAuthenticated, createComplimentController.handle)

router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle)
router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle)

export { router }
