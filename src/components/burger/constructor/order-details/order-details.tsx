import {FC} from 'react';
import Styles from './order-details.module.css';
import Icon from '../../../../images/icon-done.svg';
import {OrderDetailProps} from "../../../../types";

const OrderDetails: FC<OrderDetailProps> = (props) => {
  return (
    <div className={Styles.content}>
      <div className={Styles.body}>
        <span className={`${Styles.orderNumber} text text_type_digits-large`}>{props.id}</span>
        <h2 className={Styles.orderTitle}>идентификатор заказа</h2>
        <img className={Styles.icon} src={Icon} alt="Done"/>
        <div className={Styles.description}>
          <span>Ваш заказ начали готовить</span>
          <span className="text_color_inactive">Дождитесь готовности на орбитальной станции</span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
