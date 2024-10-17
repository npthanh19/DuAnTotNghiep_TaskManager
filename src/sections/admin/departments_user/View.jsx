import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DeleteDepartments } from '../../../sections/admin/departments_user/Delete';
import { getDepartmentById } from '../../../services/deparmentsService';

export function View() {
    const { id } = useParams();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const fetchedDepartment = await getDepartmentById(id);
                if (fetchedDepartment) {
                    console.log("Fetched Department:", fetchedDepartment); // Kiểm tra dữ liệu
                    setDepartment(fetchedDepartment);
                } else {
                    throw new Error("Không tìm thấy phòng ban");
                }
            } catch (err) {
                setError(err.message || 'Không thể lấy thông tin phòng ban');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [id]);

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    };

    const handleEdit = (id) => {
        console.log("Navigating to Edit with User ID:", id); 
        navigate(`/taskmaneger/departments_user/edit/${id}`);
    };

    const handleDeleteSuccess = () => {
        navigate(`/taskmaneger/departments_user/details/${id}`);
    };

    // Logic for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = department?.users?.slice(indexOfFirstItem, indexOfLastItem) || [];
    const totalPages = Math.ceil((department?.users?.length || 0) / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Department Details')}</span>
                </h3>
                <Link to={`/taskmaneger/departments_user/add/${id}`} className="btn btn-primary">
                    <i className="bi bi-plus me-2"></i> {t('Add new')}
                </Link>
            </div>
            <div className="card-body" style={{ padding: '0' }}>
                {department && (
                    <>
                        <table className="table">
                            <thead>
                                <tr className="text-center">
                                    <th>ID</th>
                                    <th>{t('Name')}</th>
                                    <th>{t('User ID')}</th>
                                    <th>{t('Actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr key={user.id} className="text-center">
                                        <td>{user.id}</td>
                                        <td>{department.department_name}</td>
                                        <td>{user.name}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-sm"
                                                    type="button"
                                                    id={`dropdownMenuButton${user.id}`}
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${user.id}`}>
                                                    <li>
                                                        <button className="dropdown-item text-warning" onClick={() => handleEdit(user.id)}>
                                                            <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item text-danger" onClick={handleDeleteClick}>
                                                            <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
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
                    </>
                )}
            </div>
            {showDeleteModal && <DeleteDepartments id={id} onClose={handleCloseModal} onDeleteSuccess={handleDeleteSuccess} />}
        </div>
    );
}
