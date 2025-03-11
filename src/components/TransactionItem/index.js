// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDeleteTransaction} = props

  const {transactionId, transactionTitle, transactionAmount, transactionType} =
    transactionDetails
  const deleteTransaction = () => onDeleteTransaction(transactionId)

  return (
    <li className="each-transaction-history">
      <>
        <p className="transaction-text">{transactionTitle}</p>
        <p className="transaction-text">Rs {transactionAmount}</p>
        <div className="type-container">
          <p className="transaction-text">{transactionType}</p>
          <button
            className="delete-button"
            type="button"
            onClick={deleteTransaction}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
              alt="delete"
              className="delete-icon"
            />
          </button>
        </div>
      </>
    </li>
  )
}

export default TransactionItem
