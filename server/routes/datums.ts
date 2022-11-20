import { Router } from 'https://deno.land/x/oak/mod.ts'
import datums from '../controllers/datums.ts'
import datumsController from '../controllers/datums.ts'

const router = new Router()
router
	.get('/datums', datumsController.getAllDatums)
	.get('/datums/:id', datumsController.getDatumById)
	.post('/datums', datumsController.createDatum)
	.put('/datums/:id', datumsController.updateDatumById)
	.delete('/datums/:id', datumsController.deleteDatumById)

export default router