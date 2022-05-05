import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import startRoutes from "./start/routes";
import connectMongoDB from "./database/mongo";
import startMiddleware from "./start/middelware";
import { createServer } from 'http';

// Environment variables
dotenv.config({ path: './src/configs/.env' });

// Init Variables
const app = express();
const port = process.env.PORT || 5000;
const server = createServer(app);

//Database
connectMongoDB();

// Middlewares
startMiddleware(app);

// Routes
startRoutes(app);

//Cookie parser
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});