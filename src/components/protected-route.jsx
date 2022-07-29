import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getCookie } from "../utils/utils";
import { AUTH_CHECKED, getUser, updateToken } from "../services/actions/user";

function ProtectedRoute({ children, ...rest }) {
  const { isForgotPasswordCodeSent, isAuthChecked } = useSelector(store => store.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { name, email } = useSelector(store => store.user.user);
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
    return <p className='text text_type_main-large'>loading</p>
  }



  if (location.pathname === '/login' || location.pathname === '/register') {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          email !== '' && name !== '' ?
            <Redirect to={{ pathname: location.state?.from ? location.state.from : '/', state: { from: location } }}></Redirect>
            :
            children
        }
      >
      </Route>
    )
  } else if (location.pathname === '/forgot-password' || location.pathname === '/reset-password') {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          email !== '' && name !== '' ?
            <Redirect to="/"></Redirect>
            :

            isForgotPasswordCodeSent ?
              children
              :
              location.pathname === "/reset-password" ?
                <Redirect to='/forgot-password' />
                :
                children
        }
      >
      </Route>

    )
  }


  return (
    < Route
      {...rest}
      render={({ location }) => {
        return email !== '' && name !== '' ?
          children
          :
          <Redirect to={{ pathname: '/login', state: { from: location.pathname } }}></Redirect>
      }
      }
    />

  )

}

export default ProtectedRoute;
