import { NextFunction, Request, Response } from 'express'
import { errorHandler } from '../appError'
import logger from '../logger'

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message)
  errorHandler.handleError(err, res)
}
