import Modal from "../../../elements/modal/modal";
import Styles from './order-details.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Icon from '../../../../images/icon-done.svg';

type OrderDetailProps = {
  onClose: () => void;
}

function OrderDetails(props: OrderDetailProps) {
  return (
    <Modal onClose={props.onClose}>
      <div className={Styles.modalContent}>
        <div className={Styles.modalHeader}>
          <CloseIcon type="primary" onClick={props.onClose}/>
        </div>
        <div className={Styles.body}>
          <span className={`${Styles.orderNumber} text text_type_digits-large`}>065952</span>
          <h2 className={Styles.orderTitle}>идентификатор заказа</h2>
          <img className={Styles.icon} src={Icon} alt="Done"/>
          <div className={Styles.description}>
            <span>Ваш заказ начали готовить</span>
            <span className="text_color_inactive">Дождитесь готовности на орбитальной станции</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OrderDetails;
