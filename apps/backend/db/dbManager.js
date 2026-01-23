import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";

import crypto from "crypto"
import bcrypt from "bcrypt"

import { userForRegister, userPublic } from '../../shared/src/types/objSchemas.js';
import { handle } from '../../shared/src/utils/handle.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const db = new Database(path.join(__dirname, "database.db" ))



/**************************
|   MANAGER OF USER TABLE  |
 **************************/

const createUserTable = `
     create table User (
          id text primary key,
          cedula text not null unique,
          password text not null,
          firstName text not null,
          lastName text not null,
          rol text not null default normal
     )`
// db.exec(createUserTable)

export class userdb{

     static #getAll = db.prepare("select id, cedula, firstName, lastName from User")
     static #getByCedula = db.prepare("select * from User where cedula = @cedula")
     static #insert = db.prepare("insert into User (id, cedula, password, firstName, lastName) values (@id, @cedula, @password, @firstName, @lastName)")

     // return [err, bool]
     static async register(user){
          let result = await userForRegister.safeParseAsync(user)
          if(!result.success) return [result.error, null];


          if(this.validateExistCedula(user.cedula)) return [new Error("La cedula ya existe"), null]

          const ID = crypto.randomUUID()
          let hashPassword = await this.hashPassword(user.password, user.cedula);
         

          this.#insert.run({
               id: ID, 
               password:hashPassword, 
               cedula: user.cedula,  
               firstName: user.firstName, 
               lastName:user.lastName
          })

          return [null, true]
     }

     // return [err, userPublic]
     static async login(data){
          if(!this.validateSyntaxCedula(data.cedula)) return [new Error("Usuario o clave incorrectos"), null];

          const user = this.#getByCedula.get({cedula: data.cedula})
          if(!user) return [new Error("Usuario o clave incorrectos"), null];

          const [compareErr, isValid] = await handle(bcrypt.compare(data.password, user.password))
          if (!isValid || compareErr) return [new Error("Usuario o clave incorrectos"), null];

          return [null, userPublic.parse(user)]
          
     }


     static async hashPassword(password, cedula){
          if(password.trim() === "") password = cedula.slice(-4);
          let hashPassword = await bcrypt.hash(password, 10)
          return hashPassword

     }

     static validateExistCedula(cedula){
          let exist = this.#getByCedula.all({cedula: cedula})
          if(exist.length === 0) return false
          return true
     }

     static validateSyntaxCedula(cedula){
             return /^\d+$/.test(cedula)
     }
}