import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import IndexRoutes from './routes'
import UsersRoutes from './users/users.routes'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = 3000

const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
const corsSetting = function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  return next()
}

app.use(helmet())
app.use(express.json())
app.use(cors(corsOptions))
app.use(corsSetting)
app.use(express.urlencoded({ extended: true }))
IndexRoutes(app)
UsersRoutes(app)

app.listen(PORT, () => {
  console.log('Server started at PORT 3000')
})
