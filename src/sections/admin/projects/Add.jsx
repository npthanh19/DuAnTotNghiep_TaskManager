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
        toast.success(t('Project added successfully!'));
        console.log(data); // Handle project submission logic here
        reset();
        setTimeout(() => {
            navigate('/taskmaneger/projects');
        }, 1000);
    };

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Add new project')}</span>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="projectName" className="form-label">
                            {t('Project Name')}
                        </label>
                        <input
                            type="text"
                            id="projectName"
                            className={`form-control ${errors.projectName ? 'is-invalid' : ''}`}
                            {...register('projectName', { required: t('Project name is required') })}
                        />
                        {errors.projectName && <div className="invalid-feedback">{errors.projectName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="projectDescription" className="form-label">
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
                        <label htmlFor="projectStatus" className="form-label">
                            {t('Status')}
                        </label>
                        <select
                            id="projectStatus"
                            className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                            {...register('status', { required: t('Status is required') })}>
                            <option value="Active">{t('Active')}</option>
                            <option value="Inactive">{t('Inactive')}</option>
                        </select>
                        {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="projectStartDate" className="form-label">
                            {t('Start Date')}
                        </label>
                        <input
                            type="date"
                            id="projectStartDate"
                            className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                            {...register('startDate', { required: t('Start date is required') })}
                        />
                        {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="projectEndDate" className="form-label">
                            {t('End Date')}
                        </label>
                        <input
                            type="date"
                            id="projectEndDate"
                            className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                            {...register('endDate', { required: t('End date is required') })}
                        />
                        {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="projectManagerEmail" className="form-label">
                            {t('Project Manager Email')}
                        </label>
                        <input
                            type="email"
                            id="projectManagerEmail"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            {...register('email', {
                                required: t('Email is required'),
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('Invalid email format') },
                            })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="projectImage" className="form-label">
                            {t('Image')}
                        </label>
                        <input
                            type="file"
                            id="projectImage"
                            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                            {...register('image', { required: t('Image is required') })}
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-check-circle me-2"></i> {t('Add Project')}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};
