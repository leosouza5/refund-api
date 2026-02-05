import { Request, Response } from "express";

export class RefundsController {
  async create(req: Request, res: Response) {
    return res.json({ message: "ok" })
  }
}