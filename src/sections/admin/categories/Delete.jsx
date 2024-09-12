import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DeleteCategories = ({ categoryId, onClose }) => {
     const handleDelete = () => {
          toast.success('Danh mục xoá thành công!');
          setTimeout(() => {
               onClose();
          }, 1000);
     };

     const handleCancel = () => {
          toast.success('Huỷ thành công!');
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
                                   Xoá danh mục <span>số: {categoryId}</span>{' '}
                              </h5>
                         </div>
                         <div className="modal-body">
                              <h6>Bạn chắc chắn muốn xoá danh mục này?</h6>
                         </div>
                         <div className="modal-footer">
                              <button type="button" className="btn btn-danger mt-3" onClick={handleDelete}>
                                   <i className="bi bi-trash me-2"></i> Xoá
                              </button>
                              <button type="button" className="btn btn-secondary mt-3" onClick={handleCancel}>
                                   <i className="bi bi-x-circle me-2"></i> Huỷ
                              </button>
                         </div>
                    </div>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
