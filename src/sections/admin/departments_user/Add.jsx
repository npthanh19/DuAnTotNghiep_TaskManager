     import React, { useEffect, useState } from 'react';
     import { useTranslation } from 'react-i18next';
     import { useParams, useNavigate } from 'react-router-dom';
     import { useForm } from 'react-hook-form';
     import { toast, ToastContainer } from 'react-toastify';
     import { getDepartmentById, addUserToDepartment } from '../../../services/deparmentsService';
     import { getAllUsers } from '../../../services/usersService';

     export const Add = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [departments, setDepartment] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
     const [users, setUsers] = useState([]);

     useEffect(() => {
          const fetchDepartment = async () => {
               if (!id) {
                    setError('Invalid department ID');
                    setLoading(false);
                    return;
               }
               try {
                    const fetchedDepartment = await getDepartmentById(id);
                    setDepartment(fetchedDepartment);
                    setValue('department_name', fetchedDepartment.department_name);
               } catch (err) {
                    setError(err.message || 'Không thể lấy thông tin phòng ban');
               } finally {
                    setLoading(false);
               }
          };

          const fetchUsers = async () => {
               try {
                    const allUsers = await getAllUsers();
                    setUsers(allUsers);
               } catch (err) {
                    setError(err.message || 'Không thể lấy danh sách người dùng');
               }
          };

          fetchDepartment();
          fetchUsers();
     }, [id, setValue]);


     const onSubmit = async (data) => {
          if (!id || !data.userId) {
              toast.error(t('Invalid department or user ID'));
              return;
          }
      
          console.log("Adding user with data:", { departmentId: id, userId: data.userId });
      
          try {
              // Gọi hàm thêm người dùng vào phòng ban
              const addUserResponse = await addUserToDepartment(id, data.userId);
              if (addUserResponse && addUserResponse.message === "Users added to department successfully.") {
                  toast.success(`${t('Thêm mới thành công!')} ${t('User ID')}: ${data.userId}`);
                  reset();
                  navigate(`/taskmaneger/departments_user/details/${id}`);
              } else {
                  throw new Error(t('Failed to add user to department'));
              }
          } catch (error) {
              const errorMessage = error.message || t('Thêm không thành công');
              console.error(`Error adding user to department: ${errorMessage}`);
              toast.error(errorMessage);
          }
      };
      
      
     

     return (
          <div className="card my-4">
               <div className="card-header">
                    <h3>{t('Add User to Department')}</h3>
               </div>
               <div className="card-body">
                    {loading ? (
                         <p>{t('Loading...')}</p>
                    ) : error ? (
                         <p className="text-danger">{error}</p>
                    ) : (
                         <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="department_name" className="form-label">
                                   {t('Department Name')}
                              </label>
                              <input
                                   type="text"
                                   id="department_name"
                                   className={`form-control ${errors.department_name ? 'is-invalid' : ''}`}
                                   {...register('department_name', { required: t('Department name cannot be empty') })}
                                   disabled
                              />
                              {errors.department_name && <div className="invalid-feedback">{errors.department_name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="userId" className="form-label">
                                   {t('User')}
                              </label>
                              <select
                                   id="userId"
                                   className={`form-select ${errors.userId ? 'is-invalid' : ''}`}
                                   {...register('userId', { required: t('User ID cannot be empty') })}
                              >
                                   <option value="">{t('Chọn người dùng')}</option>
                                   {users.length === 0 ? (
                                        <option disabled>{t('No users available')}</option>
                                   ) : (
                                        users.map((user) => (
                                             <option key={user.id} value={user.id}>
                                             {user.name}
                                             </option>
                                        ))
                                   )}
                              </select>
                              {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Thêm')}
                         </button>
                         </form>
                    )}
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
     };
