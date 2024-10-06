// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {moneyDetailsWallet} = props
  const {optionId, displayText} = moneyDetailsWallet

  const transactionTypeUrl =
    optionId === 'INCOME'
      ? 'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'
      : 'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'

  return (
    <li className="list-money-details bg-color-class">
      <img
        src={transactionTypeUrl}
        className="wallet-icon "
        alt={optionId.toLowerCase()}
      />
      <div>
        <p>Your {displayText}</p>
        <p data-testId={`${optionId.toLowerCase()}Amount`}>Rs {0}</p>
      </div>
    </li>
  )
}

export default MoneyDetails
