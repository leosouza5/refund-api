import { Router } from "express"
import multer from "multer"

import { UploadsController } from "@/controllers/uploads-controller"
import { ensureAuthorized } from "@/middlewares/ensure-authorized-middleware"
import uploadConfig from "@/configs/upload"

const uploadsRoutes = Router()
const uploadsController = new UploadsController()

const upload = multer(uploadConfig.MULTER)

uploadsRoutes.use(ensureAuthorized(["employee"]))
uploadsRoutes.post("/", upload.single("file"), uploadsController.create)

export { uploadsRoutes }
