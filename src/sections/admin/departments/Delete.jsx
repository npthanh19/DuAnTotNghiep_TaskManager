import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

export const Delete = ({ departmentId, onClose, deleteDepartment }) => {
    const { t } = useTranslation();

    const handleDelete = async () => {
        try {
            // Gọi hàm deleteDepartment để xoá department
            await deleteDepartment(departmentId);
            toast.success(t('Successfully deleted the department!'));
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            toast.error(t('Failed to delete the department. Please try again.'));
        }
    };

    const handleCancel = () => {
        toast.info(t('Canceled successfully'));
        setTimeout(() => {
            onClose();
        }, 1000);
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-danger">{t('Delete a department', { departmentId })}</h5>
                    </div>
                    <div className="modal-body">
                        <h6>{t('Are you sure you want to delete this department?')}</h6>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger mt-3" onClick={handleDelete}>
                            <i className="bi bi-trash me-2"></i> {t('Delete')}
                        </button>
                        <button type="button" className="btn btn-secondary mt-3" onClick={handleCancel}>
                            <i className="bi bi-x-circle me-2"></i> {t('Cancel')}
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};
