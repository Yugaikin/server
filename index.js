import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import "dotenv/config.js"
import seq from "./db.js";
import router from "./routes/index.js";
import { errMiddleware } from "./midddlewares/error-middleware.js";

const PORT = process.env.PORT || 7000

const app = express()

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
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