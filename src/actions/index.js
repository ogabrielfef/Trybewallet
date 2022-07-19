export const SEND_EMAIL = 'SEND_EMAIL';
export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const sendEmail = (email) => ({
  type: SEND_EMAIL,
  email,
});

// req 4
export const requestCurrency = (currencies) => ({
  type: CURRENCY,
  payload: currencies,
});

export function fetchRequestCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((object) => Object.keys(object))
    .then((keys) => keys.filter((coin) => coin !== 'USDT'))
    .then((currencies) => dispatch(requestCurrency(currencies)));
}

// req 6
const saveExpenses = (infos, userId, response) => ({
  type: EXPENSES,
  payload: {
    id: userId,
    ...infos,
    exchangeRates: response,
  },
});

export const fetchSaveExpenses = (form, id) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseJson = await response.json();
  delete responseJson.USDT;
  dispatch(saveExpenses(form, id, responseJson));
};

// req 9
export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  payload: id,
});
