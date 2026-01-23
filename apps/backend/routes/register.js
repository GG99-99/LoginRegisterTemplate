import { userdb } from "../db/dbManager.js";
import { userForRegister } from "../../shared/src/types/objSchemas.js";
import * as z from "zod"; 

export async function register(req, res) {
     let data = req.body

     let result = await userForRegister.safeParseAsync(data)
     if(!result.success) return res.status(401).json({"ok": false, "error": z.prettifyError(result.error)});

     let [createErr, isCreate] = await userdb.register(result.data)
     

     if(createErr) return res.status(500).json({"ok": false, "error" : createErr.message});
     if(isCreate) return res.status(200).json({"ok": true});

}