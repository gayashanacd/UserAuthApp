import { Router, Request, Response } from "express";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; 

dotenv.config();

const router = Router();

interface User {
    username : string;
    email : string;
    password : string;
};

let users: User[] = []

router.post("/register", async(req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if(users.some(user => user.username === username)){
        res.status(400).json({ message : "User already exists !"});
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    users.push({ username, email, password : hashedPassword });
     res.status(201).json({ message : "User created successfully !"});
});

router.post("/login", async(req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if(!user){
         res.status(400).json({ message : "Invalid username or password !"});  
    }

    if(user){
        const isMatch = await bycrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({ message : "Invalid username or password !"});  
        }
    }
    const token = jwt.sign({username : username}, process.env.JWT_SECRET!, { expiresIn: '1h' });

     res.status(200).json({token});
});

router.get("/profile", async(req: Request, res: Response) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        res.status(401).json({ message : "Access denied !"});     
    }

    try{
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
            if (!decoded || typeof decoded !== 'object' || !decoded.username) {
                res.status(400).json({ message: "Invalid token payload!" });
            }
            const user = users.find((user) => user.username === decoded.username);
            if (!user) {
                 res.status(404).json({ message: 'User not found' });
            } else {
                res.status(201).json({ username : user.username, email : user.email });
            }
        }
    }
    catch(error){
        res.status(400).json({ message : "Invalid token !" });   
    }
});

export default router;
