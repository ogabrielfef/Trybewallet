// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCY':
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return ({
      ...state,
    });
  }
};

export default walletReducer;
