import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Modal from '../elements/modal/modal';
import {OrderDetail} from '../order-detail/order-detail';

export const ModalOrderDetails = () => {
  const history = useHistory();
  const location = useLocation();
  // @ts-ignore
  const isModalOpen = location.state && location.state.modal;

  const onCloseModal = () => {
    const splittedRoute = location.pathname.split('/');
    const pathname = splittedRoute.slice(0, splittedRoute.length - 1).join('/');
    history.replace({pathname});
  };

  return (
    isModalOpen
      ? <Modal onClose={onCloseModal}>
        <OrderDetail/>
      </Modal>
      : <></>
  );
}
