import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { CHANGE_USER_LOAD, getUser, updateToken } from '../services/actions/user';
import { getCookie } from '../utils/utils';


function ProtectedRoute({ children, ...rest }) {

  console.log(children)

  const { isUserLoaded, getInfromationRequest } = useSelector(store => store.user.isUserLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie('refreshToken') && !getCookie('accessToken')) {
      dispatch(updateToken(getCookie('refreshToken')))
    }
    dispatch(getUser())
  }, []);

  const { name, email } = useSelector(store => store.user.user);

  if (getInfromationRequest) {
    return <p>loading</p>
  }

  if (window.location.pathname === '/login' || window.location.pathname === '/register') {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          email !== '' && name !== '' ?
            <Redirect to="/"></Redirect>
            :
            children
        }
      >
      </Route>
    )
  } else if (window.location.pathname === '/forgot-password') {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          email !== '' && name !== '' ?
            <Redirect to="/"></Redirect>
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
        console.log(email, '---', name);
        return email !== '' && name !== '' ?
          children
          :
          <Redirect to="/login"></Redirect>

      }

      }
    />

  )

}

export default ProtectedRoute;
