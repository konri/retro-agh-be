import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLSchema } from 'graphql/type/schema'
import * as tq from 'type-graphql'
import bodyParser from 'body-parser'
import cors from 'cors'
import prisma from './shared/prisma'
import { RetroColumnResolver } from './Comments/resolver/RetroColumnResolver'
import { CommentResolver } from './Comments/resolver/CommentResolver'

const appInit = async () => {
  if (process.env.ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const dotenv = require('dotenv')
    dotenv.config()
    console.log('Not production build')
  } else {
    console.log('Production build!')
  }

  const app = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

  app.use(cors())

  // handle errors
  app.use((error: any, req: any, res: any, next: any) => {
    res.status(error.status || 500)
    res.json({ error })
  })

  // only for information
  app.get('/', (req, res) => {
    res.status(200).send('welcome to retro-app!')
  })

  const schema: GraphQLSchema = await tq.buildSchema({
    resolvers: [RetroColumnResolver, CommentResolver],
    emitSchemaFile: true,
  })

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, prisma }),
    playground: true,
    introspection: true,
  })

  server.applyMiddleware({ app, cors: false })

  const { PORT } = process.env
  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  })
}

appInit()
