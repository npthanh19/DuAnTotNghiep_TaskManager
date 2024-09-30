import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete'; // Import component delete cho 

export const View = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDepartmentUserId, setSelectedDepartmentUserId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedDepartmentUserId(id);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedDepartmentUserId(null);
    };

    // Mock deleteDepartmentUser function (replace with actual API call)
    const deleteDepartmentUser = async (id) => {
        // Example API call: await api.delete(`/departmentUsers/${id}`);
        console.log(`departments_user ID ${id} deleted.`);
    };

    const handleEdit = (id) => {
        navigate(`/taskmaneger/departments_user/edit/${id}`);
    };

   

    const departmentUsers = [
        {
            id: 1,
            department_name: 'IT Department',
            description: 'Handles IT related tasks',
            user_id: 1,
            department_id: 101,
        },
        {
            id: 2,
            department_name: 'HR Department',
            description: 'Handles human resources',
            user_id: 2,
            department_id: 102,
        },
        // Add more department users as needed
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDepartmentUsers = departmentUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(departmentUsers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Department Users')}</span>
                </h3>
                <Link to="/taskmaneger/departments_user/add" className="btn btn-primary">
                    <i className="bi bi-plus me-2"></i> {t('Add new department user')}
                </Link>
            </div>
            <div className="card-body" style={{ padding: '0' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-1">ID</th>
                            <th className="col-2">{t('Department Name')}</th>
                            <th className="col-3">{t('Description')}</th>
                            <th className="col-2">{t('User ID')}</th>
                            <th className="col-2">{t('Department ID')}</th>
                            <th className="col-1">{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDepartmentUsers.map((departmentUser) => (
                            <tr key={departmentUser.id}>
                                <td>{departmentUser.id}</td>
                                <td>{departmentUser.department_name}</td>
                                <td>{departmentUser.description}</td>
                                <td>{departmentUser.user_id}</td>
                                <td>{departmentUser.department_id}</td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-sm"
                                            type="button"
                                            id={`dropdownMenuButton${departmentUser.id}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${departmentUser.id}`}>
                                            <li>
                                                <button className="dropdown-item text-warning" onClick={() => handleEdit(departmentUser.id)}>
                                                    <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                </button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item text-danger" onClick={() => handleDeleteClick(departmentUser.id)}>
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
                <Delete
                    departmentUserId={selectedDepartmentUserId}
                    onClose={handleCloseModal}
                    deleteDepartmentUser={deleteDepartmentUser}
                />
            )}
        </div>
    );
};
