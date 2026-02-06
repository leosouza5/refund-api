import express from 'express';
import cors from 'cors';
import { errorHandlingMiddleware } from './middlewares/error-handling-middleware';
import uploadConfig from "@/configs/upload";
import { routes } from './routes';
const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)
app.use(errorHandlingMiddleware)

export { app }