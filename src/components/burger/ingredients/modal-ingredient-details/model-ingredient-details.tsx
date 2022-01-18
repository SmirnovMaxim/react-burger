import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Routes} from '../../../../enums';
import Modal from '../../../elements/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function ModalIngredientDetails() {
  const history = useHistory();
  const location = useLocation();
  // @ts-ignore
  const isModalOpen = location.state && location.state.modal;

  const onCloseModal = () => {
    history.replace({pathname: Routes.MAIN});
  };

  return (
    isModalOpen
      ? <Modal onClose={onCloseModal}>
        <IngredientDetails/>
      </Modal>
      : <></>
  );
}

export default ModalIngredientDetails;
