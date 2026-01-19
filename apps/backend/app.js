import express from 'express'
import path from 'path'
import 'dotenv/config'
import { fileURLToPath } from "url";
import { dirname } from "path";
import { router as apiRouter } from './routes/apiRoutes.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 3000


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use("/api", apiRouter)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')))


app.get('/*catchall',(req, res) => {    
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(` Running on http://localhost:${PORT}`)
})