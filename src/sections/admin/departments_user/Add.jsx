import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Add = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        toast.success(t('Department user added successfully!'));
        console.log(data); // Handle department user submission logic here
        reset();
        setTimeout(() => {
            navigate('/taskmaneger/departments');
        }, 1000);
    };

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Add new department user')}</span>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="department_name" className="form-label">
                            {t('Department Name')}
                        </label>
                        <input
                            type="text"
                            id="department_name"
                            className={`form-control ${errors.department_name ? 'is-invalid' : ''}`}
                            {...register('department_name', { required: t('Department name is required') })}
                        />
                        {errors.department_name && <div className="invalid-feedback">{errors.department_name.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            {t('Description')}
                        </label>
                        <textarea
                            id="description"
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            {...register('description', { required: t('Description is required') })}
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
                            {...register('userId', { required: t('User ID is required') })}
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
                            {...register('departmentId', { required: t('Department ID is required') })}
                        />
                        {errors.departmentId && <div className="invalid-feedback">{errors.departmentId.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-check-circle me-2"></i> {t('Add Department User')}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};
