import express from "express";
import "dotenv/config";

import {login} from "./login.js"
import {validate} from "./validate.js"
import { register } from "./register.js";


export const router = express.Router();

router
.get("/validate", validate)
.post("/login", login)
.post("/register", register)