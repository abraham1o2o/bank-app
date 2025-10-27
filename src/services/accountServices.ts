import { updateAccountBalance} from "../database/accounts";
import {createTransaction} from '../database/transactions';
import {getAccountById} from '../database/accounts';

export async function deposit(accountID:string , amount:number) {
if (amount <= 0) throw new Error('Amount cannot be negative');

const result = await updateAccountBalance(accountID,amount);

await createTransaction(accountID , "deposit" , amount , "Deposit has occured");

return result.balance;
}

export async function withdraw(accountId: string, amount: number) {
    if (amount <= 0) throw new Error('Amount must be positive');
    
    const account = await getAccountById(accountId);
    if (!account) throw new Error('Account not found');
    
    if (parseFloat(account.balance) < amount) {
        throw new Error('Insufficient funds');
    }
    
    const result = await updateAccountBalance(accountId, -amount);  
    await createTransaction(accountId, 'withdraw', amount, 'Withdrawal');
    
    return result.balance;
}