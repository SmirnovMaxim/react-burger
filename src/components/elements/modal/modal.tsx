import Styles from './modal.module.css';
import {createPortal} from "react-dom";
import {useEffect, useRef} from 'react';
import ModalOverlay from "./overlay/modal-overlay";
import {BaseModalProps} from "../../../types";

function Modal(props: BaseModalProps) {
  const modalRoot = document.getElementById('root') || document.createElement('div');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('keyup', onKeyPress);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('keyup', onKeyPress);
      document.removeEventListener('click', onClick);
    };
  }, [])

  const onClick = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      props.onClose();
    }
  }

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      props.onClose();
    }
  }

  return createPortal(
    <>
      <div className={`${Styles.modal} text_type_main-default`}>
        <div ref={dialogRef} className={Styles.modalDialog}>
          {props.children}
        </div>
      </div>
      <ModalOverlay/>
    </>,
    modalRoot
  );
}

export default Modal;
