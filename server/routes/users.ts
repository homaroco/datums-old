import { Router } from 'https://deno.land/x/oak/mod.ts'
import usersController from '../controllers/users.ts'

const router = new Router()
router
	.get('/users', usersController.getAllUsers)
	.get('/users/:id', usersController.getUserById)
	.post('/users', usersController.createUser)
	.put('/users/:id', usersController.updateUserById)
	.delete('/users/:id', usersController.deleteUserById)

export default router