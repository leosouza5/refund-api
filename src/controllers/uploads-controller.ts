import { Request, Response } from "express";
import z, { ZodError } from "zod";

import uploadConfig from "@/configs/upload";
import { DiskStorage } from "@/providers/disk-storage";
import { AppError } from "@/utils/AppError";

export class UploadsController {
  async create(req: Request, res: Response) {
    const diskStorage = new DiskStorage()

    try {
      const fileSchema = z.object({
        filename: z.string().min(1, "Arquivo é obrigatório"),
        mimetype: z.string().refine((type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type), "Formato de arquivo não suportado"),
        size: z.number().positive().refine((size) => size <= uploadConfig.MAX_FILE_SIZE, `O arquivo deve ter no máximo ${uploadConfig.MAX_SIZE} MB`)
      }).loose()

      const file = fileSchema.parse(req.file)
      const filename = await diskStorage.saveFile(file.filename)
      res.json({ filename })
    } catch (error) {

      if (error instanceof ZodError) {
        if (req.file) {
          await diskStorage.deleteFile(req.file.filename, "tmp")
        }
        throw new AppError(error.issues[0].message)
      }

      throw error
    }

  }
}