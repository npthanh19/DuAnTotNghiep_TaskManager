import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


const Modal = ({ show, item, onClose }) => {
     const { t } = useTranslation();

     return (
          <BootstrapModal show={show} onHide={onClose} size="xl" centered dialogClassName="modal-xl modal-responsive">
               <BootstrapModal.Header closeButton>
                    <BootstrapModal.Title>
                         {item.type}: {item.name}
                    </BootstrapModal.Title>
               </BootstrapModal.Header>
               <BootstrapModal.Body>
                    <p>
                         <strong>{t('Path')}:</strong> {item.path}
                    </p>
                    <p>
                         <strong>{t('Date')}:</strong> {item.date}
                    </p>
               </BootstrapModal.Body>
               <BootstrapModal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                         {t('Close')}
                    </button>
               </BootstrapModal.Footer>
          </BootstrapModal>
     );
};

export default Modal;
