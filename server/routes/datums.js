import { Router } from 'express'
import datumsController from '../controllers/datums.js'

const router = new Router()
router
	.get('/', datumsController.getAllDatums)
	.get('/:id', datumsController.getDatumById)
	.post('/', datumsController.createDatum)
	.put('/:id', datumsController.updateDatumById)
	.delete('/:id', datumsController.deleteDatumById)

export default router