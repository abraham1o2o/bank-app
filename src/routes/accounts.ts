import { Router,Response,Request, response } from "express";
import { deposit, withdraw} from "../services/accountServices";
import { getTransactionsByAccountId } from "../database/transactions";
import { requireAuth } from "../session_auth/auth";
import {getAccountById , getAccountsByUserId} from "../database/accounts";

const router = Router();

router.use(requireAuth);

router.get('/my-accounts', async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const accounts = await getAccountsByUserId(userId);
        res.json(accounts);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/deposit', async (req: Request, res:Response) => {

    try { 
       
        const userId = (req as any).userId;
        const {accountId, amount} = req.body;

        if (!accountId || !amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const account = await getAccountById(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        if (account.user_id !== userId) {
            return res.status(403).json({ error: 'Access denied - not your account' });
        }

        const result = await deposit(accountId,amount);

        res.status(200).json({NewBalance: result});

    }catch(error:any) {
      res.status(400).json({error: error.message});
    }
});

router.post('/withdraw' , async ( req:Request , res:Response ) => {
    try {
        const userId = (req as any).userId;
        const {accountId,amount} = req.body;

        if (!accountId || !amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const account = await getAccountById(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        if (account.user_id !== userId) {
            return res.status(403).json({ error: 'Access denied - not your account' });
        }

        const result = await withdraw(accountId,amount);

        res.status(200).json({NewBalance: result});
    }catch(error:any) {
        res.status(400).json({error : error.message});
    }
});

router.get('/:accountId/transactions', async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const { accountId } = req.params; 

        const account = await getAccountById(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        if (account.user_id !== userId) {
            return res.status(403).json({ error: 'Access denied - not your account' });
        }
        
        const transactions = await getTransactionsByAccountId(accountId);
        
        res.status(200).json(transactions);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});



export default router;