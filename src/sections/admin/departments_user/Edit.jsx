import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Edit = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [departmentUser, setDepartmentUser] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartmentUser = async () => {
            // Giả lập fetch dữ liệu department user dựa trên id
            const fetchedDepartmentUser = {
                id,
                department_name: `Department name for user ${id}`,
                description: 'Sample description',
                userId: '1', // Ví dụ user ID
                departmentId: '101', // Ví dụ department ID
            };
            setDepartmentUser(fetchedDepartmentUser);
            reset(fetchedDepartmentUser);
        };
        fetchDepartmentUser();
    }, [id, reset]);

    const onSubmit = (data) => {
        toast.success(t('Cập nhật thông tin phòng ban thành công!'));
        setTimeout(() => {
            navigate('/taskmaneger/departments');
        }, 1000);
    };

    if (!departmentUser) return <p>{t('Đang tải...')}</p>;

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Cập nhật thông tin phòng ban')}</span>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="department_name" className="form-label">
                            {t('Tên phòng ban')}
                        </label>
                        <input
                            type="text"
                            id="department_name"
                            className={`form-control ${errors.department_name ? 'is-invalid' : ''}`}
                            {...register('department_name', { required: t('Tên phòng ban không được để trống!') })}
                        />
                        {errors.department_name && <div className="invalid-feedback">{errors.department_name.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            {t('Mô tả')}
                        </label>
                        <textarea
                            id="description"
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            {...register('description', { required: t('Mô tả không được để trống!') })}
                        />
                        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
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
                        <label htmlFor="departmentId" className="form-label">
                            {t('Department ID')}
                        </label>
                        <input
                            type="text"
                            id="departmentId"
                            className={`form-control ${errors.departmentId ? 'is-invalid' : ''}`}
                            {...register('departmentId', { required: t('Department ID không được để trống!') })}
                        />
                        {errors.departmentId && <div className="invalid-feedback">{errors.departmentId.message}</div>}
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
