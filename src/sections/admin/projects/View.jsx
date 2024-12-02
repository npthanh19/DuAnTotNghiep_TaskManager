import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';
import { getAllUsers } from '../../../services/usersService';
import { getAllProjects, deleteProject } from '../../../services/projectsService';
import { getUserById } from '../../../services/usersService';
import AddDepartmentForm from './AddDepartmentForm';
import Swal from 'sweetalert2';

export const View = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedProjectId, setSelectedProjectId] = useState(null);
     const [projects, setProjects] = useState([]);
     const [users, setUsers] = useState({}); // Lưu danh sách người dùng
     const [loading, setLoading] = useState(true);
     const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
     const [currentProjectId, setCurrentProjectId] = useState(null);

     useEffect(() => {
          const fetchProjectsAndUsers = async () => {
               try {
                    // Fetch all projects
                    const projectsData = await getAllProjects();

                    // Sắp xếp dự án theo `id` giảm dần
                    const sortedProjects = projectsData.sort((a, b) => b.id - a.id);
                    setProjects(sortedProjects);

                    // Lấy tất cả người dùng
                    const usersData = await getAllUsers(); // Gọi API lấy người dùng
                    const usersMap = usersData.reduce((acc, user) => {
                         acc[user.id] = user.fullname;
                         return acc;
                    }, {});
                    setUsers(usersMap);

                    // Lấy thông tin người dùng cho các dự án
                    const userIds = [...new Set(sortedProjects.map((project) => project.user_id))];
                    const userPromises = userIds.map((id) => getUserById(id));
                    const usersDataFromProjects = await Promise.all(userPromises);
                    const usersMapFromProjects = usersDataFromProjects.reduce((acc, user) => {
                         acc[user.id] = user.fullname;
                         return acc;
                    }, {});
                    setUsers((prevUsers) => ({ ...prevUsers, ...usersMapFromProjects }));
               } catch (error) {
                    console.error('Error fetching projects or users:', error);
               } finally {
                    setLoading(false);
               }
          };

          fetchProjectsAndUsers();
     }, []);

     const handleDeleteClick = (id, projectName, role) => {
          const project = projects.find((p) => p.id === id);
          if (!project) return;

          if (role === 'Staff' && (project.status === 'in progress' || project.status === 'done')) {
               Swal.fire({
                    icon: 'error',
                    text: t('You cannot delete a project that is in progress or completed.'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
               return;
          }

          const deleteTitle = t('Delete Project');

          Swal.fire({
               title: deleteTitle,
               text: t('Are you sure you want to delete this project?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         await deleteProject(id);
                         setProjects((prevTasks) => prevTasks.filter((task) => task.id !== id));

                         Swal.fire({
                              icon: 'success',
                              text: t('The project has been moved to the trash!'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         Swal.fire({
                              icon: 'error',
                              text: t('An error occurred while deleting the task.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    }
               }
          });
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedProjectId(null);
     };

     const handleDeleteSuccess = (id) => {
          setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/projects/edit/${id}`);
     };

     const handleAddDepartmentClick = (projectId) => {
          setCurrentProjectId(projectId);
          setShowAddDepartmentForm(true);
     };

     const handleAddSuccess = () => {
          setShowAddDepartmentForm(false);
     };

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

     const totalPages = Math.ceil(projects.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     if (loading) {
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">{t('Loading...')}</span>
                    </div>
               </div>
          );
     }

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Projects')}</span>
                    </h3>
                    <div className="d-flex align-items-center ms-auto">
                         <Link to="/taskmaneger/projects/add" className="btn btn-primary">
                              <i className="bi bi-plus me-2"></i> {t('Add')}
                         </Link>
                         <button
                              className="btn btn-outline-secondary btn-sm d-flex align-items-center ms-2"
                              onClick={() => navigate('/taskmaneger/projects/trashed')}>
                              <i className="bi bi-trash me-2"></i>
                         </button>
                    </div>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="col">STT</th>
                                   <th className="col">{t('ID')}</th>
                                   <th className="col">{t('Project Name')}</th>
                                   <th className="col">{t('Start Date')}</th>
                                   <th className="col">{t('End Date')}</th>
                                   <th className="col">{t('Status')}</th>
                                   <th className="col">{t('User Create')}</th>
                                   <th className="col">{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentProjects.map((project, index) => (
                                   <tr key={project.id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{project.id}</td>
                                        <td>{project.project_name}</td>
                                        <td>{project.start_date}</td>
                                        <td>{project.end_date}</td>
                                        <td>
                                             {project.status === 'to do' && (
                                                  <span className="badge bg-secondary text-wrap status-badge d-flex justify-content-center align-items-center">
                                                       {t('Not yet implemented')}
                                                  </span>
                                             )}
                                             {project.status === 'in progress' && (
                                                  <span className="badge bg-warning text-dark text-wrap status-badge d-flex justify-content-center align-items-center">
                                                       {t('Ongoing')}
                                                  </span>
                                             )}
                                             {project.status === 'preview' && (
                                                  <span className="badge bg-info text-dark text-wrap status-badge d-flex justify-content-center align-items-center">
                                                       {t('Complete')}
                                                  </span>
                                             )}
                                             {project.status === 'done' && (
                                                  <span className="badge bg-success text-wrap status-badge d-flex justify-content-center align-items-center">
                                                       {t('Destroy')}
                                                  </span>
                                             )}
                                        </td>
                                        <td>{users[project.user_id] ? users[project.user_id] : <span className="badge bg-secondary">none</span>}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${project.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical me-2"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${project.id}`}>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-warning"
                                                                 onClick={() => handleAddDepartmentClick(project.id)}>
                                                                 <i className="bi bi-plus me-2"></i> {t('Room')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(project.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeleteClick(project.id, project.project_name)}>
                                                                 <i className="bi bi-trash me-2"></i>
                                                                 {t('Delete')}
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
                    <nav aria-label="Page navigation">
                         <ul className="pagination mt-2">
                              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                   <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                        {t('Previous')}
                                   </button>
                              </li>
                              {[...Array(totalPages)].map((_, index) => (
                                   <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                             {index + 1}
                                        </button>
                                   </li>
                              ))}
                              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                   <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}>
                                        {t('Next')}
                                   </button>
                              </li>
                         </ul>
                    </nav>
               </div>
               <ToastContainer position="top-right" />
               {showDeleteModal && (
                    <Delete show={showDeleteModal} onClose={handleCloseModal} onDeleteSuccess={handleDeleteSuccess} id={selectedProjectId} />
               )}
               {showAddDepartmentForm && <AddDepartmentForm projectId={currentProjectId} onAddSuccess={handleAddSuccess} />}
          </div>
     );
};
