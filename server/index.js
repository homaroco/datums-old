import express from 'express'
import usersRouter from './routes/users.js'
import datumsRouter from './routes/datums.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use('/users', usersRouter)
app.use('/datums', datumsRouter)

app.listen(PORT, () => {
	console.log('Express server listening on port', PORT)
})