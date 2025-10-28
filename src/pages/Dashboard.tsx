import React, { useState, useEffect } from 'react'
import CardDetails from '../components/CardDetails'
import { deposit as demoDeposit, withdraw as demoWithdraw, getStore } from '../demoStore'
import './Dashboard.css'

interface Account {
  id: string
  name?: string
  balance: number
}

interface Transaction {
  id: string
  type: 'deposit' | 'withdraw'
  amount: number
  description: string
  timestamp: string
  accountId?: string
}

const DEMO_STORAGE_KEY = 'demo_bank_v1'

interface DemoStore {
  accounts: Account[]
  transactions: Transaction[]
}

const Dashboard: React.FC<{ useMock?: boolean; currentAccountId?: string }> = ({ useMock = false, currentAccountId: initialAccountId }) => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentAccountId, setCurrentAccountId] = useState<string | null>(null)
  const [showCardDetails, setShowCardDetails] = useState<'deposit' | 'withdraw' | null>(null)
  const [pendingAmount, setPendingAmount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    loadAccounts()
  }, [])

  const loadAccounts = async () => {
    if (useMock) {
      // Use localStorage-backed demo data when in mock mode
      const storeRaw = localStorage.getItem(DEMO_STORAGE_KEY)
      let store: DemoStore | null = null

      if (storeRaw) {
        try {
          store = JSON.parse(storeRaw) as DemoStore
        } catch (err) {
          console.warn('Failed to parse demo store, reseeding', err)
        }
      }

      if (!store || !Array.isArray(store.accounts) || store.accounts.length === 0) {
        // Seed with two static users John and Ben with $1000 balance
        store = {
          accounts: [
            { id: 'acct-john', name: 'John', balance: 1000 },
            { id: 'acct-ben', name: 'Ben', balance: 1000 }
          ],
          transactions: []
        }
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(store))
      }

      if (store) {
        // Only expose the logged-in account (don't show other accounts)
        if (initialAccountId) {
          setAccounts(store.accounts.filter(a => a.id === initialAccountId))
          setCurrentAccountId(initialAccountId)
          setTransactions(store.transactions.filter(t => (t as any).accountId === initialAccountId))
        } else {
          // no account supplied by app - keep dashboard empty (requires login)
          setAccounts([])
          setCurrentAccountId(null)
          setTransactions([])
        }
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
      const storeRaw = localStorage.getItem(DEMO_STORAGE_KEY)
      if (storeRaw) {
        try {
          const store = JSON.parse(storeRaw) as DemoStore
          const txs = store.transactions.filter(t => (t as any).accountId === accountId)
          setTransactions(txs)
        } catch (err) {
          console.warn('Failed to parse demo transactions', err)
          setTransactions([])
        }
      } else {
        setTransactions([])
      }
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
    // open card details modal as the payment source
    setPendingAmount(amount)
    setShowCardDetails('deposit')
    setDepositAmount('')
  }

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentAccountId || !withdrawAmount) return

    const amount = parseFloat(withdrawAmount)
    if (amount <= 0) {
      alert('Amount must be positive')
      return
    }
    const acct = accounts.find(a => a.id === currentAccountId)
    if (acct && amount > acct.balance) {
      alert('Insufficient funds')
      return
    }

    // open card details modal as the withdrawal source
    setPendingAmount(amount)
    setShowCardDetails('withdraw')
    setWithdrawAmount('')
  }

  const handleCardDetailsSubmit = async (cardDetails: any) => {
    if (!currentAccountId) return
    setIsProcessing(true)
    try {
      if (useMock) {
        if (showCardDetails === 'deposit') {
          demoDeposit(currentAccountId, pendingAmount, `Card deposit - ****${cardDetails.cardNumber.slice(-4)}`)
        } else {
          const res = demoWithdraw(currentAccountId, pendingAmount, `Card withdrawal - ****${cardDetails.cardNumber.slice(-4)}`)
          if ((res as any).success === false) {
            alert((res as any).error || 'Withdrawal failed')
            setIsProcessing(false)
            return
          }
        }

        // Refresh local view from store
        const store = getStore()
        setAccounts(store.accounts.filter(a => a.id === currentAccountId))
        setTransactions(store.transactions.filter(t => t.accountId === currentAccountId))
        setShowCardDetails(null)
        alert(`${showCardDetails === 'deposit' ? 'Deposit' : 'Withdrawal'} successful!`)
        return
      }

      // TODO: call real API endpoint to process card-based deposit/withdrawal
      alert('Transaction submitted (demo mode off)')
      setShowCardDetails(null)
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
          <h1>Welcome to Your Account{currentAccount?.name ? `, ${currentAccount.name}` : ''}</h1>
          <p>Your trusted banking partner for secure and easy transactions</p>
        </div>

        {/* Account Overview */}
        <div className="card account-overview fade-in">
          <div className="account-header">
            <h2><i className="fas fa-wallet"></i> Account Overview</h2>
            <div className="last-login">
              <i className="fas fa-clock"></i>
              Last login: {new Date().toLocaleString()}
            </div>
          </div>

          {currentAccount ? (
            <div className="account-details">
              <div className="balance-card">
                <h3>Current Balance</h3>
                <div className="balance-amount">
                  ${parseFloat(currentAccount.balance.toString()).toFixed(2)}
                </div>
                <p>Account Holder: {currentAccount.name || currentAccount.id}</p>
                <p>Account #{currentAccount.id}</p>
              </div>
              <div className="account-info">
                {/* Created date removed for privacy */}
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
          <div className="transaction-cards-container fade-in">
            <div className="card transaction-card deposit-card">
              <div className="transaction-card-header">
                <i className="fas fa-plus-circle"></i>
                <h2>Make a Deposit</h2>
                <p>Add funds to your account</p>
              </div>
              <form onSubmit={handleDeposit} className="transaction-form">
                <div className="form-group">
                  <label htmlFor="depositAmount">Enter Amount to Deposit</label>
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

            <div className="card transaction-card withdraw-card">
              <div className="transaction-card-header">
                <i className="fas fa-minus-circle"></i>
                <h2>Make a Withdrawal</h2>
                <p>Withdraw funds from your account</p>
              </div>
              <form onSubmit={handleWithdraw} className="transaction-form">
                <div className="form-group">
                  <label htmlFor="withdrawAmount">Enter Amount to Withdraw</label>
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
                  <span className="balance-note">Available Balance: ${currentAccount?.balance.toFixed(2) || '0.00'}</span>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-outline"
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
          <div className="grid grid-3">
            {/* Total Accounts stat removed for privacy */}
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
        {/* Card Details Modal (source verification for deposit/withdraw) */}
        {showCardDetails && (
          <CardDetails
            type={showCardDetails}
            amount={pendingAmount}
            onSubmit={handleCardDetailsSubmit}
            onCancel={() => setShowCardDetails(null)}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
