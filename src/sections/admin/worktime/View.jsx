import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { deleteWorktime, getAllWorktimes } from '../../../services/worktimeService';
import { getAllProjects } from '../../../services/projectsService'; 
import { DeleteWorktime } from './Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const View = () => {
    const [worktimes, setWorktimes] = useState([]);
    const [projects, setProjects] = useState([]); // State to store projects
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedWorktimeId, setSelectedWorktimeId] = useState(null);

    // Pagination setup
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(worktimes.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWorktimes = worktimes.slice(indexOfFirstItem, indexOfLastItem);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorktimesAndProjects = async () => {
            try {
                const [worktimeData, projectData] = await Promise.all([getAllWorktimes(), getAllProjects()]);
                console.log("Worktimes Data:", worktimeData); // Xem dữ liệu worktime
                console.log("Projects Data:", projectData); // Xem dữ liệu project
                setWorktimes(worktimeData);
                setProjects(projectData);
            } catch (err) {
                console.error('Error fetching worktimes or projects:', err.message);
                setError(err.message || 'Cannot retrieve worktimes or projects');
            } finally {
                setLoading(false);
            }
        };

        fetchWorktimesAndProjects();
    }, []);

    const handleDeleteClick = (id) => {
        setSelectedWorktimeId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteSuccess = (id) => {
        setWorktimes((prevWorktimes) => prevWorktimes.filter((worktime) => worktime.id !== id));
        toast.success('Successfully deleted the worktime!');
    };

    const handleEdit = (id) => {
        navigate(`/taskmaneger/worktimes/edit/${id}`);
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
                <h3 className="fw-bold py-3 mb-4">Worktimes</h3>
                <Link to="/taskmaneger/worktimes/add" className="btn btn-primary">
                    <i className="bi bi-plus me-2"></i> Add
                </Link>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Project</th> {/* New header for project name */}
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    {currentWorktimes.map((worktime) => {
        const project = worktime.project_id ? projects.find((proj) => proj.id === worktime.project_id) : null; // Chỉ tìm kiếm nếu project_id không phải null
        return (
            <tr key={worktime.id}>
                <td>{worktime.id}</td>
                <td>{worktime.name}</td>
                <td>{project ? project.name : (worktime.project_id === null ? 'No Project Assigned' : `Project ID ${worktime.project_id} not found`)}</td> {/* Cập nhật hiển thị tên dự án */}
                <td>{worktime.start_date}</td>
                <td>{worktime.end_date}</td>
                <td>{worktime.description}</td>
                <td>
                    <div className="dropdown">
                        <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button className="dropdown-item text-warning" onClick={() => handleEdit(worktime.id)}>
                                    <i className="bi bi-pencil me-2"></i> Edit
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item text-danger" onClick={() => handleDeleteClick(worktime.id)}>
                                    <i className="bi bi-trash me-2"></i> Delete
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
                                Previous
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
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
                <ToastContainer position="top-right" autoClose={2000} />
                {showDeleteModal && (
                    <DeleteWorktime
                        worktimeId={selectedWorktimeId}
                        onClose={() => setShowDeleteModal(false)}
                        onDeleteSuccess={handleDeleteSuccess}
                    />
                )}
            </div>
        </div>
    );
};
