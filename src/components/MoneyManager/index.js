import {Component} from 'react'
import {v4} from 'uuid'
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
    balance: 0,
    transactionList: [],
    transactionAmount: '',
    transactionTitle: '',
    transactionType: 'Income',
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  }

  addNewTransaction = event => {
    event.preventDefault()
    const {
      transactionTitle,
      transactionAmount,
      transactionType,
      totalIncome,
      totalExpenses,
    } = this.state
    const totalBalance = totalIncome - totalExpenses
    const newTransaction = {
      transactionId: v4(),
      transactionAmount,
      transactionTitle,
      transactionType,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      transactionAmount: '',
      transactionTitle: '',
      transactionType: 'Income',
      totalBalance,
    }))
  }

  onChangeTitle = event => {
    this.setState({transactionTitle: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({transactionAmount: event.target.value})
  }

  onChangeType = event => {
    this.setState({transactionType: event.target.value})
  }

  filterTheList = () => {
    const {transactionList} = this.state
    const filteredList = transactionList
  }

  onDeleteTransaction = id => {
    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(eachTransaction => {
        if (eachTransaction.transactionId !== id) {
          return true
        }
        return false
      }),
    }))
  }

  render() {
    const {
      transactionList,
      transactionTitle,
      transactionAmount,
      transactionType,
      totalIncome,
      totalExpenses,
    } = this.state

    const filterList = this.filterTheList()

    return (
      <div className="page-container">
        <div className="name-card">
          <h1 className="heading">Hi, Richard</h1>
          <p className="welcome-msg">
            welcome back to your<span>Money Manager </span>{' '}
          </p>
        </div>
        <ul className="money-details-container">
          <li
            className="list-money-details bg-color-class"
            data-testid="balanceAmount"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              className="wallet-icon "
              alt="balance"
            />
            <div>
              <p>Your Balance</p>
              <p>Rs 10000</p>
            </div>
          </li>
          {transactionTypeOptions.map(eachObject => (
            <MoneyDetails
              moneyDetailsWallet={eachObject}
              key={eachObject.optionId}
            />
          ))}
        </ul>
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
            <select onChange={this.onChangeType} className="input-element">
              {transactionTypeOptions.map(eachOption => (
                <option value={eachOption.displayText} id={eachOption.optionId}>
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
