export interface MockAccount {
  id: string
  balance: number
  created_at: string
}

export interface MockTransaction {
  id: string
  type: 'deposit' | 'withdraw'
  amount: number
  description: string
  timestamp: string
}

export const demoAccounts: MockAccount[] = [
  {
    id: '1001',
    balance: 1250.5,
    created_at: new Date().toISOString()
  }
]

export const demoTransactions: MockTransaction[] = [
  {
    id: 't1',
    type: 'deposit',
    amount: 500,
    description: 'Initial deposit',
    timestamp: new Date().toISOString()
  },
  {
    id: 't2',
    type: 'withdraw',
    amount: 50,
    description: 'Coffee',
    timestamp: new Date().toISOString()
  }
]
