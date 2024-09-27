import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const Add = () => {
    const { t } = useTranslation();
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        toast.success(t('Task added successfully!'));
        console.log(data); // Handle task submission logic here
        reset();
        setTimeout(() => {
            navigate('/taskmaneger/tasks');
        }, 1000);
    };

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Add new task')}</span>
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
                            {...register('taskName', { required: t('Task name is required') })}
                        />
                        {errors.taskName && <div className="invalid-feedback">{errors.taskName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="taskDescription" className="form-label">
                            {t('Description')}
                        </label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setDescription(data);
                            }}
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
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
                            {...register('status', { required: t('Status is required') })}>
                            <option value="Active">{t('Active')}</option>
                            <option value="Inactive">{t('Inactive')}</option>
                        </select>
                        {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="taskStartDate" className="form-label">
                            {t('Start Date')}
                        </label>
                        <input
                            type="date"
                            id="taskStartDate"
                            className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                            {...register('startDate', { required: t('Start date is required') })}
                        />
                        {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="taskEndDate" className="form-label">
                            {t('End Date')}
                        </label>
                        <input
                            type="date"
                            id="taskEndDate"
                            className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                            {...register('endDate', { required: t('End date is required') })}
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
                            {...register('projectId', { required: t('Project ID is required') })}
                        />
                        {errors.projectId && <div className="invalid-feedback">{errors.projectId.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-check-circle me-2"></i> {t('Add Task')}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};
