import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Edit = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [assignment, setAssignment] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignment = async () => {
            // Giả lập fetch dữ liệu assignment dựa trên id
            const fetchedAssignment = {
                id,
                note: `Note for assignment ${id}`,
                roleId: '1', // Ví dụ role ID
                userId: '1', // Ví dụ user ID
                taskId: '1', // Ví dụ task ID
            };
            setAssignment(fetchedAssignment);
            reset(fetchedAssignment);
        };
        fetchAssignment();
    }, [id, reset]);

    const onSubmit = (data) => {
        toast.success(t('Cập nhật phân công thành công!'));
        setTimeout(() => {
            navigate('/taskmaneger/tasks');
        }, 1000);
    };

    if (!assignment) return <p>{t('Đang tải...')}</p>;

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Cập nhật phân công')}</span>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="note" className="form-label">
                            {t('Note')}
                        </label>
                        <textarea
                            id="note"
                            className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                            {...register('note', { required: t('Ghi chú không được để trống!') })}
                        />
                        {errors.note && <div className="invalid-feedback">{errors.note.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="roleId" className="form-label">
                            {t('Role ID')}
                        </label>
                        <input
                            type="text"
                            id="roleId"
                            className={`form-control ${errors.roleId ? 'is-invalid' : ''}`}
                            {...register('roleId', { required: t('Role ID không được để trống!') })}
                        />
                        {errors.roleId && <div className="invalid-feedback">{errors.roleId.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userId" className="form-label">
                            {t('User ID')}
                        </label>
                        <input
                            type="text"
                            id="userId"
                            className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                            {...register('userId', { required: t('User ID không được để trống!') })}
                        />
                        {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="taskId" className="form-label">
                            {t('Task ID')}
                        </label>
                        <input
                            type="text"
                            id="taskId"
                            className={`form-control ${errors.taskId ? 'is-invalid' : ''}`}
                            {...register('taskId', { required: t('Task ID không được để trống!') })}
                        />
                        {errors.taskId && <div className="invalid-feedback">{errors.taskId.message}</div>}
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
