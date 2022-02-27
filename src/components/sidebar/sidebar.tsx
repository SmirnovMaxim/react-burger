import cn from 'classnames';
import {NavLink, useHistory} from 'react-router-dom';
import {Routes} from '../../enums';
import {logout} from '../../services/actions/user';
import {useDispatch} from '../../services/hooks';
import Styles from './sidebar.module.css';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(logout(refreshToken));
      history.replace({pathname: Routes.LOGIN});
    }
  }

  return (
    <aside>
      <ul>
        <li>
          <NavLink to={Routes.PROFILE} activeClassName={Styles.activeLink} exact>
            <h2>Профиль</h2>
          </NavLink>
        </li>
        <li>
          <NavLink to={Routes.PROFILE_ORDER_LIST} activeClassName={Styles.activeLink} exact>
            <h2>История заказов</h2>
          </NavLink>
        </li>
        <li onClick={onLogout}>
          <h2>Выход</h2>
        </li>
      </ul>
      <span className={cn('text_color_inactive')}>В этом разделе вы можете изменить свои персональные данные</span>
    </aside>
  );
}
