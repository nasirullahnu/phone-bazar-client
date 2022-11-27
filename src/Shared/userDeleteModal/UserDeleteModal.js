import React from 'react';

const UserDeleteModal = ({title, message, closeModal, confirmAction, modalData, succesButtonName}) => {
    return (
        <div>
            <input type="checkbox" id="delete-user" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{title}</h3>
    <h3>{message}</h3>
    <div className="modal-action">
      <label onClick={closeModal} htmlFor="delete-user" className="btn btn-success">No</label>
      <label onClick={()=> confirmAction(modalData)} htmlFor="delete-user" className="btn btn-error">{succesButtonName}</label>
    </div>
  </div>
</div>
        </div>
    );
};

export default UserDeleteModal;