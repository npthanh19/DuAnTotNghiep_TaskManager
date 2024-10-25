import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { deleteComment } from '../../../services/commentService';

export const DeleteComment = ({ id, onClose, onDeleteSuccess }) => {
    const { t } = useTranslation();

    const handleDelete = async () => {
        if (!id) return;

        try {
            await deleteComment(id);
            onDeleteSuccess(id, false); // Thêm false cho errorMsg
            onClose();
        } catch (error) {
            const errorMsg = error.response?.data?.message || t('An error occurred.');
            onDeleteSuccess(id, errorMsg); // Gọi hàm với errorMsg
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header>
                <h5 className="modal-title text-danger">{t('Delete Comment')}</h5>
            </Modal.Header>
            <Modal.Body>
                <h6>{t('Are you sure you want to delete this comment?')}</h6>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    <i className="bi bi-trash me-2"></i> {t('Delete')}
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    {t('Cancel')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
