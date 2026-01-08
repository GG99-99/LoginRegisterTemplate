import express from 'express'
import { userdb } from '../db/dbManager.js'

export const router = express.Router()


router.post("/login", function (req, res){
     console.log(req.body)
})

