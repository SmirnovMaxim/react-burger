import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {SyntheticEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {Routes} from '../enums';
import {resetPassword} from '../services/actions/auth';
import './common.css';
import Styles from './login.module.css';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');

  const onChange = (e: any) => {
    setEmail(e.target.value)
  }
  const onRestore = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(resetPassword(email));
    history.replace({pathname: Routes.RESET_PASSWORD});
  }

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
