import { Express, NextFunction, Request, Response } from 'express'
import os from 'os'
import AppError from './appError'

function IndexRoutes (app: Express) {
  app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'Hello World this GET , host: ' + os.hostname(),
      success: true
    })
  })

  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Request URL ${req.path} not found!`, 404)
  })
}

export default IndexRoutes
