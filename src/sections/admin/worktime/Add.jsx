import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { createWorktime } from '../../../services/worktimeService';
import { getAllProjects } from '../../../services/projectsService';
import 'react-toastify/dist/ReactToastify.css';

export const Add = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectList = await getAllProjects();
                setProjects(projectList);
            } catch (error) {
                console.error('Failed to fetch projects:', error);
                toast.error(t('Failed to load projects!')); // Thông báo lỗi
            }
        };

        fetchProjects();
    }, [t]);

    const onSubmit = async (data) => {
        console.log(data); // Kiểm tra dữ liệu gửi đi
        try {
            await createWorktime(data); // Gọi API để thêm worktime
            toast.success(t('Worktime added successfully!'));
            reset(); // Đặt lại form sau khi thành công
            setTimeout(() => {
                navigate('/taskmaneger/worktimes'); // Điều hướng đến trang worktimes
            }, 1000);
        } catch (error) {
            toast.error(t('Failed to add worktime!'));
            console.error('Failed to add worktime:', error); // Ghi log lỗi
        }
    };

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Add New Worktime')}</span>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            {t('Worktime Name')}
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                            {...register('name', { required: t('Worktime name is required!') })}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>

                    {/* Project ID */}
                    <div className="mb-3">
                        <label htmlFor="project_id" className="form-label">
                            {t('Project')}
                        </label>
                        <select
                            id="project_id"
                            className={`form-control form-control-sm ${errors.project_id ? 'is-invalid' : ''}`}
                            {...register('project_id', { required: t('Project selection is required!') })}
                        >
                            <option value="">{t('Select a project')}</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.project_name} {/* Giả định rằng tên dự án nằm trong thuộc tính project_name */}
                                </option>
                            ))}
                        </select>
                        {errors.project_id && <div className="invalid-feedback">{errors.project_id.message}</div>}
                    </div>

                    {/* Start Date */}
                    <div className="mb-3">
                        <label htmlFor="start_date" className="form-label">
                            {t('Start Date')}
                        </label>
                        <input
                            type="date"
                            id="start_date"
                            className={`form-control form-control-sm ${errors.start_date ? 'is-invalid' : ''}`}
                            {...register('start_date', { required: t('Start date is required!') })}
                        />
                        {errors.start_date && <div className="invalid-feedback">{errors.start_date.message}</div>}
                    </div>

                    {/* End Date */}
                    <div className="mb-3">
                        <label htmlFor="end_date" className="form-label">
                            {t('End Date')}
                        </label>
                        <input
                            type="date"
                            id="end_date"
                            className={`form-control form-control-sm ${errors.end_date ? 'is-invalid' : ''}`}
                            {...register('end_date', { required: t('End date is required!') })}
                        />
                        {errors.end_date && <div className="invalid-feedback">{errors.end_date.message}</div>}
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            {t('Description')}
                        </label>
                        <textarea
                            id="description"
                            className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`}
                            rows="5"
                            {...register('description', { required: t('Description cannot be empty!') })}
                        ></textarea>
                        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-check-circle me-3"></i> {t('Add Worktime')}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};
