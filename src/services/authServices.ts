import * as bcrypt from 'bcrypt';
import {createUser,getUserByEmail} from '../database/users';
import {createAccount} from '../database/accounts';

export async function register(email:string, password:string, full_name:string) {
 
    const exits = await getUserByEmail(email);
    if (exits) throw new Error('Email exits, Would you like to sign in');

    const hashed = await bcrypt.hash(password,10);

    const userCreation = await createUser(email,hashed,full_name);

    const accountCreation = await createAccount(userCreation);

    return { userCreation , accountCreation };

}

export async function login(email:string, password:string) {
    const user = await getUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const authen = await bcrypt.compare(password,user.password_hash);
    if (!authen) throw new Error('Invalid credentials');
    
    return { userId: user.id, email: user.email, fullName: user.full_name };
}