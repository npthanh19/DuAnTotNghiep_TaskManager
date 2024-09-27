import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';

export const View = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedAssignmentId(id);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedAssignmentId(null);
    };

    // Mock deleteAssignment function (replace with actual API call)
    const deleteAssignment = async (id) => {
        // Example API call: await api.delete(`/assignments/${id}`);
        console.log(`Assignment ID ${id} deleted.`);
    };

    const handleEdit = (id) => {
        navigate(`/taskmaneger/assignments/edit/${id}`);
    };

    const handleDetails = (id) => {
        navigate(`/taskmaneger/assignments/details/${id}`);
    };

    const assignments = [
        {
            id: 1,
            note: 'Note 1',
            role_id: 1,
            user_id: 1,
            task_id: 1,
        },
        {
            id: 2,
            note: 'Note 2',
            role_id: 2,
            user_id: 2,
            task_id: 2,
        },
        // Add more assignments as needed
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAssignments = assignments.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(assignments.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Assignments')}</span>
                </h3>
                <Link to="/taskmaneger/assignments/add" className="btn btn-primary">
                    <i className="bi bi-plus me-2"></i> {t('Add new assignment')}
                </Link>
            </div>
            <div className="card-body" style={{ padding: '0' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-1">ID</th>
                            <th className="col-2">{t('Note')}</th>
                            <th className="col-2">{t('Role ID')}</th>
                            <th className="col-2">{t('User ID')}</th>
                            <th className="col-2">{t('Task ID')}</th>
                            <th className="col-1">{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAssignments.map((assignment) => (
                            <tr key={assignment.id}>
                                <td>{assignment.id}</td>
                                <td>{assignment.note}</td>
                                <td>{assignment.role_id}</td>
                                <td>{assignment.user_id}</td>
                                <td>{assignment.task_id}</td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-sm"
                                            type="button"
                                            id={`dropdownMenuButton${assignment.id}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${assignment.id}`}>
                                            <li>
                                                <button className="dropdown-item text-primary" onClick={() => handleDetails(assignment.id)}>
                                                    <i className="bi bi-info-circle me-2"></i> {t('Details')}
                                                </button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item text-warning" onClick={() => handleEdit(assignment.id)}>
                                                    <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                </button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item text-danger" onClick={() => handleDeleteClick(assignment.id)}>
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

            {showDeleteModal && <Delete taskId={selectedAssignmentId} onClose={handleCloseModal} deleteTask={deleteAssignment} />}
        </div>
    );
};
