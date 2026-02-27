import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import z from "zod";

const CategoriesEnum = z.enum(["food", "others", "services", "transport", "accommodation"])

export class RefundsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(1, { message: "Nome é obrigatório" }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: "O valor deve ser positivo" }),
      filename: z.string().trim().min(20, { message: "O nome do arquivo é obrigatório" }),
    })

    const { name, category, amount, filename } = bodySchema.parse(req.body)
    console.log(req.user);

    if (!req.user?.id) {
      throw new AppError("Unauthorized", 401)
    }

    const refund = await prisma.refunds.create({
      data: { name, category, amount, filename, userId: req.user!.id }
    })

    return res.json({ refund })
  }

  async index(req: Request, res: Response) {
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    })

    const { name, page, perPage } = querySchema.parse(req.query)

    const skip = (page - 1) * perPage

    const refunds = await prisma.refunds.findMany(
      {
        skip,
        take: perPage,
        where:
        {
          user: {
            name:
              { contains: name.trim() }
          }
        },
        orderBy: { createdAt: "desc" },
        include: { user: true }
      }
    )

    const totalRecords = await prisma.refunds.count({
      where:
      {
        user: {
          name:
            { contains: name.trim() }
        }
      },

    })

    const totalPages = Math.ceil(totalRecords / perPage)
    res.json({
      refunds,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
      }
    })
  }

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid()
    })

    const { id } = paramsSchema.parse(req.params)

    const refund = await prisma.refunds.findUnique({
      where: { id },
      include: { user: true }
    })

    return res.json( refund)
  }
}