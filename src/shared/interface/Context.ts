import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { Request } from 'express'
import { PrismaClient } from '@prisma/client'

export interface Context extends ExpressContext {
  req: Request
  prisma: PrismaClient
}
