import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { compare } from "bcrypt";
import z from "zod";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

export class SessionsController {
  async create(req: Request, res: Response) {
    const body = z.object({
      email: z.email({ message: "E-mail inválido" }),
      password: z.string()
    })

    const { email, password } = body.parse(req.body)

    const user = await prisma.user.findFirst({
      where: { email }
    })

    if (!user) {
      throw new AppError("E-mail ou senha inválidos")
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválidos")
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn: expiresIn
    })

    const { password: _, ...userWithoutPassword } = user

    return res.json({ token, user: userWithoutPassword })
  }
}