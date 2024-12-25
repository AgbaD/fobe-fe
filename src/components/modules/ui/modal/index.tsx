import { ReactNode } from "react";
import { Icon } from "../Icon";
import BaseButton from "../button";
import "./index.scss";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export default function Modal({
  title,
  children,
  onClose,
  isOpen,
}: ModalProps) {
  return (
    <div className={`modal ${isOpen ? "active" : "hide"}`}>
      <div className="modal-wrapper">
        <div className="modal__content">
          <div className="modal__content__icon" onClick={onClose}>
            <Icon name="cancel" />
          </div>
          <div className="modal__content__body">
            <h6>{title}</h6>
            <div className="modal__content__body__text">{children}</div>
            <BaseButton
              variant="primary"
              className="modal__content__body__button"
              onClick={onClose}
            >
              Confirm
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
}
