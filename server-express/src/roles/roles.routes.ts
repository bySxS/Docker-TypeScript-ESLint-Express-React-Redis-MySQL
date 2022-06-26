import { Express } from 'express'
// import { check } from "express-validator"
import { RoleMiddleware } from '../middleware/role'
import RolesController from './roles.controller'

function RolesRoutes (app: Express) {
  app.post('/add_role', RoleMiddleware('admin'), RolesController.AddRole)
}

export default RolesRoutes
