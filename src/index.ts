import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json()); 

app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION || 'fhsjahfhfh' ,
    resave:false ,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true,  
        maxAge: 24 * 60 * 60 * 1000 
    }
}))

app.get('/', (req: Request, res: Response) => {
    res.redirect('/login.html');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
