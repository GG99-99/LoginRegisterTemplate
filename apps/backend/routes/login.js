
import "dotenv/config";
import jwt from "jsonwebtoken";
import { userdb } from "../db/dbManager.js";
import { handle } from "../utils/promises/handle.js";

function createToken(data){
     return jwt.sign(data, process.env.SECRET_JWT_KEY, {expiresIn: "1h"});
}
export async function login(req, res) {

    
        let data = req.body;
        let [err, userData] = await userdb.login({
            cedula: data.cedula,
            password: data.password,
        })

        if(err){
            res.clearCookie("jwt_token");
            return res.status(401).json({
                error: "Unauthorized",
                message: "Credenciales Incorrectas",
            });
        }

        let token = createToken(userData)

        res.cookie("jwt_token", token, {
            httpOnly: true, // con esto la cookie solo sera accesible desde el servidor
            secure: process.env.NODE_ENV === "production", // para que solo funcione con https
            sameSite: "strict", // el token solo se puede acceder en el mismo dominio
            maxAge: 1000 * 60 * 60,
        });

        res.send({userData})

    
}