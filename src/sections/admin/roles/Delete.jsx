import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { deleteRole } from '../../../services/rolesService';

export const DeleteRoles = ({ rolesId, onClose, onDeleteSuccess }) => {
     const { t } = useTranslation();

     const handleDelete = async () => {
          try {
               await deleteRole(rolesId);
               toast.success(t('Successfully deleted the role!'));

               setTimeout(() => {
                    onDeleteSuccess();
                    onClose();
               }, 1000);
          } catch (error) {
               console.error('Error deleting role:', error);
               toast.error(t('Failed to delete the role: ') + (error.message || ''));
          }
     };

     const handleCancel = () => {
          toast.info(t('Cancel successfully'));
          onClose();
     };

     return (
          <div className="modal fade show d-block" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
               <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title text-danger">{t('Delete a digital catalogue', { rolesId })}</h5>
                         </div>
                         <div className="modal-body">
                              <h6>{t('Are you sure you want to delete this role?')}</h6>
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