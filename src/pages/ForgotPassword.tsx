import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {SyntheticEvent, useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../enums';
import {resetPassword} from '../services/actions/resetPassword';
import {useDispatch, useSelector} from '../services/hooks';
import './common.css';
import Styles from './login.module.css';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {pathname} = useLocation();
  const {isSendForgotPassword} = useSelector(store => store.resetPassword);
  const [email, setEmail] = useState<string>('');

  const onChange = (e: any): void => {
    setEmail(e.target.value)
  }
  const onRestore = (e: SyntheticEvent): void => {
    e.preventDefault();
    dispatch(resetPassword(email));
  }

  useEffect(() => {
    if (isSendForgotPassword) {
      history.replace({pathname: Routes.RESET_PASSWORD, state: {from: pathname}});
    }
  }, [isSendForgotPassword, history, pathname]);

  return (
    <div className={Styles.container}>
      <div className={Styles.login}>
        <div className="text_type_main-medium">Восстановление пароля</div>
        <form onSubmit={onRestore}>
          <div className={Styles.input}>
            <EmailInput value={email} name="email" onChange={onChange}/>
          </div>
          <div className={Styles.btnLogin}>
            <Button type="primary" size="large">
              Восстановить
            </Button>
          </div>
        </form>
        <div className={Styles.firstLine}>
          <span>Вспомнили пароль?</span>
          <Link to={`${Routes.LOGIN}`}>Войти</Link>
        </div>
      </div>
    </div>
  )
}
