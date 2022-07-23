import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { CHANGE_USER_LOAD, getUser, updateToken } from '../services/actions/user';
import { getCookie } from '../utils/utils';
import { useHistory } from 'react-router-dom';


function ProtectedRoute({ children, ...rest }) {

  const { isUserLoaded } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const { isForgotPasswordCodeSent, getInfromationFailed, getInfromationRequest } = useSelector(store => store.user);

  const history = useHistory();



  // useEffect(() => {
  //   if (getCookie('refreshToken') && !getCookie('accessToken')) {
  //     dispatch(updateToken(getCookie('refreshToken')))
  //   }
  //   dispatch(getUser())
  // }, []);


  const { name, email } = useSelector(store => store.user.user);



  if (window.location.pathname === '/login' || window.location.pathname === '/register') {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          email !== '' && name !== '' ?
            <Redirect to={{ pathname: location.state?.from === "/profile" ? '/profile' : '/', state: { from: location } }}></Redirect>
            :
            children
        }
      >
      </Route>
    )
  } else if (window.location.pathname === '/forgot-password' || window.location.pathname === '/reset-password') {
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
