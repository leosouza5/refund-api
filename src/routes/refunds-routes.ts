import { RefundsController } from "@/controllers/refunds-controller";
import { ensureAuthorized } from "@/middlewares/ensure-authorized-middleware";
import { Router } from "express";

const refundsRoutes = Router()
const refundsController = new RefundsController()

refundsRoutes.post(
  "/",
  ensureAuthorized(["employee"]),
  refundsController.create
)

refundsRoutes.get(
  "/",
  ensureAuthorized(["manager"]),
  refundsController.index
)

refundsRoutes.get(
  "/:id",
  ensureAuthorized(["manager", "employee"]),
  refundsController.show
)

export { refundsRoutes }