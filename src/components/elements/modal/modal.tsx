import Styles from './modal.module.css';
import {createPortal} from "react-dom";
import {useEffect, useRef} from 'react';
import ModalOverlay from "./overlay/modal-overlay";
import {BaseModalProps} from "../../../types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById('modals') || document.createElement('div');

function Modal(props: BaseModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        props.onClose();
      }
    }
    const onClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        props.onClose();
      }
    }

    document.addEventListener('keyup', onKeyPress);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('keyup', onKeyPress);
      document.removeEventListener('click', onClick);
    };
  }, [props]);

  return createPortal(
    <>
      <div className={`${Styles.modal} text_type_main-default`}>
        <div ref={dialogRef} className={Styles.modalDialog}>
          <div className={Styles.modalContent}>
            <span className={Styles.closeButton}>
              <CloseIcon type="primary" onClick={props.onClose}/>
            </span>
            {props.children}
          </div>
        </div>
      </div>
      <ModalOverlay/>
    </>,
    modalRoot
  );
}

export default Modal;
