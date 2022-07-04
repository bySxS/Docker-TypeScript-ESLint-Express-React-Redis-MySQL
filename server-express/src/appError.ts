import logger from './logger'
import { Response } from 'express'

export default class AppError extends Error {
  status!: number
  metaInfo!: string
  message!: string
  isOperational: boolean = true
  success: boolean = false

  constructor (
    message: string,
    status: number = 500,
    metaInfo: string = '',
    isOperational: boolean = false
  ) {
    super(message)
    this.status = status || 500
    this.metaInfo = metaInfo
    this.message = message
    if (this.status < 400) {
      this.success = true
    }
    this.isOperational = isOperational
    logger.error(this.message, {
      ErrorRequest: this.metaInfo
    })

    Error.captureStackTrace(this)
  }
}

class ErrorHandler {
  // private isTrustedError (error: Error): boolean {
  //   if (error instanceof AppError) {
  //     return error.isOperational
  //   }
  //   return false
  // }

  public handleError (error: Error | AppError, res?: Response): void {
    // if (this.isTrustedError(error) && res) {
    if (res) {
      this.handleTrustedError(error as AppError, res)
    }
    // } else {
    //   this.handleCriticalError(res)
    // }
  }

  private handleTrustedError (error: AppError, res: Response): void {
    res.status(error.status).json({
      message: error.message,
      success: error.success
    })
  }

  // private handleCriticalError (res?: Response): void {
  //   if (res) {
  //     res
  //       .status(HttpCode.INTERNAL_SERVER_ERROR)
  //       .json({
  //         message: 'Internal server error',
  //         success: false
  //       })
  //   }
  //
  //   console.log('Application encountered a critical error. Exiting')
  //   process.exit(1)
  // }
}

export const errorHandler = new ErrorHandler()
