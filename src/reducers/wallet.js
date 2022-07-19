// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCY':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'EXPENSES':
    return ({
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload },
      ],
    });
  case 'DELETE_EXPENSES':
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    });
  default:
    return ({
      ...state,
    });
  }
};

export default walletReducer;
