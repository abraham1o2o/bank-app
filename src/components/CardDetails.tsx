import React, { useState } from 'react'
import './CardDetails.css'

interface CardDetailsProps {
  onSubmit: (cardDetails: {
    cardNumber: string
    expiryDate: string
    cvv: string
    cardHolderName: string
  }) => void
  onCancel: () => void
  type: 'deposit' | 'withdraw'
  amount: number
}

const CardDetails: React.FC<CardDetailsProps> = ({ onSubmit, onCancel, type, amount }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  })

  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate card number (Luhn algorithm)
    const cardNumberValid = /^[0-9]{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))
    const expiryValid = /^(0[1-9]|1[0-2])\/([2-9][0-9])$/.test(cardDetails.expiryDate)
    const cvvValid = /^[0-9]{3}$/.test(cardDetails.cvv)
    const nameValid = cardDetails.cardHolderName.trim().length > 0

    const newErrors = {
      cardNumber: cardNumberValid ? '' : 'Invalid card number',
      expiryDate: expiryValid ? '' : 'Invalid expiry date (MM/YY)',
      cvv: cvvValid ? '' : 'Invalid CVV',
      cardHolderName: nameValid ? '' : 'Please enter cardholder name'
    }

    setErrors(newErrors)

    if (cardNumberValid && expiryValid && cvvValid && nameValid) {
      onSubmit(cardDetails)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts = []
    
    for (let i = 0; i < v.length && i < 16; i += 4) {
      parts.push(v.slice(i, i + 4))
    }
    
    return parts.join(' ')
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4)
    }
    return v
  }

  return (
    <div className="card-details-modal">
        <div className="card-details-content">

          <div className="amount-display">
            <span>{type === 'deposit' ? 'Deposit' : 'Withdraw'} Amount: </span>
            <strong>${amount.toFixed(2)}</strong>
          </div>

          <div className="credit-card-display">
          <div className="card-front">
            <div className="card-type">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0iI2ZmZCI+PHBhdGggZD0iTTggOGgzMnYzMkg4eiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZkNzAwIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTIgMTJoMjR2MjRIMTJ6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmQ3MDAiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==" alt="Chip" className="chip-image" />
              <i className="fas fa-wifi rotate-90"></i>
            </div>
            <div className="card-number">
              {cardDetails.cardNumber || '•••• •••• •••• ••••'}
            </div>
            <div className="card-info">
              <div className="card-holder">
                <span>Card Holder</span>
                <div>{cardDetails.cardHolderName || 'YOUR NAME HERE'}</div>
              </div>
              <div className="card-expiry">
                <span>Expires</span>
                <div>{cardDetails.expiryDate || 'MM/YY'}</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-form">
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({
                ...cardDetails,
                cardNumber: formatCardNumber(e.target.value)
              })}
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              className={errors.cardNumber ? 'error' : ''}
            />
            {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                value={cardDetails.expiryDate}
                onChange={(e) => setCardDetails({
                  ...cardDetails,
                  expiryDate: formatExpiryDate(e.target.value)
                })}
                maxLength={5}
                placeholder="MM/YY"
                className={errors.expiryDate ? 'error' : ''}
              />
              {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({
                  ...cardDetails,
                  cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
                })}
                maxLength={3}
                placeholder="123"
                className={errors.cvv ? 'error' : ''}
              />
              {errors.cvv && <span className="error-text">{errors.cvv}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              value={cardDetails.cardHolderName}
              onChange={(e) => setCardDetails({
                ...cardDetails,
                cardHolderName: e.target.value.toUpperCase()
              })}
              placeholder="JOHN DOE"
              className={errors.cardHolderName ? 'error' : ''}
            />
            {errors.cardHolderName && <span className="error-text">{errors.cardHolderName}</span>}
          </div>

          <div className="button-group">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {type === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CardDetails