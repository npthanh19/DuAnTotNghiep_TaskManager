import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { getAssignmentById, updateAssignment, getDepartmentsByTask, getUsersByDepartment } from '../../../services/assignmentService';
import { getAllTasks } from '../../../services/tasksService';

export const Edit = () => {
     const { id } = useParams();
     const { t } = useTranslation();
     const navigate = useNavigate();

     const [assignment, setAssignment] = useState(null);
     const [tasks, setTasks] = useState([]);
     const [departments, setDepartments] = useState([]);
     const [users, setUsers] = useState([]);
     const [status, setStatus] = useState(1);
     const [note, setNote] = useState('');

     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
          getValues,
     } = useForm();

     useEffect(() => {
          const fetchAssignment = async () => {
               try {
                    const fetchedAssignment = await getAssignmentById(id);
                    if (fetchedAssignment) {
                         setAssignment(fetchedAssignment);
                         setNote(fetchedAssignment.note || '');
                         reset({
                              taskId: fetchedAssignment.task_id || '',
                              userId: fetchedAssignment.user.id || '',
                              status: fetchedAssignment.status || '1',
                              departmentId: fetchedAssignment.department.id || '',
                              note: fetchedAssignment.note || '',
                         });
                         await fetchDepartments(fetchedAssignment.task_id);
                         await fetchUsers(fetchedAssignment.department.id);
                    }
               } catch (error) {
                    console.error('Failed to fetch assignment:', error);
               }
          };

          const fetchTasks = async () => {
               try {
                    const fetchedTasks = await getAllTasks();
                    setTasks(fetchedTasks);
               } catch (error) {
                    console.error('Failed to fetch tasks:', error);
               }
          };

          fetchAssignment();
          fetchTasks();
     }, [id, reset]);

     const fetchUsers = async (departmentId) => {
          try {
               const response = await getUsersByDepartment(departmentId);
               setUsers(Array.isArray(response.users) ? response.users : []);
          } catch (error) {
               console.error('Failed to fetch users:', error);
               setUsers([]);
          }
     };

     const fetchDepartments = async (taskId) => {
          try {
               const response = await getDepartmentsByTask(taskId);
               setDepartments(Array.isArray(response.departments) ? response.departments : []);
          } catch (error) {
               setDepartments([]);
          }
     };

     const handleTaskChange = async (e) => {
          const taskId = e.target.value;
          if (taskId) {
               await fetchDepartments(taskId);
               reset({
                    taskId: taskId,
                    userId: '',
                    departmentId: '',
               });
               setUsers([]);
          } else {
               setDepartments([]);
               setUsers([]);
          }
     };

     const handleDepartmentChange = async (e) => {
          const departmentId = e.target.value;
          if (departmentId) {
               await fetchUsers(departmentId);
               reset({
                    ...getValues(),
                    userId: '',
               });
          } else {
               setUsers([]);
               reset({
                    ...getValues(),
                    userId: '',
               });
          }
     };

     const onSubmit = async (data) => {
          const assignmentData = {
               task_id: data.taskId,
               user_ids: [data.userId],
               department_id: data.departmentId,
               status: status,
               note: data.note,
          };

          try {
               await updateAssignment(id, assignmentData);
               Swal.fire({
                    icon: 'success',
                    text: t('Assignment updated successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               }).then(() => {
                    navigate('/taskmaneger/assignments');
               });
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    text: t('Failed to update assignment.'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               console.error('Error updating assignment:', error);
          }
     };

     if (!assignment)
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
               </div>
          );

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Edit Assignment')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="taskId" className="form-label">
                                        {t('Task')}
                                   </label>
                                   <select
                                        id="taskId"
                                        className={`form-select form-select-sm ${errors.taskId ? 'is-invalid' : ''}`}
                                        {...register('taskId', { required: t('Task is required') })}
                                        onChange={handleTaskChange}
                                        value={assignment.task_id || ''}>
                                        <option value="">{t('Select Task')}</option>
                                        {tasks.map((task) => (
                                             <option key={task.id} value={task.id}>
                                                  {task.task_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.taskId && <div className="invalid-feedback">{errors.taskId.message}</div>}
                              </div>

                              <div className="col">
                                   <label htmlFor="departmentId" className="form-label">
                                        {t('Department')}
                                   </label>
                                   <select
                                        id="departmentId"
                                        className={`form-select form-select-sm ${errors.departmentId ? 'is-invalid' : ''}`}
                                        {...register('departmentId', { required: t('Department is required') })}
                                        onChange={handleDepartmentChange}
                                        value={assignment.department.id || ''}>
                                        <option value="">{t('Select Department')}</option>
                                        {departments.map((department) => (
                                             <option key={department.id} value={department.id}>
                                                  {department.department_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.departmentId && <div className="invalid-feedback">{errors.departmentId.message}</div>}
                              </div>
                         </div>
                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="userId" className="form-label">
                                        {t('User')}
                                   </label>
                                   <select
                                        id="userId"
                                        className={`form-select form-select-sm ${errors.userId ? 'is-invalid' : ''}`}
                                        {...register('userId', { required: t('User is required') })}
                                        value={assignment.user.id || ''}>
                                        <option value="">{t('Select User')}</option>
                                        {users.map((user) => (
                                             <option key={user.id} value={user.id}>
                                                  {user.fullname}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
                              </div>

                              <div className="col">
                                   <label htmlFor="status" className="form-label">
                                        {t('Status')}
                                   </label>
                                   <select
                                        id="status"
                                        className={`form-select form-select-sm ${errors.status ? 'is-invalid' : ''}`}
                                        {...register('status', { required: t('Status is required') })}
                                        onChange={(e) => setStatus(e.target.value)}
                                        value={assignment.status || '1'}>
                                        <option value="1">To do</option>
                                        <option value="2">In progress</option>
                                        <option value="3">Preview</option>
                                        <option value="4">Done</option>
                                   </select>
                                   {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                              </div>
                         </div>
                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="note" className="form-label">
                                        {t('Note')}
                                   </label>
                                   <textarea
                                        id="note"
                                        className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                                        {...register('note', { required: t('Note is required') })}
                                        value={note} // Lấy giá trị note từ state
                                        onChange={(e) => setNote(e.target.value)} // Cập nhật giá trị khi thay đổi
                                        rows="3" // Cấu hình chiều cao cho textarea
                                   />
                                   {errors.note && <div className="invalid-feedback">{errors.note.message}</div>}
                              </div>
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-2"></i> {t('Update Assignment')}
                         </button>
                    </form>
               </div>
          </div>
     );
};
