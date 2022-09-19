import React, { FC } from 'react';
import {
  Redirect, Route, useLocation,
} from 'react-router-dom';
import { useSelector } from '../hooks';

// eslint-disable-next-line react/function-component-definition
const ProtectedRoute:FC = ({ children, ...rest }) => {
  const { isForgotPasswordCodeSent, isAuthChecked } = useSelector((store) => store.user);
  const locations = useLocation();
  const { name, email } = useSelector((store) => store.user.user);
  // useEffect(() => {
  //   if (getCookie('refreshToken') && !getCookie('accessToken')) {
  //     dispatch(updateToken(getCookie("refreshToken")));
  //     dispatch(getUser())
  //     console.log(1)
  //   } else if (getCookie('accessToken')) {
  //     dispatch(getUser());
  //   } else {
  //     dispatch({type: AUTH_CHECKED});
  //   }
  // }, []);

  if (!isAuthChecked) {
    return <p className="text text_type_main-large">loading</p>;
  }

  if (locations.pathname === '/login' || locations.pathname === '/register') {
    return (
      <Route
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...rest}
        /* eslint-disable-next-line @typescript-eslint/no-shadow */
        render={({ location }: any) => (email !== '' && name !== ''
          ? <Redirect to={{ pathname: location.state?.from ? location.state?.from : '/', state: { from: location } }} />
          : children)}
      />
    );
  } if (locations.pathname === '/forgot-password' || locations.pathname === '/reset-password') {
    return (
      <Route
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...rest}
        /* eslint-disable-next-line @typescript-eslint/no-shadow,no-nested-ternary */
        render={({ location }) => (email !== '' && name !== ''
          ? <Redirect to="/" />
          // eslint-disable-next-line no-nested-ternary
          : isForgotPasswordCodeSent
            ? children
            : location.pathname === '/reset-password'
              ? <Redirect to="/forgot-password" />
              : children)}
      />

    );
  }

  return (
    <Route
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
      render={({ location }) => (email !== '' && name !== ''
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />)}
    />

  );
};

export default ProtectedRoute;
