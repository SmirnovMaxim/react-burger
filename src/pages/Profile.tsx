import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Sidebar} from '../components/sidebar/sidebar';
import {updateUser} from '../services/actions/user';
import {TRootStore, TUserStore} from '../types/stores';
import './common.css';
import Styles from './profile.module.css';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const {email, name, password} = useSelector((store: TRootStore) => store.user);
  const [form, setForm] = useState<TUserStore>({
    email: '',
    name: '',
    password: '',
  });

  const resetForm = useCallback(() => {
    setForm({email, name, password});
  }, [email, name, password]);

  useEffect(() => {
    resetForm();
  }, [email, name, password, resetForm]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    })
  }

  const onSave = () => dispatch(updateUser(form));

  return (
    <div className={Styles.container}>
      <Sidebar/>
      <div className={Styles.profile}>
        <div className={Styles.input}>
          <Input onChange={onChange} value={form.name} name="name" placeholder="Имя"/>
        </div>
        <div className={Styles.input}>
          <EmailInput onChange={onChange} value={form.email} name="email"/>
        </div>
        <div className={Styles.input}>
          <PasswordInput onChange={onChange} value={form.password} name="password"/>
        </div>
        <div className={Styles.actions}>
          <Button type="primary" onClick={onSave}>Сохранить</Button>
          <Button type="secondary" onClick={resetForm}>Отменить</Button>
        </div>
      </div>
    </div>
  );
}
