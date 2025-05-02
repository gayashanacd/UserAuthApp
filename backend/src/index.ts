import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./auth";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log(typeof authRoutes); 

app.use('/auth', authRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT}`);
});