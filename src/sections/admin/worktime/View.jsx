import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { deleteWorktime, getAllWorktimes, updateWorktime } from '../../../services/worktimeService';
import { getAllProjects } from '../../../services/projectsService'; 
import { getAllUsers } from '../../../services/usersService'; 
import { DeleteWorktime } from './Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './worktime.css';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';



export const View = () => {
    const [worktimes, setWorktimes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedWorktimeId, setSelectedWorktimeId] = useState(null);
    const [editingWorktime, setEditingWorktime] = useState(null); // Trạng thái cho worktime đang chỉnh sửa

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(worktimes.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWorktimes = worktimes.slice(indexOfFirstItem, indexOfLastItem);

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [worktimeData, projectData, userData] = await Promise.all([
                    getAllWorktimes(),
                    getAllProjects(),
                    getAllUsers() // Fetch users
                ]);
                setWorktimes(worktimeData);
                setProjects(projectData);
                setUsers(userData); // Set users state
            } catch (err) {
                setError(err.message || 'Cannot retrieve worktimes, projects or users');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteClick = (id) => {
        const deleteTitle = t('Delete Worktime');
   
        Swal.fire({
             title: deleteTitle,
             text: t('Are you sure you want to delete this worktime?'),
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#d33',
             cancelButtonColor: '#3085d6',
             confirmButtonText: t('Delete'),
             cancelButtonText: t('Cancel'),
        }).then(async (result) => {
             if (result.isConfirmed) {
                  try {
                       await deleteWorktime(id);
                       setWorktimes((prevWorktimes) => prevWorktimes.filter((worktime) => worktime.id !== id));
   
                       Swal.fire({
                            icon: 'success',
                            text: t('The worktime has been moved to the trash!'),
                            position: 'top-right',
                            toast: true,
                            timer: 3000,
                            showConfirmButton: false,
                       });
                  } catch (error) {
                       Swal.fire({
                            icon: 'error',
                            text: t('An error occurred while deleting the worktime.'),
                            position: 'top-right',
                            toast: true,
                            timer: 3000,
                            showConfirmButton: false,
                       });
                  }
             }
        });
   };
    


    const handleDeleteSuccess = (id) => {
        setWorktimes((prevWorktimes) => prevWorktimes.filter((worktime) => worktime.id !== id));
        toast.success('Successfully deleted the worktime!');
    };

    const handleEdit = (worktime) => {
        setEditingWorktime(worktime); // Set worktime để chỉnh sửa
    };

    const handleUpdate = async () => {
        try {
            await updateWorktime(editingWorktime.id, editingWorktime); // Gọi hàm cập nhật worktime
            setWorktimes((prevWorktimes) => 
                prevWorktimes.map((worktime) => 
                    worktime.id === editingWorktime.id ? editingWorktime : worktime
                )
            );
            toast.success('Successfully updated the worktime!');
            setEditingWorktime(null); // Đóng modal chỉnh sửa
        } catch (err) {
            toast.error('Failed to update the worktime!');
        }
    };

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
        return <div className="text-danger text-center">{error}</div>;
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4">{t('Worktimes')}</h3>
                <Link to="/taskmaneger/worktimes/add" className="btn btn-primary">
                    <i className="bi bi-plus me-2"></i> {t('Add')}
                </Link>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t('ID')}</th>
                            <th>{t('Name')}</th>
                            <th>{t('Projects')}</th>
                            <th>{t('User Create')}</th> 
                            <th>{t('Start Date')}</th>
                            <th>{t('End Date')}</th>
                            <th>{t('Description')}</th>
                            <th>{t('Actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentWorktimes.map((worktime) => {
                            const project = worktime.project_id ? projects.find((proj) => proj.id === worktime.project_id) : null;
                            const user = worktime.user_id ? users.find((usr) => usr.id === worktime.user_id) : null;

                            return (
                                <tr key={worktime.id}>
                                    <td>{worktime.id}</td>
                                    <td>
                                        {editingWorktime && editingWorktime.id === worktime.id ? (
                                            <input 
                                                type="text" 
                                                value={editingWorktime.name} 
                                                onChange={(e) => setEditingWorktime({ ...editingWorktime, name: e.target.value })} 
                                            />
                                        ) : (
                                            worktime.name
                                        )}
                                    </td>
                                    <td>
                                        {editingWorktime && editingWorktime.id === worktime.id ? (
                                            <select 
                                                value={editingWorktime.project_id} 
                                                onChange={(e) => setEditingWorktime({ ...editingWorktime, project_id: e.target.value })}
                                            >
                                                {projects.map(project => (
                                                    <option key={project.id} value={project.id}>{project.project_name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            project ? project.project_name : 'Unknown Project'
                                        )}
                                    </td> 
                                    <td>{user ? user.fullname : 'Unknown User'}</td> 
                                    <td>
                                        {editingWorktime && editingWorktime.id === worktime.id ? (
                                            <input 
                                                type="date" 
                                                value={editingWorktime.start_date} 
                                                onChange={(e) => setEditingWorktime({ ...editingWorktime, start_date: e.target.value })} 
                                            />
                                        ) : (
                                            worktime.start_date
                                        )}
                                    </td>
                                    <td>
                                        {editingWorktime && editingWorktime.id === worktime.id ? (
                                            <input 
                                                type="date" 
                                                value={editingWorktime.end_date} 
                                                onChange={(e) => setEditingWorktime({ ...editingWorktime, end_date: e.target.value })} 
                                            />
                                        ) : (
                                            worktime.end_date
                                        )}
                                    </td>
                                    <td>
                                        {editingWorktime && editingWorktime.id === worktime.id ? (
                                            <textarea 
                                                value={editingWorktime.description} 
                                                onChange={(e) => setEditingWorktime({ ...editingWorktime, description: e.target.value })}
                                            />
                                        ) : (
                                            worktime.description
                                        )}
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <button 
                                                        className="dropdown-item text-warning" 
                                                        onClick={() => handleEdit(worktime)}
                                                    >
                                                        <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                        className="dropdown-item text-danger" 
                                                        onClick={() => handleDeleteClick(worktime.id)}
                                                    >
                                                        <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
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
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            {t('Next')}
                            </button>
                        </li>
                    </ul>
                </nav>
                {editingWorktime && (
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-success" onClick={handleUpdate}>
                            Save Changes
                        </button>
                    </div>
                )}
                <ToastContainer />
                {showDeleteModal && (
                    <DeleteWorktime
                        show={showDeleteModal}
                        handleClose={() => setShowDeleteModal(false)}
                        handleDelete={handleDeleteSuccess}
                        worktimeId={selectedWorktimeId}
                    />
                )}
            </div>
        </div>
    );
};
