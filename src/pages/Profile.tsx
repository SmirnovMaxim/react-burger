import {Route, Switch, useLocation} from 'react-router-dom';
import {EditProfile} from '../components/edit-profile/edit-profile';
import {Sidebar} from '../components/sidebar/sidebar';
import {Routes} from '../enums';
import './common.css';
import {OrderListPage} from './OrderList';
import Styles from './profile.module.css';

export const ProfilePage = () => {
  const location = useLocation();

  return (
    <div className={Styles.container}>
      <Sidebar/>
      <Switch location={location}>
        <Route path={Routes.PROFILE} component={EditProfile} exact/>
        <Route path={Routes.PROFILE_ORDER_LIST} component={OrderListPage} exact/>
      </Switch>
    </div>
  );
}
