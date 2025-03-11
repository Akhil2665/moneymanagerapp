import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionList: [],
    transactionAmount: '',
    transactionTitle: '',
    transactionType: 'INCOME',
  }

  addNewTransaction = event => {
    event.preventDefault()
    const {transactionTitle, transactionAmount, transactionType} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === transactionType,
    )
    const {displayText} = typeOption

    const newTransaction = {
      transactionId: uuidv4(),
      transactionAmount: parseInt(transactionAmount),
      transactionTitle,
      transactionType: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      transactionAmount: '',
      transactionTitle: '',
      transactionType: 'INCOME',
    }))
  }

  onChangeTitle = event => {
    this.setState({transactionTitle: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({transactionAmount: event.target.value})
  }

  onChangeType = event => {
    this.setState({transactionType: event.target.value.toUpperCase()})
  }

  onDeleteTransaction = id => {
    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        eachTransaction => eachTransaction.transactionId !== id,
      ),
    }))
  }

  render() {
    const {transactionList, transactionTitle, transactionAmount} = this.state
    console.log(transactionList)

    const totalIncome = transactionList
      .filter(transaction => transaction.transactionType === 'Income')
      .reduce((acc, curr) => acc + curr.transactionAmount, 0)

    const totalExpenses = transactionList
      .filter(transaction => transaction.transactionType === 'Expenses')
      .reduce((acc, curr) => acc + curr.transactionAmount, 0)

    const totalBalance = totalIncome - totalExpenses
    console.log(totalBalance, totalExpenses, totalIncome)

    return (
      <div className="page-container">
        <div className="name-card">
          <h1 className="heading">Hi, Richard</h1>
          <p className="welcome-msg">
            welcome back to your<span>Money Manager </span>{' '}
          </p>
        </div>
        <div className="money-details-container">
          <div className="list-money-details bg-color-class" key="balanceAmount">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              className="wallet-icon "
              alt="balance"
            />
            <div>
              <p>Your Balance</p>
              <p data-testid="balanceAmount">Rs {totalBalance}</p>
            </div>
          </div>
          {transactionTypeOptions.map(eachObject => (
            <MoneyDetails
              moneyDetailsWallet={eachObject}
              amountInRupees={
                eachObject.optionId === 'INCOME' ? totalIncome : totalExpenses
              }
              key={eachObject.optionId}
            />
          ))}
        </div>
        <div className="transaction-container">
          <form className="form-container" onSubmit={this.addNewTransaction}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              className="input-element"
              placeholder="TITLE"
              value={transactionTitle}
              onChange={this.onChangeTitle}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              className="input-element"
              value={transactionAmount}
              placeholder="AMOUNT"
              onChange={this.onChangeAmount}
            />
            <select className="input-element" onChange={this.onChangeType}>
              {transactionTypeOptions.map(eachOption => (
                <option value={eachOption.optionId} key={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button className="add-btn" type="submit">
              ADD
            </button>
          </form>

          <div className="history-container">
            <h1 className="heading">History</h1>
            <div className="histoy-table">
              <div className="column-container">
                <p className="column-name">Title</p>
                <p className="column-name">Amount</p>
                <p className="column-name">Type</p>
              </div>
              <ul className="transaction-history-container">
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    transactionDetails={eachTransaction}
                    onDeleteTransaction={this.onDeleteTransaction}
                    key={eachTransaction.transactionId}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
