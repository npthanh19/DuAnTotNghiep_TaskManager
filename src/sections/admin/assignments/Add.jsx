import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { createAssignment } from '../../../services/assignmentService';
import { getAllProjects } from '../../../services/projectsService';
import { getTasksByProject } from '../../../services/tasksService';
import { getDepartmentsByProjectId } from '../../../services/tasksService'; // Dịch vụ lấy phòng ban theo dự án
import { getUsersByDepartment } from '../../../services/assignmentService'; // Dịch vụ lấy người dùng theo phòng ban

export const Add = () => {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     const [projects, setProjects] = useState([]);
     const [tasks, setTasks] = useState([]);
     const [departments, setDepartments] = useState([]);
     const [users, setUsers] = useState([]);
     const [selectedProjectId, setSelectedProjectId] = useState(null);
     const [selectedTaskId, setSelectedTaskId] = useState(null);
     const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
     const [status, setStatus] = useState(1);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const projectsData = await getAllProjects();
                    setProjects(projectsData);
               } catch (error) {
                    console.error('Failed:', error);
               }
          };

          fetchData();
     }, []);

     const handleProjectChange = async (e) => {
          const projectId = e.target.value;
          setSelectedProjectId(projectId);

          if (projectId) {
               try {
                    const response = await getTasksByProject(projectId);
                    if (Array.isArray(response.tasks)) {
                         setTasks(response.tasks);
                    } else {
                         setTasks([]);
                    }
                    setSelectedTaskId(null);
                    setDepartments([]);
                    setUsers([]);
               } catch (error) {
                    setTasks([]);
               }
          } else {
               setTasks([]);
               setDepartments([]);
               setUsers([]);
          }
     };

     const handleTaskChange = async (e) => {
          const taskId = e.target.value;
          setSelectedTaskId(taskId);

          if (taskId) {
               try {
                    const response = await getDepartmentsByProjectId(selectedProjectId);
                    if (Array.isArray(response.departments)) {
                         setDepartments(response.departments);
                    } else {
                         setDepartments([]);
                    }
                    setSelectedDepartmentId(null);
                    setUsers([]);
               } catch (error) {
                    setDepartments([]);
               }
          } else {
               setDepartments([]);
               setUsers([]);
          }
     };

     const handleDepartmentChange = async (e) => {
          const departmentId = e.target.value;
          setSelectedDepartmentId(departmentId);

          if (departmentId) {
               try {
                    const response = await getUsersByDepartment(departmentId);
                    if (Array.isArray(response.users)) {
                         setUsers(response.users);
                    } else {
                         setUsers([]);
                    }
               } catch (error) {
                    setUsers([]);
               }
          } else {
               setUsers([]);
          }
     };

     const onSubmit = async (data) => {
          console.log('Form data:', data);
          const assignmentData = {
               task_id: data.taskId,
               user_ids: [data.userId],
               department_id: selectedDepartmentId,
               project_id: data.projectId,
               status: data.status,
               note: data.note,
          };

          try {
               await createAssignment(assignmentData);
               Swal.fire({
                    icon: 'success',
                    text: t('Added successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               navigate('/taskmaneger/assignments');
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    title: t('Added Failed!'),
                    text: error.message || t('Something went wrong'),
               });
          }
     };

     return (
          <div className="card my-4">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Add new assignment')}</span>
                    </h3>
               </div>
               <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="projectId" className="form-label">
                                        {t('Project Name')}
                                   </label>
                                   <select
                                        id="projectId"
                                        className={`form-select form-select-sm ${errors.projectId ? 'is-invalid' : ''}`}
                                        {...register('projectId', { required: t('Project is required') })}
                                        onChange={handleProjectChange}>
                                        <option value="">{t('Select Project')}</option>
                                        {projects.map((project) => (
                                             <option key={project.id} value={project.id}>
                                                  {project.project_name}
                                             </option>
                                        ))}
                                   </select>
                                   {errors.projectId && <div className="invalid-feedback">{errors.projectId.message}</div>}
                              </div>
                         </div>

                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="taskId" className="form-label">
                                        {t('Task Name')}
                                   </label>
                                   <select
                                        id="taskId"
                                        className={`form-select form-select-sm ${errors.taskId ? 'is-invalid' : ''}`}
                                        {...register('taskId', { required: t('Task is required') })}
                                        onChange={handleTaskChange}>
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
                                        {t('Department Name')}
                                   </label>
                                   <select
                                        id="departmentId"
                                        className={`form-select form-select-sm ${errors.departmentId ? 'is-invalid' : ''}`}
                                        {...register('departmentId', { required: t('Department is required') })}
                                        onChange={handleDepartmentChange}>
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
                                        {t('User Name')}
                                   </label>
                                   <select
                                        id="userId"
                                        className={`form-select form-select-sm ${errors.userId ? 'is-invalid' : ''}`}
                                        {...register('userId', { required: t('User is required') })}>
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
                                        onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">{t('Select Status')}</option>
                                        <option value="1">{t('To Do')}</option>
                                        <option value="2">{t('In Progress')}</option>
                                        <option value="3">{t('Preview')}</option>
                                        <option value="4">{t('Done')}</option>
                                   </select>
                                   {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                              </div>
                         </div>

                         <div className="row mb-3">
                              <div className="col">
                                   <label htmlFor="note" className="form-label">
                                        {t('Note')}
                                   </label>
                                   <textarea id="note" className="form-control" rows="4" {...register('note')} />
                              </div>
                         </div>

                         <button type="submit" className="btn btn-success">
                              <i className="bi bi-check-circle me-3"></i> {t('Add')}
                         </button>
                    </form>
               </div>
          </div>
     );
};
