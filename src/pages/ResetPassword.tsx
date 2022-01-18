import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {API} from '../config/params';
import {Routes} from '../enums';
import {SET_ERROR} from '../services/actions/app';
import './common.css';
import Styles from './login.module.css';

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    password: '',
    token: '',
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  const onReset = async () => {
    try {
      const response = await fetch(`${API}password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify(form),
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
      localStorage.removeItem('isAllowResetPassword');
      history.replace({pathname: Routes.LOGIN});
    } catch (e) {
      if (e instanceof Error) {
        dispatch({type: SET_ERROR, error: e.message});
      }
    }
  }

  useEffect(() => {
    const isAllowResetPassword = localStorage.getItem('isAllowResetPassword');
    if (!isAllowResetPassword) {
      history.replace({pathname: Routes.FORGOT_PASSWORD});
    }
  }, [history]);

  return (
    <div className={Styles.container}>
      <div className={Styles.login}>
        <div className="text_type_main-medium">Восстановление пароля</div>
        <div className={Styles.input}>
          <PasswordInput onChange={onChange} value={form.password} name="password"/>
        </div>
        <div className={Styles.input}>
          <Input onChange={onChange} value={form.token} name="token" placeholder="Введите код из письма"/>
        </div>
        <div className={Styles.btnLogin}>
          <Button type="primary" size="large" onClick={onReset}>
            Восстановить
          </Button>
        </div>
        <div className={Styles.firstLine}>
          <span>Вспомнили пароль?</span>
          <Link to={Routes.LOGIN}>Войти</Link>
        </div>
      </div>
    </div>
  )
}
