import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { removeUserFromDepartment } from '../../../services/deparmentsService';

export const DeleteDepartments = ({ departmentId, userId, onClose, onDeleteSuccess }) => {
    const { t } = useTranslation();

    const handleDelete = async () => {
        try {
            console.log(`Removing user with ID ${userId} from department with ID: ${departmentId}`);
            const response = await removeUserFromDepartment(departmentId, userId);
            
            if (response) {
                toast.success(t('Successfully removed the user from the department!'));
                setTimeout(() => {
                    onDeleteSuccess(); // Gọi hàm thông báo thành công
                    onClose(); // Đóng modal
                }, 1000);
            } else {
                toast.error(t('Failed to remove the user from the department!'));
            }
        } catch (error) {
            console.error('Error removing user from department:', error);
            toast.error(t('Failed to remove the user from the department!'));
        }
    };   

    const handleCancel = () => {
        toast.info(t('Cancel successfully'));
        setTimeout(() => {
            onClose(); 
        }, 1000);
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-danger">
                            {t('Remove User from Department')}
                        </h5>
                    </div>
                    <div className="modal-body">
                        <h6>{t('Are you sure you want to remove this user from the department?')}</h6>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger mt-3" onClick={handleDelete}>
                            <i className="bi bi-trash me-2"></i> {t('Remove')}
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
