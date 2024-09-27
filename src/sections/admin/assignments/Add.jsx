import React, { useState } from 'react';
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
        toast.success(t('Assignment added successfully!'));
        console.log(data); // Handle assignment submission logic here
        reset();
        setTimeout(() => {
            navigate('/taskmaneger/tasks');
        }, 1000);
    };

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Add new assignment')}</span>
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
                            {...register('note', { required: t('Note is required') })}
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
                            {...register('roleId', { required: t('Role ID is required') })}
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
                            {...register('userId', { required: t('User ID is required') })}
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
                            {...register('taskId', { required: t('Task ID is required') })}
                        />
                        {errors.taskId && <div className="invalid-feedback">{errors.taskId.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-check-circle me-2"></i> {t('Add Assignment')}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};
