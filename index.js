import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import "dotenv/config.js"
import seq from "./db.js";
import router from "./routes/index.js";
import { errMiddleware } from "./midddlewares/error-middleware.js";

const PORT = process.env.PORT || 7000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errMiddleware)

const start = async () => {
    try{
        await seq.authenticate()
        await seq.sync()
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (err){
        console.log(err)
    }
}

start()