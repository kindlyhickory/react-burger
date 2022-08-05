export function checkResponse(res) {
  // console.log(res);
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка запроса: ${res.status}. Запрос: ${res.url}`)
}

export function parseDate(date) {
  const orderDate = new Date(`${date}`);
  const copiedDate = new Date(`${date}`);
  orderDate.setHours(0,0,0,0);
  const today = new Date();
  today.setHours(0,0,0,0);
  const hours = copiedDate.getHours() < 10 ? '0' + copiedDate.getHours() : copiedDate.getHours()
  const minutes = copiedDate.getMinutes() < 10 ? '0' + copiedDate.getMinutes() : copiedDate.getMinutes();
  const differenceInDays = Math.ceil(Math.abs((today.getTime() - orderDate.getTime()) / (60 * 60 * 1000 * 24)));
  const ago = differenceInDays < 1
    ? 'Сегодня'
    : differenceInDays === 1 ?
      'Вчера'
      : differenceInDays > 1 ?
        `${differenceInDays} дней назад`
        : null
  // console.log(differenceInDays);
  return `${ago}, ${hours}:${minutes} i-GMT+${copiedDate.getTimezoneOffset()/-60}`
}

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export function enableInputValidation(Input) {

}