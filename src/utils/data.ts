type TConfig = {
  baseUrl: string
  headers: {
    'Content-type': string
  }
  wsSocketUrl: string
}

export const config: TConfig = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-type': 'application/json',
  },
  wsSocketUrl: 'wss://norma.nomoreparties.space/orders',
};
