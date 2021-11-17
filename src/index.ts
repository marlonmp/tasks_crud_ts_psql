// getting dotenv variables
require('dotenv').config({ path:  __dirname + '/../.env' })

import express from 'express'
import { router } from './routes'

// mounting express server
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)

app.listen(process.env.PORT, () => {
    console.log('[LISTENING] Server running on port', process.env.PORT)
})