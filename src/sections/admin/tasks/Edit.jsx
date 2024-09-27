import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Edit = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [task, setTask] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            const fetchedTask = {
                id,
                taskName: `Task ${id}`,
                description: `Description of task ${id}`,
                status: 'Active',
                startDate: '2023-01-01', // Example start date
                endDate: '2023-12-31', // Example end date
                projectId: '1', // Example project ID
            };
            setTask(fetchedTask);
            reset(fetchedTask);
        };
        fetchTask();
    }, [id, reset]);

    const onSubmit = (data) => {
        toast.success(t('Cập nhật nhiệm vụ thành công!'));
        setTimeout(() => {
            navigate('/taskmaneger/tasks');
        }, 1000);
    };

    if (!task) return <p>{t('Đang tải...')}</p>;

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Update Task')}</span>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="taskName" className="form-label">
                            {t('Task Name')}
                        </label>
                        <input
                            type="text"
                            id="taskName"
                            className={`form-control ${errors.taskName ? 'is-invalid' : ''}`}
                            {...register('taskName', { required: t('Tên nhiệm vụ không được để trống!') })}
                        />
                        {errors.taskName && <div className="invalid-feedback">{errors.taskName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="taskDescription" className="form-label">
                            {t('Description')}
                        </label>
                        <textarea
                            id="taskDescription"
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            {...register('description', { required: t('Mô tả không được để trống!') })}
                        />
                        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="taskStatus" className="form-label">
                            {t('Status')}
                        </label>
                        <select
                            id="taskStatus"
                            className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                            {...register('status', { required: t('Trạng thái không được để trống!') })}>
                            <option value="Active">{t('Hoạt động')}</option>
                            <option value="Inactive">{t('Không hoạt động')}</option>
                        </select>
                        {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">
                            {t('Start Date')}
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                            {...register('startDate', { required: t('Ngày bắt đầu không được để trống!') })}
                        />
                        {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">
                            {t('End Date')}
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                            {...register('endDate', { required: t('Ngày kết thúc không được để trống!') })}
                        />
                        {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="projectId" className="form-label">
                            {t('Project ID')}
                        </label>
                        <input
                            type="text"
                            id="projectId"
                            className={`form-control ${errors.projectId ? 'is-invalid' : ''}`}
                            {...register('projectId', { required: t('Project ID không được để trống!') })}
                        />
                        {errors.projectId && <div className="invalid-feedback">{errors.projectId.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-check-circle me-2"></i> {t('Cập nhật')}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};
