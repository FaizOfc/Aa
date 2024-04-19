import "./config.js"
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import db from './lib/database.js';
import favicon from "serve-favicon";
import all from "./routers/index.js"
import { requestLogger } from "./lib/logs.js"
import { autoDeleteTmp } from "./lib/deleteTmp.js"

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set("json spaces", 2);

app.use(favicon("public/image/icon.ico"));
app.use(requestLogger);
app.use('/assets', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(all)

app.listen(PORT, async () => {
    await dotenv.config();
    await db;
    console.log(`Server Running In http://localhost:${PORT}`);

    setInterval(() => {
        autoDeleteTmp('./public/file', 30 * 60 * 1000);
    });
});

export default app
