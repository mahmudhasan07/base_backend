/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/routes'
import { PORT } from './secrets'
import { PrismaClient } from '@prisma/client'
import GlobalErrorHandler from './app/middleware/golobalErr'

const app: Application = express()

const prisma = new PrismaClient()

//parsers
app.use(express.json())
// app.use(cookieParser())

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
    ],
    credentials: true,
  }),
)

app.use('/api/v1', router)

app.use(GlobalErrorHandler)

async function DataBase() {
  try {
    await prisma.$connect()
    console.log(`Connect to the database`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

DataBase()

// application routes
app.listen(PORT, () => {
  console.log('server is running')
})

