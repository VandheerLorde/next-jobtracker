import { PrismaClient } from "@prisma/client"

const globalForPrima = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrima.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrima.prisma = db