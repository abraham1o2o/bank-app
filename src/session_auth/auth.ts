import { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const userId = (req.session as any).userId;
    
    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    
    (req as any).userId = userId;
    next(); 
}