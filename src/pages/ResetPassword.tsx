import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {Routes} from '../enums';
import {confirmResetPassword} from '../services/actions/auth';
import './common.css';
import {TConfirmRestorePasswordForm} from '../types/forms';
import Styles from './login.module.css';

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState<TConfirmRestorePasswordForm>({
    password: '',
    token: '',
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  const onReset = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(confirmResetPassword(form));
    history.replace({pathname: Routes.LOGIN});
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
        <form onSubmit={onReset}>
          <div className={Styles.input}>
            <PasswordInput onChange={onChange} value={form.password} name="password"/>
          </div>
          <div className={Styles.input}>
            <Input onChange={onChange} value={form.token} name="token" placeholder="Введите код из письма"/>
          </div>
          <div className={Styles.btnLogin}>
            <Button type="primary" size="large">
              Восстановить
            </Button>
          </div>
        </form>
        <div className={Styles.firstLine}>
          <span>Вспомнили пароль?</span>
          <Link to={Routes.LOGIN}>Войти</Link>
        </div>
      </div>
    </div>
  )
}
