import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {API} from '../config/params';
import {Routes} from '../enums';
import {SET_ERROR} from '../services/actions/app';
import './common.css';
import Styles from './login.module.css';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');

  const onChange = (e: any) => {
    setEmail(e.target.value)
  }
  const onRestore = async () => {
    try {
      const response = await fetch(`${API}password-reset`, {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const {success} = await response.json();
      if (!success) {
        throw new Error('Failed parse data');
      }
      localStorage.setItem('isAllowResetPassword', '1');
      history.replace({pathname: Routes.RESET_PASSWORD});
    } catch (e) {
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.login}>
        <div className="text_type_main-medium">Восстановление пароля</div>
        <div className={Styles.input}>
          <EmailInput value={email} name={'email'} onChange={onChange}/>
        </div>
        <div className={Styles.btnLogin}>
          <Button type="primary" size="large" onClick={onRestore}>
            Восстановить
          </Button>
        </div>
        <div className={Styles.firstLine}>
          <span>Вспомнили пароль?</span>
          <Link to={`${Routes.LOGIN}`}>Войти</Link>
        </div>
      </div>
    </div>
  )
}
