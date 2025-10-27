import { Router, Request, Response } from "express";
import { register, login } from '../services/authServices';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);

         (req.session as any).userId = result.userId;

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password, fullName } = req.body;
        const result = await register(email, password, fullName);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/logout', (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

export default router;