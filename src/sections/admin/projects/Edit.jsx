import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProjectById, updateProject } from '../../../services/projectsService';
import { getAllUsers } from '../../../services/usersService';
import { getAllDepartments } from '../../../services/deparmentsService';

export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const [project, setProject] = useState(null);
     const [users, setUsers] = useState([]);
     const [departments, setDepartments] = useState([]);

     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const navigate = useNavigate();

     useEffect(() => {
          const fetchProject = async () => {
               try {
                    const fetchedProject = await getProjectById(id);
                    setProject(fetchedProject);
                    reset({
                         project_name: fetchedProject.project_name,
                         description: fetchedProject.description,
                         start_date: fetchedProject.start_date,
                         end_date: fetchedProject.end_date,
                         status: fetchedProject.status || '1',
                         user_id: fetchedProject.user_id,
                         department_id: fetchedProject.department_id,
                    });
               } catch (error) {
                    toast.error(t('Lỗi khi lấy thông tin dự án!'));
               }
          };
          fetchProject();
     }, [id, reset, t]);

     useEffect(() => {
          const fetchUsers = async () => {
               try {
                    const fetchedUsers = await getAllUsers();
                    setUsers(fetchedUsers);
               } catch (error) {
                    toast.error(t('Lỗi khi lấy danh sách người dùng!'));
               }
          };
          fetchUsers();
     }, [t]);

     useEffect(() => {
          const fetchDepartments = async () => {
               try {
                    const fetchedDepartments = await getAllDepartments();
                    setDepartments(fetchedDepartments);
               } catch (error) {
                    toast.error(t('Lỗi khi lấy danh sách phòng ban!'));
               }
          };
          fetchDepartments();
     }, [t]);

     const onSubmit = async (data) => {
          const mappedData = {
               project_name: data.project_name,
               description: data.description,
               start_date: data.start_date,
               end_date: data.end_date,
               status: data.status, // Trạng thái được lấy từ form
               user_id: data.user_id,
               department_id: data.department_id,
          };
          try {
               await updateProject(id, mappedData);
               toast.success(t('Cập nhật thành công!'));
               setTimeout(() => {
                    navigate('/taskmaneger/projects');
               }, 1000);
          } catch (error) {
               toast.error(t('Cập nhật thất bại!'));
          }
     };

     if (!project) {
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
               </div>
          );
     }

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Cập nhật dự án')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="mb-3">
                              <label htmlFor="project_name" className="form-label">
                                   {t('Tên dự án')}
                              </label>
                              <input
                                   type="text"
                                   id="project_name"
                                   className={`form-control form-control-sm ${errors.project_name ? 'is-invalid' : ''}`}
                                   {...register('project_name', { required: t('Tên dự án không được để trống!') })}
                              />
                              {errors.project_name && <div className="invalid-feedback">{errors.project_name.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="description" className="form-label">
                                   {t('Mô tả')}
                              </label>
                              <textarea
                                   id="description"
                                   className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
                                   {...register('description', { required: t('Mô tả không được để trống!') })}
                              />
                              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                         </div>

                         <div className="mb-3">
                              <label htmlFor="status" className="form-label">
                                   {t('Trạng thái')}
                              </label>
                              <select
                                   id="status"
                                   className={`form-select form-select-sm ${errors.status ? 'is-invalid' : ''}`}
                                   {...register('status', { required: t('Trạng thái không được để trống!') })}>
                                   <option value="1">{t('To Do')}</option>
                                   <option value="2">{t('In Progress')}</option>
                                   <option value="3">{t('Preview')}</option>
                                   <option value="4">{t('Done')}</option>
                              </select>
                              {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                         </div>

                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="start_date" className="form-label">
                                        {t('Ngày bắt đầu')}
                                   </label>
                                   <input
                                        type="date"
                                        id="start_date"
                                        className={`form-control form-control-sm ${errors.start_date ? 'is-invalid' : ''}`}
                                        {...register('start_date', { required: t('Ngày bắt đầu không được để trống!') })}
                                   />
                                   {errors.start_date && <div className="invalid-feedback">{errors.start_date.message}</div>}
                              </div>

                              <div className="col">
                                   <label htmlFor="end_date" className="form-label">
                                        {t('Ngày kết thúc')}
                                   </label>
                                   <input
                                        type="date"
                                        id="end_date"
                                        className={`form-control form-control-sm ${errors.end_date ? 'is-invalid' : ''}`}
                                        {...register('end_date', { required: t('Ngày kết thúc không được để trống!') })}
                                   />
                                   {errors.end_date && <div className="invalid-feedback">{errors.end_date.message}</div>}
                              </div>
                         </div>

                         <div className="mb-3">
                              <label htmlFor="user" className="form-label">
                                   {t('Người dùng')}
                              </label>
                              <select
                                   id="user"
                                   className={`form-select form-select-sm ${errors.user_id ? 'is-invalid' : ''}`}
                                   {...register('user_id', { required: t('Người dùng không được để trống!') })}>
                                   <option value="" disabled>
                                        {t('Chọn người dùng')}
                                   </option>
                                   {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                             {t(user.fullname)}
                                        </option>
                                   ))}
                              </select>
                              {errors.user_id && <div className="invalid-feedback">{errors.user_id.message}</div>}
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Cập nhật')}
                         </button>
                    </form>
               </div>
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
};
