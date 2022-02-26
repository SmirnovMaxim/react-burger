import {Redirect, Route} from 'react-router-dom';
import {Routes} from '../../../enums';
import {useSelector} from '../../../services/hooks';

export const ProtectedRoute = ({children, ...rest}: any) => {
  const user = useSelector(store => store.user);

  return (
    <Route
      {...rest}
      render={({location}) =>
        user.name
          ? children
          : <Redirect
            to={{
              pathname: Routes.LOGIN,
              state: {from: location},
            }}
          />
      }
    />
  );
}
