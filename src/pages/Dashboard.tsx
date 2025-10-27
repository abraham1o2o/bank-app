import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { demoAccounts, demoTransactions } from '../mockData.ts'

interface Account {
  id: string
  balance: number
  created_at: string
}

interface Transaction {
  id: string
  type: 'deposit' | 'withdraw'
  amount: number
  description: string
  timestamp: string
}

const Dashboard: React.FC<{ useMock?: boolean }> = ({ useMock = false }) => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentAccountId, setCurrentAccountId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {
    if (useMock) {
      // Use demo data when in mock mode
      setAccounts(demoAccounts as unknown as Account[])
      if (demoAccounts.length > 0) {
        setCurrentAccountId(demoAccounts[0].id)
        setTransactions(demoTransactions as unknown as Transaction[])
      }
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/accounts/my-accounts', {
        credentials: 'include'
      })
      
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login'
          return
        }
        throw new Error('Failed to load accounts')
      }
      
      const accountsData = await response.json()
      setAccounts(accountsData)
      
      if (accountsData.length > 0) {
        setCurrentAccountId(accountsData[0].id)
        await loadTransactions(accountsData[0].id)
      }
    } catch (error) {
      console.error('Error loading accounts:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTransactions = async (accountId: string) => {
    if (useMock) {
      setTransactions(demoTransactions as unknown as Transaction[])
      return
    }

    try {
      const response = await fetch(`/accounts/${accountId}/transactions`, {
        credentials: 'include'
      })
      
      if (response.ok) {
        const transactionsData = await response.json()
        setTransactions(transactionsData)
      }
    } catch (error) {
      console.error('Error loading transactions:', error)
    }
  }

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentAccountId || !depositAmount) return

    const amount = parseFloat(depositAmount)
    if (amount <= 0) {
      alert('Amount must be positive')
      return
    }

    setIsProcessing(true)
    try {
      if (useMock) {
        // Update mock balance locally
        setAccounts(prev => prev.map(a => a.id === currentAccountId ? { ...a, balance: a.balance + amount } : a))
        setTransactions(prev => [{ id: `m-${Date.now()}`, type: 'deposit', amount, description: 'Demo deposit', timestamp: new Date().toISOString() }, ...prev])
        setDepositAmount('')
        setIsProcessing(false)
        return
      }

      const response = await fetch('/accounts/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ accountId: currentAccountId, amount })
      })

      const data = await response.json()

      if (response.ok) {
        alert(`Deposit successful! New balance: $${data.NewBalance.toFixed(2)}`)
        setDepositAmount('')
        await loadAccounts()
        await loadTransactions(currentAccountId)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      alert('Network error: ' + (error as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentAccountId || !withdrawAmount) return

    const amount = parseFloat(withdrawAmount)
    if (amount <= 0) {
      alert('Amount must be positive')
      return
    }

    setIsProcessing(true)
    try {
      if (useMock) {
        // Update mock balance locally
        setAccounts(prev => prev.map(a => a.id === currentAccountId ? { ...a, balance: a.balance - amount } : a))
        setTransactions(prev => [{ id: `m-${Date.now()}`, type: 'withdraw', amount, description: 'Demo withdrawal', timestamp: new Date().toISOString() }, ...prev])
        setWithdrawAmount('')
        setIsProcessing(false)
        return
      }

      const response = await fetch('/accounts/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ accountId: currentAccountId, amount })
      })

      const data = await response.json()

      if (response.ok) {
        alert(`Withdrawal successful! New balance: $${data.NewBalance.toFixed(2)}`)
        setWithdrawAmount('')
        await loadAccounts()
        await loadTransactions(currentAccountId)
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      alert('Network error: ' + (error as Error).message)
    } finally {
      setIsProcessing(false)
    }
  }

  const currentAccount = accounts.find(acc => acc.id === currentAccountId)

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            Loading your dashboard...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Welcome to Your Dashboard</h1>
          <p>Manage your finances with ease and security</p>
        </div>

        {/* Account Overview */}
        <div className="card account-overview fade-in">
          <div className="account-header">
            <h2><i className="fas fa-wallet"></i> Account Overview</h2>
            {accounts.length > 1 && (
              <select 
                value={currentAccountId || ''} 
                onChange={(e) => {
                  setCurrentAccountId(e.target.value)
                  loadTransactions(e.target.value)
                }}
                className="account-selector"
              >
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    Account #{account.id}
                  </option>
                ))}
              </select>
            )}
          </div>

          {currentAccount ? (
            <div className="account-details">
              <div className="balance-card">
                <h3>Current Balance</h3>
                <div className="balance-amount">
                  ${parseFloat(currentAccount.balance.toString()).toFixed(2)}
                </div>
                <p>Account #{currentAccount.id}</p>
              </div>
              <div className="account-info">
                <div className="info-item">
                  <i className="fas fa-calendar"></i>
                  <div>
                    <span>Account Created</span>
                    <strong>{new Date(currentAccount.created_at).toLocaleDateString()}</strong>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-chart-line"></i>
                  <div>
                    <span>Account Status</span>
                    <strong className="status-active">Active</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-accounts">
              <i className="fas fa-exclamation-circle"></i>
              <h3>No Accounts Found</h3>
              <p>It seems you don't have any accounts yet. Contact support for assistance.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-2">
          <div className="card transaction-card fade-in">
            <h2><i className="fas fa-plus-circle"></i> Make a Deposit</h2>
            <form onSubmit={handleDeposit} className="transaction-form">
              <div className="form-group">
                <label htmlFor="depositAmount">Amount</label>
                <div className="input-group">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    id="depositAmount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="form-control"
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    required
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isProcessing || !currentAccountId}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus"></i>
                    Deposit Funds
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="card transaction-card fade-in">
            <h2><i className="fas fa-minus-circle"></i> Make a Withdrawal</h2>
            <form onSubmit={handleWithdraw} className="transaction-form">
              <div className="form-group">
                <label htmlFor="withdrawAmount">Amount</label>
                <div className="input-group">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    id="withdrawAmount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="form-control"
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    max={currentAccount?.balance || 0}
                    required
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="btn btn-danger"
                disabled={isProcessing || !currentAccountId}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-minus"></i>
                    Withdraw Funds
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card transactions-section fade-in">
          <h2><i className="fas fa-history"></i> Recent Transactions</h2>
          {transactions.length > 0 ? (
            <div className="transactions-list">
              {transactions.slice(0, 10).map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">
                    <i className={`fas ${transaction.type === 'deposit' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                  </div>
                  <div className="transaction-details">
                    <h4>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</h4>
                    <p>{transaction.description || 'No description'}</p>
                    <span className="transaction-date">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${parseFloat(transaction.amount.toString()).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-transactions">
              <i className="fas fa-receipt"></i>
              <h3>No Transactions Yet</h3>
              <p>Your transaction history will appear here once you make your first deposit or withdrawal.</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="card stats-section fade-in">
          <h2><i className="fas fa-chart-bar"></i> Quick Statistics</h2>
          <div className="grid grid-4">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-wallet"></i>
              </div>
              <div className="stat-content">
                <h3>{accounts.length}</h3>
                <p>Total Accounts</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-arrow-up"></i>
              </div>
              <div className="stat-content">
                <h3>{transactions.filter(t => t.type === 'deposit').length}</h3>
                <p>Deposits</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-arrow-down"></i>
              </div>
              <div className="stat-content">
                <h3>{transactions.filter(t => t.type === 'withdraw').length}</h3>
                <p>Withdrawals</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-calendar-day"></i>
              </div>
              <div className="stat-content">
                <h3>{transactions.filter(t => {
                  const today = new Date()
                  const transactionDate = new Date(t.timestamp)
                  return transactionDate.toDateString() === today.toDateString()
                }).length}</h3>
                <p>Today's Transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
