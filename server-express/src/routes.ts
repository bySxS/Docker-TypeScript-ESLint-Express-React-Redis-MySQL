import { Express, Request, Response } from 'express'
import os from 'os'
// import {check} from "express-validator";

function IndexRoutes (app: Express) {
  app.get('/', (req: Request, res: Response) => {
    return res.status(200).send('Hello World this GET , host: ' + os.hostname())
  })

  app.post('/', (req: Request, res: Response) => {
    return res.status(200).json({
      ip: req.ip,
      message: 'Hello World this POST'
    })
  })
}

export default IndexRoutes
