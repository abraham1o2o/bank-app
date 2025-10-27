import { pool } from './connections';

export async function createAccount(userID: string, balance?: number) {
  balance = balance ?? 0;
  const query = `
    INSERT INTO accounts (user_id, balance)
    VALUES ($1, $2)
    RETURNING id, balance, created_at
  `;
  const result = await pool.query(query, [userID, balance || null]);
  return result.rows[0];
}

export async function getAccountsByUserId(userID: string) {
  const query = 'SELECT id, balance, created_at FROM accounts WHERE user_id = $1';
  const result = await pool.query(query, [userID]);
  return result.rows; 
}


export async function updateAccountBalance(accountID: string, amount: number) {
  const query = `
    UPDATE accounts
    SET balance = balance + $1
    WHERE id = $2
    RETURNING id, balance
  `;
  const result = await pool.query(query, [amount, accountID]);
  return result.rows[0] || null;
}


export async function getAccountById(accountID: string) {
  const query = 'SELECT id, user_id, balance, created_at FROM accounts WHERE id = $1';
  const result = await pool.query(query, [accountID]);
  return result.rows[0] || null;
}

