import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import { attachJsonApiSender } from './middlewares/attachJsonApiSender'
import errorHandlingMiddleware from './middlewares/errorHandling.middleware'
import authRouter from './routers/auth.router'
import categoryRouter from './routers/category.router'
import noMatchRouter from './routers/noMatch.router'
import productRouter from './routers/product.router'
import userRouter from './routers/user.router'
import { jsonApiBodyValidatorAndFormatter } from './utils/jsonApiBodyValidatorAndFormatter'
import { wrapAsyncHandler } from './utils/wrapAsyncHandler'

const fs = require('fs')
const cors = require('cors')
export const app = express()
const xmlparser = require('express-xml-bodyparser')
const apiRouter = express.Router()
const v1 = express.Router()
app.use(cors())
app.use('/api', apiRouter)
apiRouter.use('/v1', v1)
app.set('view engine', 'ejs')

v1.use(
  attachJsonApiSender,
  bodyParser.text(),
  bodyParser.json({ limit: '5mb' }),
  xmlparser({
    explicitArray: false,
    normalize: false,
    normalizeTags: false,
    trim: true,
    mergeAttrs: true,
  }),
  jsonApiBodyValidatorAndFormatter,
  express.urlencoded({ limit: '5mb', extended: true })
)
// NOTE: TEMPORARY FIX

v1.use('/auth', authRouter)
v1.use('/categories', categoryRouter)
v1.use('/products', productRouter)
v1.use('/users', userRouter)
v1.use('/', noMatchRouter)
v1.use(errorHandlingMiddleware)

let pathToClientBuild = path.resolve(__dirname, '..', 'build')
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
  pathToClientBuild = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'client_v3',
    'build'
  )
}

app.use('/static', express.static(path.resolve(pathToClientBuild, 'static')))

app.get(
  '/*',
  wrapAsyncHandler(async (_, res) => {
    res.sendFile(path.resolve(pathToClientBuild, 'index.html'))
  })
)
