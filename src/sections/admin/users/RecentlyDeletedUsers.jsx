import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTrashedUsers, restoreUser, forceDelete } from '../../../services/usersService';

function RecentlyDeletedUsers() {
    const [users, setUsers] = useState([]);
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTrashedUsers = async () => {
            try {
                const trashedUsers = await getTrashedUsers();
                setUsers(trashedUsers);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrashedUsers();
    }, []);


    const handleRestore = async (id) => {
        const result = await Swal.fire({
            title: t('Khôi phục người dùng'),
            text: t('Bạn có chắc chắn muốn khôi phục người dùng này?'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('Khôi phục'),
            cancelButtonText: t('Hủy')
        });

        if (result.isConfirmed) {
            try {
                await restoreUser(id);
                setUsers(users.filter(user => user.id !== id));
                toast.success(t('Người dùng đã được khôi phục thành công.'));
            } catch (error) {
                toast.error(t('Đã xảy ra lỗi khi khôi phục người dùng.'));
            }
        }
    };

    const handleDeletePermanently = async (id) => {
        const result = await Swal.fire({
            title: t('Xóa người dùng'),
            text: t('Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này?'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('Xóa'),
            cancelButtonText: t('Hủy')
        });

        if (result.isConfirmed) {
            try {
                await forceDelete(id);
                setUsers(users.filter(user => user.id !== id));
                toast.success(t('Người dùng đã được xóa vĩnh viễn.'));
            } catch (error) {
                toast.error(t('Đã xảy ra lỗi khi xóa người dùng.'));
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.fullname && user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
                    <span>{t('Recently Deleted Users')}</span>
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
                <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => window.history.back()}>
                    <i className="bi bi-arrow-left me-2"></i>
                </button>
            </div>
            <div className="card-body" style={{ padding: '0' }}>
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>{t('ID')}</th>
                            <th>{t('Full Name')}</th>
                            <th>{t('Email')}</th>
                            <th>{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="text-center">
                                <td>{user.id}</td>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-sm"
                                            type="button"
                                            id={`dropdownMenuButton${user.id}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${user.id}`}>
                                            <li>
                                                <button className="dropdown-item text-warning" onClick={() => handleRestore(user.id)}>
                                                    <i className="bi bi-pencil me-2"></i> {t('Restore')}
                                                </button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item text-danger" onClick={() => handleDeletePermanently(user.id)}>
                                                    <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {currentUsers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center">{t('No recently deleted users found.')}</td>
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
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default RecentlyDeletedUsers;