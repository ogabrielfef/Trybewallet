export const SEND_EMAIL = 'SEND_EMAIL';
export const CURRENCY = 'CURRENCY';

export const sendEmail = (email) => ({
  type: SEND_EMAIL,
  email,
});

export const requestCurrency = (currencies) => ({
  type: CURRENCY,
  payload: currencies,
});

export function fetchRequestCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((object) => Object.keys(object))
    .then((keys) => keys.filter((coin) => coin !== 'USDT'))
    .then((data) => dispatch(requestCurrency(data)));
}
