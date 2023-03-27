import React from "react";
import { MdClose } from "react-icons/md";
import { useProponentContext } from "../context/ProponentsContext";

const Modal = () => {
  const { openModal, handleOpenModal, modalComponents } = useProponentContext();

  if (!openModal) return;
  return (
    <section className="modal__overlay">
      <div className="modal">
        <span className="modal__close" onClick={() => handleOpenModal(false)}>
          <MdClose />
        </span>
        {modalComponents.components}
      </div>
    </section>
  );
};

export default Modal;
