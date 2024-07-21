import bodyParser from 'body-parser'
import 'dotenv/config'
import express from 'express'
import './middlewares/auth/configurePassport'
import errorHandlingMiddleware from './middlewares/errorHandling.middleware'
import authRouter from './routers/auth.router'
import noMatchRouter from './routers/noMatch.router'
import productRouter from './routers/product.router'
import userRouter from './routers/user.router'
import extendResponseSender from './utils/extendResponseSender'

const app = express()

app.use(extendResponseSender, bodyParser.json())
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/', noMatchRouter)
app.use(errorHandlingMiddleware)

export default app
