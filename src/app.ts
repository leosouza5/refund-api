import express from 'express';
import cors from 'cors';
import { errorHandlingMiddleware } from './middlewares/error-handling-middleware';
import { AppError } from './utils/AppError';
import { routes } from './routes';
const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use(errorHandlingMiddleware)

export { app }