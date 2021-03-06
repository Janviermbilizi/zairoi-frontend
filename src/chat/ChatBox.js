import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Message from "./Message";

function ToggleModal({ id, name, theclass }) {
  const [showModal, setShowModal] = useState(false);
  const [reduceModal, setreduceModal] = useState(false);

  //Modal
  const togglemodal = () => {
    setShowModal(!showModal);
    setreduceModal(false);
  };

  //reduceModal
  const toggleReduceModal = () => {
    setreduceModal(!reduceModal);
  };

  return (
    <>
      <div
        //I will add on click event that will send you to a card that allow you to send message to the particular user
        onClick={togglemodal}
        className={`${theclass}`}
      >
        <i className="far fa-comment-alt mr-2"></i> Message
        {/* {!showModal ? "Message" : "End Chat"} */}
      </div>
      {showModal ? (
        <Modal reducer={reduceModal}>
          <Message userId={id} userName={name} />
          {reduceModal ? (
            <button className="modal-sizer" onClick={toggleReduceModal}>
              <i className="fas fa-angle-up"></i>
            </button>
          ) : (
            <button className="modal-sizer" onClick={toggleReduceModal}>
              <i className="fas fa-angle-down"></i>
            </button>
          )}

          <button className="modal-close" onClick={togglemodal}>
            X
          </button>
        </Modal>
      ) : null}
    </>
  );
}
export default ToggleModal;
