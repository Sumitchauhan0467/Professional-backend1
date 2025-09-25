import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookieParser"

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extend}))
app.use(express.static("public"))
app.use(cookieParser())


export {app}