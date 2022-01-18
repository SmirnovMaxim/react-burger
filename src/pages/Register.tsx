import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {ChangeEvent, SyntheticEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Routes} from '../enums';
import {signup} from '../services/actions/auth';
import {TUserStore} from '../types/stores';
import './common.css';
import Styles from './login.module.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<TUserStore>({
    email: '',
    password: '',
    name: '',
  })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    })
  }
  const onSignup = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(signup(form))
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.login}>
        <div className="text_type_main-medium">Регистрация</div>
        <form onSubmit={onSignup}>
          <div className={Styles.input}>
            <Input placeholder="Имя" onChange={onChange} value={form.name} name="name"/>
          </div>
          <div className={Styles.input}>
            <EmailInput onChange={onChange} value={form.email} name="email"/>
          </div>
          <div className={Styles.input}>
            <PasswordInput onChange={onChange} value={form.password} name="password"/>
          </div>
          <div className={Styles.btnLogin}>
            <Button type="primary" size="large">
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <div className={Styles.firstLine}>
          <span>Уже зарегистрированы?</span>
          <Link to={Routes.LOGIN}>Войти</Link>
        </div>
      </div>
    </div>
  )
}
