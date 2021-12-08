import {ReactElement} from "react";

type BaseModalProps = {
  children: ReactElement | ReactElement[];
  onClose: () => void;
}

export default BaseModalProps;
