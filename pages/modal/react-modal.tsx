import React, { useState } from "react";
import ReactModal from "react-modal";
function ReactModalComponent() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => {
          setOpenModal((prev) => !prev);
        }}
      >
        toggle modal
      </button>
      <ReactModal
        isOpen={openModal}
        onAfterOpen={() => {
          alert("yo");
        }}
      />
    </div>
  );
}

export default ReactModalComponent;
