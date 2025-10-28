export const DEMO_STORAGE_KEY = 'demo_bank_v1'

interface Account {
  id: string
  name?: string
  balance: number
  created_at: string
}

interface Transaction {
  id: string
  type: 'deposit' | 'withdraw'
  amount: number
  description: string
  timestamp: string
  accountId?: string
}

interface User {
  email: string
  password: string
  accountId: string
}

interface DemoStore {
  accounts: Account[]
  transactions: Transaction[]
  users: User[]
}

interface CreateAccountResult {
  success: boolean
  error?: string
  accountId?: string
}

function defaultStore(): DemoStore {
  const now = new Date().toISOString()
  return {
    accounts: [
      { id: 'acct-john', name: 'John', balance: 1000, created_at: now },
      { id: 'acct-ben', name: 'Ben', balance: 1000, created_at: now }
    ],
    transactions: [],
    users: [
      { email: 'john@email.com', password: 'password123', accountId: 'acct-john' },
      { email: 'ben@email.com', password: 'secret456', accountId: 'acct-ben' }
    ]
  }
}

export function ensureSeed(): DemoStore {
  const raw = localStorage.getItem(DEMO_STORAGE_KEY)
  if (raw) {
    try {
      const s = JSON.parse(raw) as DemoStore
      if (s && Array.isArray(s.accounts) && Array.isArray(s.users)) return s
    } catch (err) {
      // fall through to reseed
    }
  }
  const s = defaultStore()
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(s))
  return s
}

export function getStore(): DemoStore {
  return ensureSeed()
}

export function authenticate(email: string, password: string): { success: boolean; accountId?: string; error?: string } {
  const store = ensureSeed()
  const user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return { success: false, error: 'Invalid credentials' }
  if (user.password !== password) return { success: false, error: 'Invalid credentials' }
  return { success: true, accountId: user.accountId }
}

export function createAccount(email: string, password: string, name?: string): CreateAccountResult {
  if (!email || !password) return { success: false, error: 'Email and password are required' }
  if (password.length < 8) return { success: false, error: 'Password must be at least 8 characters' }

  const store = ensureSeed()
  
  // Check if email already exists
  if (store.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'Email already registered' }
  }

  // Create new account with 0 balance
  const now = new Date().toISOString()
  const accountId = `acct-${Date.now()}`
  const account: Account = {
    id: accountId,
    name: name || email.split('@')[0], // use part before @ if no name given
    balance: 0,
    created_at: now
  }

  // Create new user
  const user: User = {
    email,
    password,
    accountId
  }

  // Update store
  store.accounts.push(account)
  store.users.push(user)
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(store))

  return { success: true, accountId }
}

export function getAccounts() {
  return ensureSeed().accounts
}

export function getTransactionsFor(accountId: string) {
  return ensureSeed().transactions.filter(t => t.accountId === accountId)
}

export function deposit(accountId: string, amount: number, description = 'Deposit') {
  const store = ensureSeed()
  store.accounts = store.accounts.map(a => a.id === accountId ? { ...a, balance: a.balance + amount } : a)
  const tx: Transaction = { id: `m-${Date.now()}`, type: 'deposit', amount, description, timestamp: new Date().toISOString(), accountId }
  store.transactions = [tx, ...store.transactions]
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(store))
  return { newBalance: store.accounts.find(a => a.id === accountId)?.balance }
}

export function withdraw(accountId: string, amount: number, description = 'Withdrawal') {
  const store = ensureSeed()
  const acct = store.accounts.find(a => a.id === accountId)
  if (!acct) return { success: false, error: 'Account not found' }
  if (acct.balance < amount) return { success: false, error: 'Insufficient funds' }
  store.accounts = store.accounts.map(a => a.id === accountId ? { ...a, balance: a.balance - amount } : a)
  const tx: Transaction = { id: `m-${Date.now()}`, type: 'withdraw', amount, description, timestamp: new Date().toISOString(), accountId }
  store.transactions = [tx, ...store.transactions]
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(store))
  return { success: true, newBalance: store.accounts.find(a => a.id === accountId)?.balance }
}

export function resetDemo() {
  const s = defaultStore()
  localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(s))
  return s
}
