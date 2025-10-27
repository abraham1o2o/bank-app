import { pool } from './connections';

export async function createTransaction(
    accountId: string,
    type: 'deposit' | 'withdraw',
    amount: number,
    description?: string
) {
    const result = await pool.query(
        'INSERT INTO transactions (account_id, type, amount, description) VALUES ($1, $2, $3, $4) RETURNING id',
        [accountId, type, amount, description || null]
    );
    return result.rows[0].id;
}

export async function getTransactionsByAccountId(accountId: string) {
    const result = await pool.query(
        'SELECT * FROM transactions WHERE account_id = $1 ORDER BY timestamp DESC',
        [accountId]
    );
    return result.rows;
}