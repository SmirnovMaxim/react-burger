import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {ChangeEvent, SyntheticEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Routes} from '../enums';
import {login} from '../services/actions/auth';
import {TLoginForm} from '../types/forms';
import './common.css';
import Styles from './login.module.css';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<TLoginForm>({
    email: '',
    password: '',
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    })
  }
  const onLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.login}>
        <div className="text_type_main-medium">Вход</div>
        <form onSubmit={onLogin}>
          <div className={Styles.input}>
            <EmailInput onChange={onChange} value={form.email} name="email"/>
          </div>
          <div className={Styles.input}>
            <PasswordInput onChange={onChange} value={form.password} name="password"/>
          </div>
          <div className={Styles.btnLogin}>
            <Button type="primary" size="large">
              Войти
            </Button>
          </div>
        </form>
        <div className={Styles.firstLine}>
          <span>Вы – новый пользователь?</span>
          <Link to={Routes.SIGNUP}>Зарегистрироваться</Link>
        </div>
        <div className={Styles.secondLine}>
          <span>Забыли пароль?</span>
          <Link to={Routes.FORGOT_PASSWORD}>Восстановить пароль</Link>
        </div>
      </div>
    </div>
  )
}
