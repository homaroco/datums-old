import { Application } from "https://deno.land/x/oak/mod.ts"
import { oakCors } from 'https://deno.land/x/cors/mod.ts'
import datumsRouter from './routes/datums.ts'

const app = new Application()
const PORT: number = 8080

app.use(datumsRouter.routes())
app.use(datumsRouter.allowedMethods())
// app.use(oakCors({
// 	origin: 'https://datums.app',
// }))

app.addEventListener('listen', ({ secure, hostname, port }) => {
	const protocol = secure ? 'https://' : 'http://'
	const url = `${protocol}${hostname ?? 'localhost'}:${port}`
	console.log('Deno server listening on', url)
})

await app.listen({ secure: false, hostname: 'localhost', port: PORT })