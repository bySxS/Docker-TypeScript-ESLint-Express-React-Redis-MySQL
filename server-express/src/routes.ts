import { Express, Request, Response } from 'express'
// import {check} from "express-validator";

function IndexRoutes (app: Express) {
  app
    .route('/')
    .get((req: Request, res: Response) => {
      return res.status(200).send('Hello World this GET')
    })
    .post((req: Request, res: Response) => {
      return res.status(200).json({
        ip: req.ip,
        message: 'Hello World this POST'
      })
    })

  app.get('/fenixx', (req: Request, res: Response) => {
    res.status(301).redirect('https://fenixx-repack.3dn.ru')
  })
}

export default IndexRoutes
