export function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка запроса: ${res.status}. Запрос: ${res.url}`)
}
