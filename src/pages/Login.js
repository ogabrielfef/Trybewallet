import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sendEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    redirect: false,
  }

  // validação dos inputs, mas decidi tentar por condicional

  // validaInputs = () => {
  //   const { email, senha } = this.state;
  //   const senhaMinima = 6;
  //   const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  //   if (email.match(validEmail && senha.length >= senhaMinima)) {
  //     this.setState({ disabled: false });
  //   } else {
  //     this.setState({ disabled: true });
  //   }
  // };

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  render() {
    const { email, senha, redirect } = this.state;
    const { addUsuario } = this.props;
    const senhaMinima = 6;
    const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="text"
            name="username"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="senha"
            value={ senha }
            onChange={ this.handleChange }
            required
          />

        </label>
        <button
          type="button"
          disabled={ !(senha.length >= senhaMinima && email.match(validEmail)) }
          onClick={ () => {
            addUsuario(email);
            this.setState({ redirect: true });
          } }
        >
          Entrar
        </button>
        {redirect && <Redirect to="/carteira" />}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addUsuario: sendEmail,
};

Login.propTypes = {
  addUsuario: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
