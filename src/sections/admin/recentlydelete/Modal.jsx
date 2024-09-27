import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({ show, item, onClose }) => {
     return (
          <BootstrapModal show={show} onHide={onClose} size="xl" centered dialogClassName="modal-xl modal-responsive">
               <BootstrapModal.Header closeButton>
                    <BootstrapModal.Title>
                         {item.type}: {item.name}
                    </BootstrapModal.Title>
               </BootstrapModal.Header>
               <BootstrapModal.Body>
                    <p>
                         <strong>Path:</strong> {item.path}
                    </p>
                    <p>
                         <strong>Date:</strong> {item.date}
                    </p>
               </BootstrapModal.Body>
               <BootstrapModal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                         Close
                    </button>
               </BootstrapModal.Footer>
          </BootstrapModal>
     );
};

export default Modal;
