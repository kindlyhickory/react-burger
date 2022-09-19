// eslint-disable-next-line max-len
import { TSetCookieProps } from "../types";

export const checkResponse = <T>(res: Response):Promise<T> => {
  // console.log(res);
  if (res.ok) {
    return res.json();
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Ошибка запроса: ${res.status}. Запрос: ${res.url}`);
};

export function parseDate(date: string) {
  const orderDate = new Date(`${date}`);
  const copiedDate = new Date(`${date}`);
  orderDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const hours = copiedDate.getHours() < 10 ? `0${copiedDate.getHours()}` : copiedDate.getHours();
  const minutes = copiedDate.getMinutes() < 10 ? `0${copiedDate.getMinutes()}` : copiedDate.getMinutes();
  // eslint-disable-next-line max-len
  const differenceInDays = Math.ceil(Math.abs((today.getTime() - orderDate.getTime()) / (60 * 60 * 1000 * 24)));
  // eslint-disable-next-line no-nested-ternary
  const ago = differenceInDays < 1
    ? 'Сегодня'
    // eslint-disable-next-line no-nested-ternary
    : differenceInDays === 1
      ? 'Вчера'
      : differenceInDays > 1
        ? `${differenceInDays} дней назад`
        : null;
  // console.log(differenceInDays);
  return `${ago}, ${hours}:${minutes} i-GMT+${copiedDate.getTimezoneOffset() / -60}`;
}

export function setCookie(name: string, value: string | boolean, props?: TSetCookieProps) {
  // eslint-disable-next-line no-param-reassign
  props = props || {};
  let exp = props.expires;
  const d = new Date()
  if (typeof exp === 'number' && exp) {
    d.setTime(d.getTime() + exp * 1000);
    // eslint-disable-next-line no-multi-assign,@typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-multi-assign,no-param-reassign
    exp = props.expires = Number(d);
  }
  if (exp && d.toUTCString) {
    // eslint-disable-next-line no-param-reassign
    props.expires = d.toUTCString();
  }
  // eslint-disable-next-line no-param-reassign
  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, false, { expires: -1 });
}
