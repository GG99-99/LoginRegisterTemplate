
import "dotenv/config";
import jwt from "jsonwebtoken";

export async function validate(req, res){
     let token = req.cookies.jwt_token
     if(!token) return res.status(401).json({error: "InvalidToken"}) ;

     try {
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
        return res.status(200).json(data)  

      }catch(err){ 
        res.clearCookie("jwt_token")
        return res.status(401).json({error: "InvalidToken"}) 
      }
}