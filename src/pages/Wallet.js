import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchRequestCurrencies } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRequestCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="value-input">
            Digite o valor
            <input
              name="value"
              type="number"
              data-testid="value-input"
              id="value-input"
            />
          </label>
          <label htmlFor="description-input">
            Digite uma descrição
            <input
              name="description"
              data-testid="description-input"
              id="description-input"
            />
          </label>
          <label htmlFor="coins-options">
            Moeda
            <select
              name="currency"
              id="coins-options"
            >
              {
                currencies.map((coin) => (
                  <option value={ coin } key={ coin }>{coin}</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            <select
              name="method-input"
              id="method-input"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select
              name="tag-input"
              id="tag-input"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  currencies: PropTypes
    .arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
