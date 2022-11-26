import React from 'react';

const ConfirmModal = ({title, image, message, closeModal, confirmAction, modalData, succesButtonName}) => {
    return (
        <div>
            {/* The button to open modal */}


{/* Put this part before </body> tag */}
<input type="checkbox" id="delete-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{title}</h3>
        <div className="avatar my-4">
                <div className="w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img alt='doctor' src={image} />
                </div>
        </div>
    <h3>{message}</h3>
    <div className="modal-action">
      <label onClick={closeModal} htmlFor="delete-modal" className="btn btn-success">No</label>
      <label onClick={()=> confirmAction(modalData)} htmlFor="delete-modal" className="btn btn-error">{succesButtonName}</label>
    </div>
  </div>
</div>
        </div>
    );
};

export default ConfirmModal;