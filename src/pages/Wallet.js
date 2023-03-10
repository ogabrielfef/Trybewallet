import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRequestCurrencies,
  fetchSaveExpenses, deleteExpenses } from '../actions/index';

class Wallet extends React.Component {
  state = {
    actualId: 0,
    forms: {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRequestCurrencies());
  }

  handleChange = ({ target }) => {
    this.setState((prevState) => ({
      forms: {
        ...prevState.forms,
        [target.name]: target.value,
      },
    }));
  }

  deleteExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(id));
  }

  render() {
    const { currencies, userEmail, dispatch, expenses } = this.props;
    const { forms, actualId } = this.state;
    return (
      <div>
        <header id="wallet-header">
          Logo
          <p data-testid="email-field" id="email">{userEmail}</p>
          <p data-testid="total-field" id="total">
            {expenses.reduce((acc, crr) => {
              acc += (parseFloat(crr.value)
                * crr.exchangeRates[crr.currency].ask);
              return acc;
            }, 0).toFixed(2)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="value-input">
            Digite o valor
            <input
              name="value"
              value={ forms.value }
              type="number"
              data-testid="value-input"
              id="value-input"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="description-input">
            Digite uma descrição
            <input
              name="description"
              data-testid="description-input"
              id="description-input"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="coins-options">
            Moeda
            <select
              name="currency"
              id="coins-options"
              onChange={ (event) => this.handleChange(event) }
            >
              {currencies.map((coin) => (
                <option value={ coin } key={ coin }>
                  {coin}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            <select
              onChange={ (event) => this.handleChange(event) }
              name="method"
              id="method"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            onClick={
              () => dispatch(fetchSaveExpenses(forms, actualId))
                && this.setState((prevState) => ({
                  forms: {
                    ...prevState.forms,
                    value: '0',
                  },
                  actualId: prevState.actualId + 1,
                }))
            }
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ `${parseFloat(expense.value).toFixed(2)}` }</td>
                <td>{ expense.exchangeRates[`${expense.currency}`].name }</td>
                <td>
                  { `${parseFloat(
                    expense.exchangeRates[`${expense.currency}`].ask,
                  ).toFixed(2)}`}
                </td>
                <td>
                  {(parseFloat(expense.value)
                  * expense.exchangeRates[`${expense.currency}`].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  currencies: PropTypes
    .arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  dispatch: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

export default connect(mapStateToProps, null)(Wallet);
