import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import IndexRoutes from './routes'
import UsersRoutes from './users/users.routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from './logger'
import os from 'os'
import dotenv from 'dotenv'
// import path from 'path'
// const env: string = process.env.NODE_ENV || 'production'
dotenv.config({
  debug: true,
  override: true
  // path: path.join(__dirname, env + '.env')
})

const app = express()
const PORT = process.env.PORT

const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
const corsSetting = function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  return next()
}

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(corsSetting)
app.use(express.urlencoded({ extended: true }))
IndexRoutes(app)
UsersRoutes(app)

app.listen(PORT, () => {
  logger.info('Server started at PORT ' + PORT + ' , host: ' + os.hostname())
})
