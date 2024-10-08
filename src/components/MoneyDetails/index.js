// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {moneyDetailsWallet, amountInRupees} = props
  const {optionId, displayText} = moneyDetailsWallet
  console.log(amountInRupees)

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
        <p data-testid={`${optionId.toLowerCase()}Amount`}>
          Rs {amountInRupees}
        </p>
      </div>
    </li>
  )
}

export default MoneyDetails
