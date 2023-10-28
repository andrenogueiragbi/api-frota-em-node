import express from 'express';
import routes from './routes.js';
import db from './database/index.js';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);
app.use(morgan('combined'));



await db.sync();


app.listen(process.env.PORT || 3000, () => {

    console.log(`👉 Servidor run port ${process.env.PORT || 3000} 🟢`)}

);
