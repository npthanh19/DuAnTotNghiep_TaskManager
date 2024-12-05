import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTrashedProjects, restoreProject, forceDeleteProject } from '../../../services/projectsService'; // Cập nhật service API
import { useForm } from 'react-hook-form';

function RecentlyDeletedProjects() {
     const [projects, setProjects] = useState([]);
     const { t } = useTranslation();
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;
     const [searchTerm, setSearchTerm] = useState('');
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     useEffect(() => {
          const fetchTrashedProjects = async () => {
               try {
                    const trashProjects = await getTrashedProjects();
                    setProjects(trashProjects.projects);
               } catch (error) {
                    setError(error.message);
               } finally {
                    setLoading(false);
               }
          };

          fetchTrashedProjects();
     }, []);

     const handleRestore = async (id) => {
          const result = await Swal.fire({
               title: t('Restore project'),
               text: t('Are you sure you want to restore this project?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: t('Restore'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await restoreProject(id);
                    setProjects(projects.filter((project) => project.id !== id));
                    Swal.fire({
                         icon: 'success',
                         title: t('Restore'),
                         text: t('Project restored successfully.'),
                         showConfirmButton: false,
                         timer: 2000,
                         toast: true,
                         position: 'top-right',
                    });
                    reset();
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         title: t('Restore Failed!'),
                         text: t('Something went wrong'),
                    });
               }
          }
     };

     const handleDeletePermanently = async (id) => {
          const result = await Swal.fire({
               title: t('Delete Project'),
               text: t('Are you sure you want to permanently delete this project?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await forceDeleteProject(id);
                    setProjects(projects.filter((project) => project.id !== id));
                    Swal.fire({
                         icon: 'success',
                         title: t('Delete'),
                         text: t('Project permanently deleted.'),
                         showConfirmButton: false,
                         timer: 3000,
                         toast: true,
                         position: 'top-right',
                    });
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         title: t('Delete Failed!'),
                         text: t('An error occurred while deleting the project'),
                    });
               }
          }
     };

     const filteredProjects = Array.isArray(projects)
          ? projects.filter((project) => project.project_name && project.project_name.toLowerCase().includes(searchTerm.toLowerCase()))
          : [];

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
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
                         <span>{t('Recently Deleted Projects')}</span>
                    </h3>
                    <div className="d-flex align-items-center ms-auto">
                         <input
                              type="text"
                              className="form-control form-control-sm me-2"
                              placeholder={t('Search...')}
                              value={searchTerm}
                              onChange={handleSearchChange}
                         />
                    </div>
                    <button className="btn btn-outline-secondary me-2" onClick={() => window.history.back()}>
                         <i className="bi bi-arrow-left me-2"></i>
                    </button>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr className="text-center">
                                   <th>{t('ID')}</th>
                                   <th>{t('Project Name')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentProjects.map((project) => (
                                   <tr key={project.id} className="text-center">
                                        <td>{project.id}</td>
                                        <td>{project.project_name}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${project.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${project.id}`}>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleRestore(project.id)}>
                                                                 <i className="bi bi-arrow-clockwise me-2"></i> {t('Restore')}
                                                            </button>
                                                       </li>

                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeletePermanently(project.id)}>
                                                                 <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                              {currentProjects.length === 0 && (
                                   <tr>
                                        <td colSpan="3" className="text-center">
                                             {t('No recently deleted projects found.')}
                                        </td>
                                   </tr>
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
          </div>
     );
}

export default RecentlyDeletedProjects;
