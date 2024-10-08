import express from 'express'

import cors from 'cors'
import morgan from 'morgan'

import { exception, exceptionValidation, notFound } from './src/middlewares'

import { router } from './src/router'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = '8001'

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)

app.options('*', cors())
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])

app.use(router)

app.use(notFound)
app.use(exceptionValidation)
app.use(exception)


try {
  app.listen(port, () => console.log(`Application running on port ${port}`))
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error)
}

export default app
