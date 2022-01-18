import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../../enums';
import {
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  MainPage, NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';
import {getIngredients, RESET_ERROR} from '../../services/actions/app';
import {fetchUser} from '../../services/actions/user';
import {TRootStore} from '../../types/stores';
import ModalIngredientDetails from '../burger/ingredients/modal-ingredient-details/model-ingredient-details';
import {ProtectedRoute} from '../elements/protected-route/protected-route';
import AppHeader from '../header/app-header';
import Styles from './app.module.css';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);
  const {name} = useSelector((store: TRootStore) => store.user);
  const {error, ingredients} = useSelector((store: TRootStore) => store.app);
  const onCloseError = () => dispatch({type: RESET_ERROR});
  const hasIngredients = useMemo(() => (ingredients || []).length > 0, [ingredients]);

  const init = async () => {
    if (!name) {
      await dispatch(fetchUser());
    }
    if (!hasIngredients) {
      dispatch(getIngredients());
    }
    setUserLoaded(true);
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    const forbiddenRoutesForLoggedUser: string[] = [
      Routes.LOGIN,
      Routes.SIGNUP,
      Routes.FORGOT_PASSWORD,
      Routes.RESET_PASSWORD,
    ];

    if (name && forbiddenRoutesForLoggedUser.includes(location.pathname)) {
      history.replace({pathname: Routes.MAIN})
    }
  }, [name, history, location.pathname]);

  // @ts-ignore
  const isModalOpen = location.state && location.state.modal;

  if (!isUserLoaded) {
    return null;
  }

  return (
    <div className="text_type_main-default">
      <AppHeader/>
      <main className={Styles.container}>
        {
          error &&
          <div className="alertDanger">
            <span className="errorMessage">{error}</span>
            <CloseIcon type="primary" onClick={onCloseError}/>
          </div>
        }
        <Switch location={isModalOpen ?? location}>
          <Route path={Routes.LOGIN} component={LoginPage} exact/>
          <Route path={Routes.SIGNUP} component={RegisterPage} exact/>
          <Route path={Routes.FORGOT_PASSWORD} component={ForgotPasswordPage} exact/>
          <Route path={Routes.RESET_PASSWORD} component={ResetPasswordPage} exact/>

          <Route path={Routes.MAIN} component={MainPage} exact/>
          <Route path={Routes.INGREDIENT_VIEW} component={IngredientPage} exact/>
          <ProtectedRoute path={Routes.PROFILE} exact>
            <ProfilePage/>
          </ProtectedRoute>
          <Route component={NotFoundPage}/>
        </Switch>
        {
          isModalOpen && <Route path={Routes.INGREDIENT_VIEW} component={ModalIngredientDetails} exact/>
        }
      </main>
    </div>
  );
}

export default App;
