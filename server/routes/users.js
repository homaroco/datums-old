import { Router } from 'express'
import usersController from '../controllers/users.js'

const router = new Router()
router
	.get('/', usersController.getAllUsers)
	.get('/:id', usersController.getUserById)
	.post('/', usersController.createUser)
	.put('/:id', usersController.updateUserById)
	.delete('/:id', usersController.deleteUserById)

export default router