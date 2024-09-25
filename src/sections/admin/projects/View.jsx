import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';

export const View = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedProjectId(id);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedProjectId(null);
    };

    // Mock deleteProject function (replace with actual API call)
    const deleteProject = async (id) => {
        // Example API call: await api.delete(`/projects/${id}`);
        console.log(`Project ID ${id} deleted.`);
    };

    const handleEdit = (id) => {
        navigate(`/taskmaneger/projects/edit/${id}`);
    };

    const handleStatusChange = (id, newStatus) => {
        console.log(`Project ID ${id} status changed to ${newStatus}`);
    };

    const projects = [
        { id: 1, project_name: 'Project 1', description: 'Description 1', start_date: '2024-01-01', end_date: '2024-12-31', status: 'Active', department_id: 1, user_id: 101 },
        { id: 2, project_name: 'Project 2', description: 'Description 2', start_date: '2024-02-01', end_date: '2024-11-30', status: 'Inactive', department_id: 2, user_id: 102 },
        // Add more projects as needed
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Projects')}</span>
                </h3>
                <Link to="/taskmaneger/projects/add" className="btn btn-primary">
                    <i className="bi bi-plus me-2"></i> {t('Add new project')}
                </Link>
            </div>
            <div className="card-body" style={{ padding: '0' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-1">ID</th>
                            <th className="col-2">{t('Project Name')}</th>
                            <th className="col-2">{t('Description')}</th>
                            <th className="col-2">{t('Start Date')}</th>
                            <th className="col-2">{t('End Date')}</th>
                            <th className="col-1">{t('Status')}</th>
                            <th className="col-1">{t('Department ID')}</th>
                            <th className="col-1">{t('User ID')}</th>
                            <th className="col-1">{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProjects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.project_name}</td>
                                <td>{project.description}</td>
                                <td>{project.start_date}</td>
                                <td>{project.end_date}</td>
                                <td>
                                    <select
                                        value={project.status}
                                        onChange={(e) => handleStatusChange(project.id, e.target.value)}
                                        className="form-select">
                                        <option value="Active">{t('Active')}</option>
                                        <option value="Inactive">{t('Inactive')}</option>
                                    </select>
                                </td>
                                <td>{project.department_id}</td>
                                <td>{project.user_id}</td>
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
                                                <button className="dropdown-item text-warning" onClick={() => handleEdit(project.id)}>
                                                    <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={() => handleDeleteClick(project.id)}>
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

            {showDeleteModal && (
                <Delete projectId={selectedProjectId} onClose={handleCloseModal} deleteProject={deleteProject} />
            )}
        </div>
    );
};
