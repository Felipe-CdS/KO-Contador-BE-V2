import dotenv from "dotenv";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";

import "./database";

dotenv.config(); // Env vars setup

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({ error: err.message });
    }

    return response.status(500).json({ 
        status: "error",
        message: "Interal Server Error"
    });
});

app.listen(process.env.PORT || 3000, () => { console.log("Server Up!") });

