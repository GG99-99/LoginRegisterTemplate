import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from "path";

import crypto from "crypto"
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(path.join(__dirname, "concilio.db" ))



/**************************
|   MANAGER OF USER TABLE  |
 **************************/

const createUserTable = `
     create table User (
          id text primary key,
          cedula text not null unique,
          password text not null,
          firstName text not null,
          lastName text not null
     )`
db.exec(createUserTable)

export class userdb{

     static #getAll = db.prepare("select id, cedula, firstName, lastName from User")
     static #getByCedula = db.prepare("select * from User where cedula = @cedula")
     static #insert = db.prepare("insert into User (id, cedula, password, firstName, lastName) values (@id, @cedula, @password, @firstName, @lastName)")

     static async register(user){
          const ID = crypto.randomUUID()
          const hashPassword = await bcrypt.hash(password, 10)

          let added = this.#insert.run({id: ID, password:hashPassword, cedula:user.cedula,  firstName:user.firstName, lastName:user.lastName})
     }

     static async login(cedula, password){

          if(!this.validateCedula(cedula)) return false;
          const user = this.#getByCedula.get({cedula: cedula})
          const isValid = await bcrypt.compare(password, user.password)
          if (!isValid) throw new Error("Username or Password is invalid");
     }

     static validateCedula(cedula){
          
          try{
               if(cedula.length != 11) throw new Error("not correct size")
               if(!Number(cedula)) throw new Error("not number")
               return true

          }catch(e) {return false};
     }

}