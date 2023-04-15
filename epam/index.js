import express from 'express'
import config from 'config'
import cors from 'cors'
import {authRouter} from './routes/auth.routes.js'
import {dataRouter} from './routes/data.routes.js'
import {requestRoutes} from './routes/request.routes.js';
import * as bodyParser from "express";
import mongoose from "mongoose";

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json({extended: true}))

app.use('/api/requests', requestRoutes);
app.use('/api/auth', authRouter)
app.use('/api/data', dataRouter)
const PORT = config.get('port') || 5000

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port http://localhost:${PORT})`))
    } catch (e) {
        console.error('Server error:', e.message)
        process.exit(1)
    }
}
start()