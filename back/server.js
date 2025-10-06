import express from "express";
import dotenv from "dotenv"
import connectDb from "./utils/connectDb.js";
import authRoute from "./route/auth.route.js"
import dashBoard from './route/dash.route.js'
import cors from "cors"
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api",dashBoard)


app.listen(process.env.PORT,()=>{
    console.log("server is running on port ", process.env.PORT);
    connectDb();
})