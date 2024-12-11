import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';
import { getAllUsers } from '../../../services/usersService';
import { getAllProjects, deleteProject, getProjectById, updateProjectStatus } from '../../../services/projectsService';
import { getUserById } from '../../../services/usersService';
import AddDepartmentForm from './AddDepartmentForm';
import Swal from 'sweetalert2';
import styled from 'styled-components';

export const View = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedProjectId, setSelectedProjectId] = useState(null);
     const [projects, setProjects] = useState([]);
     const [users, setUsers] = useState({});
     const [loading, setLoading] = useState(true);
     const [filteredProject, setFilteredProject] = useState(null);
     const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
     const [currentProjectId, setCurrentProjectId] = useState(null);
     const [filteredProjects, setFilteredProjects] = useState([]);
     const [selectedProjectName, setSelectedProjectName] = useState(null);
     const [searchTerm, setSearchTerm] = useState('');

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const projectsData = await getAllProjects();

                    const sortedProjects = projectsData.sort((a, b) => b.id - a.id);
                    setProjects(sortedProjects);

                    const usersData = await getAllUsers();
                    const usersMap = usersData.reduce((acc, user) => {
                         acc[user.id] = user.fullname;
                         return acc;
                    }, {});
                    setUsers(usersMap);

                    const userIds = [...new Set(sortedProjects.map((project) => project.user_id))];
                    const userPromises = userIds.map((id) => getUserById(id));
                    const usersDataFromProjects = await Promise.all(userPromises);
                    const usersMapFromProjects = usersDataFromProjects.reduce((acc, user) => {
                         acc[user.id] = user.fullname;
                         return acc;
                    }, {});

                    setUsers((prevUsers) => ({ ...prevUsers, ...usersMapFromProjects }));
               } catch (error) {
                    console.error('Error fetching data:', error);
               } finally {
                    setLoading(false);
               }
          };

          fetchData();
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
     const currentProjects = filteredProject ? [filteredProject] : projects.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(projects.length / itemsPerPage);

     const handleSearchChange = (event) => {
          setSearchTerm(event.target.value);
     };

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleFilterChange = async (projectName) => {
          setSelectedProjectName(projectName);
          if (projectName === null) {
               setFilteredProject(null);
          } else {
               const project = projects.find((p) => p.project_name === projectName);
               if (project) {
                    try {
                         const projectDetails = await getProjectById(project.id);
                         setFilteredProject(projectDetails);
                    } catch (error) {
                         console.error('Error fetching project details:', error);
                    }
               }
          }
     };

     const handleChangeStatus = async (projectId, newStatus) => {
          const result = await Swal.fire({
               title: t('Are you sure you want to change the status?'),
               text: t('The project status will be updated.'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: t('Yes, change'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await updateProjectStatus(projectId, newStatus);
                    setProjects((prevProjects) =>
                         prevProjects.map((project) => (project.id === projectId ? { ...project, status: newStatus } : project)),
                    );
                    Swal.fire({
                         title: t('Success!'),
                         text: t('The project status has been updated.'),
                         icon: 'success',
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               } catch (error) {
                    console.error('Error updating status:', error);
                    Swal.fire({
                         title: t('Error!'),
                         text: t('Failed to update the status. Please try again.'),
                         icon: 'error',
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          }
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

     const StatusSelect = styled.select`
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;

          background-color: ${({ status }) =>
               status === 'to do' ? '#f8f9fa' : status === 'in progress' ? '#ffc107' : status === 'preview' ? '#17a2b8' : '#28a745'};
          color: ${({ status }) => (status === 'to do' || status === 'in progress' ? '#212529' : '#fff')};

          &:focus {
               background-color: #ffffff;
               color: #212529;
          }
     `;

     const StatusOption = styled.option`
          text-align: center;
     `;

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center border-bottom py-3">
                    <h3 className="fw-bold text-center text-primary mb-0 fs-4">
                         <span className="marquee">{t('Projects')}</span>
                    </h3>
                    <div className="d-flex align-items-center">
                         <div className="d-flex align-items-center ms-3">
                              <div className="dropdown ms-2">
                                   <button
                                        className="btn btn-outline-secondary btn-sm dropdown-toggle rounded-pill"
                                        type="button"
                                        id="dropdownFilterButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <i className="bi bi-funnel me-2"></i> {t('Filter')}
                                   </button>
                                   <ul className="dropdown-menu" aria-labelledby="dropdownFilterButton">
                                        <li>
                                             <a
                                                  className={`dropdown-item ${selectedProjectName === null ? 'bg-success text-white' : ''}`}
                                                  href="#"
                                                  onClick={() => handleFilterChange(null)}>
                                                  {t('Show all')}
                                                  {selectedProjectName === null && (
                                                       <span className={`${selectedProjectName === null ? 'd-inline-block' : 'd-none'} ms-2`}></span>
                                                  )}
                                             </a>
                                        </li>

                                        {projects.map((project) => (
                                             <li key={project.id}>
                                                  <a
                                                       className={`dropdown-item ${
                                                            selectedProjectName === project.project_name ? 'bg-success text-white' : ''
                                                       }`}
                                                       href="#"
                                                       onClick={() => handleFilterChange(project.project_name)}>
                                                       {project.project_name}
                                                       {selectedProjectName === project.project_name && (
                                                            <span
                                                                 className={`${
                                                                      selectedProjectName === project.project_name ? 'd-inline-block' : 'd-none'
                                                                 } ms-2`}></span>
                                                       )}
                                                  </a>
                                             </li>
                                        ))}
                                   </ul>
                              </div>

                              <Link to="/taskmaneger/projects/add" className="btn btn-primary btn-sm rounded-pill">
                                   <i className="bi bi-plus me-2"></i> {t('Add')}
                              </Link>
                              <button
                                   className="btn btn-outline-secondary btn-sm ms-2 rounded-pill"
                                   onClick={() => navigate('/taskmaneger/projects/trashed')}>
                                   <i className="bi bi-trash me-2"></i>
                              </button>
                         </div>
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
                              {currentProjects.length === 0 ? (
                                   <tr>
                                        <td colSpan="7" className="text-center">
                                             <span>{t('No project found')}</span>
                                        </td>
                                   </tr>
                              ) : (
                                   currentProjects.map((project, index) => (
                                        <tr key={project.id}>
                                             <td>{indexOfFirstItem + index + 1}</td>
                                             <td>{project.id}</td>
                                             <td title={project.project_name}>
                                                  {project.project_name.length > 20
                                                       ? `${project.project_name.slice(0, 20)}...`
                                                       : project.project_name}
                                             </td>
                                             <td>{project.start_date}</td>
                                             <td>{project.end_date}</td>
                                             <td>
                                                  <StatusSelect
                                                       status={project.status}
                                                       value={project.status}
                                                       onChange={(e) => handleChangeStatus(project.id, e.target.value)}>
                                                       <StatusOption value="to do">{t('Not yet implemented')}</StatusOption>
                                                       <StatusOption value="in progress">{t('Ongoing')}</StatusOption>
                                                       <StatusOption value="preview">{t('Complete')}</StatusOption>
                                                       <StatusOption value="done">{t('Destroy')}</StatusOption>
                                                  </StatusSelect>
                                             </td>
                                             <td>
                                                  {users[project.user_id] ? (
                                                       <span title={users[project.user_id]}>
                                                            {users[project.user_id].length > 20
                                                                 ? `${users[project.user_id].slice(0, 20)}...`
                                                                 : users[project.user_id]}
                                                       </span>
                                                  ) : (
                                                       <span className="badge bg-secondary">-</span>
                                                  )}
                                             </td>
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
                                                                 <button
                                                                      className="dropdown-item text-warning"
                                                                      onClick={() => handleEdit(project.id)}>
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
                                   ))
                              )}
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
               {showDeleteModal && (
                    <Delete show={showDeleteModal} onClose={handleCloseModal} onDeleteSuccess={handleDeleteSuccess} id={selectedProjectId} />
               )}
               {showAddDepartmentForm && <AddDepartmentForm projectId={currentProjectId} onAddSuccess={handleAddSuccess} />}
          </div>
     );
};
