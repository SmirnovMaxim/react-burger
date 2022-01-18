import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {Routes} from '../../../enums';
import {TRootStore} from '../../../types/stores';

export const ProtectedRoute = ({children, ...rest}: any) => {
  const user = useSelector((store: TRootStore) => store.user);

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
