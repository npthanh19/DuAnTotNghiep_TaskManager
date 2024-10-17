import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { createDepartment, addUserToDepartment } from '../../../services/deparmentsService';
import 'react-toastify/dist/ReactToastify.css';

export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const [showModal, setShowModal] = useState(false);
     const [departmentId, setDepartmentId] = useState(null);
     const [userIds, setUserId] = useState('');

     const onSubmit = async (departmentData) => {
          try {
               const department = await createDepartment(departmentData);
               toast.success(t('Thêm phòng ban thành công!'));
               reset();
               setDepartmentId(department.id); // Lưu ID phòng ban vừa tạo
               setShowModal(true); // Hiện modal để thêm người dùng
          } catch (error) {
               toast.error(t('Thêm phòng ban thất bại!'));
               console.error('Failed to add department:', error);
          }
     };

     const handleAddUser = async () => {
          try {
              if (!userIds) {
                  throw new Error(t('User ID is required'));
              }
              console.log('Adding user ID:', userIds); // Log the user ID
              await addUserToDepartment(departmentId, [userIds]); // Convert to array
              toast.success(t('Thêm người dùng vào phòng ban thành công!'));
              setShowModal(false);
              setUserId('');
          } catch (error) {
              toast.error(t('Thêm người dùng vào phòng ban thất bại!'));
              console.error('Failed to add user to department:', error);
          }
      };
      
      

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add new department')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="department_name" className="form-label">
                                   {t('Name')}
                              </label>
                              <input
                                   type="text"
                                   id="departmentName"
                                   className={`form-control form-control-sm ${errors.department_name ? 'is-invalid' : ''}`}
                                   {...register('department_name', { required: t('Tên phòng ban không được để trống') })}
                              />
                              {errors.department_name && <div className="invalid-feedback">{errors.department_name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="departmentDescription" className="form-label">
                                   {t('Description')}
                              </label>
                              <textarea
                                   id="departmentDescription"
                                   className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
                                   rows="5"
                                   {...register('description', { required: t('Mô tả không được để trống') })}></textarea>
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Add Department')}
                         </button>
                    </form>

                    {/* Modal thêm người dùng */}
                    {showModal && (
                         <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                              <div className="modal-dialog">
                                   <div className="modal-content">
                                        <div className="modal-header">
                                             <h5 className="modal-title">{t('Add User to Department')}</h5>
                                             <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                             <div className="mb-3">
                                                  <label htmlFor="userIds" className="form-label">
                                                       {t('User ID')}
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="userIds"
                                                       className="form-control"
                                                       value={userIds}
                                                       onChange={(e) => setUserId(e.target.value)}
                                                  />
                                             </div>
                                        </div>
                                        <div className="modal-footer">
                                             <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                                  {t('Cancel')}
                                             </button>
                                             <button type="button" className="btn btn-primary" onClick={handleAddUser}>
                                                  {t('Add User')}
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    )}
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
