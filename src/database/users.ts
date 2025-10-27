import {pool} from './connections';
export async function createUser(email: string, passwordHash : string, fullName: string) {
const result = await pool.query('INSERT INTO users (email,password_hash,full_name) VALUES ($1,$2,$3) RETURNING id' ,
     [email,passwordHash,fullName]);
     return result.rows[0].id;
};

export async function getUserByEmail(email:string){
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query,[email]);
    return result.rows[0] || null;
};

export async function getUserById(id:string) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query,[id]);
    return result.rows[0] || null;
};

export async function deleteUserById(id:string){
    try {

    const query = 'DELETE FROM users WHERE id = $1';
    const result = await pool.query(query,[id]);
    return result.rowCount! > 0;
    
      }catch (error) {
       console.error('error deleting user: ', error);
       return false;
    }
   
    
};

