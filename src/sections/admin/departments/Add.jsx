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
        toast.success(t('Department added successfully!'));
        console.log({ ...data, description }); // Log data including description
        reset();
        setTimeout(() => {
            navigate('/taskmaneger/departments'); // Adjust the navigation path as needed
        }, 1000);
    };

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Add New Department')}</span>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="departmentName" className="form-label">
                            {t('Department Name')}
                        </label>
                        <input
                            type="text"
                            id="departmentName"
                            className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                            {...register('departmentName', { required: t('Department name is required') })}
                        />
                        {errors.departmentName && (
                            <div className="invalid-feedback">{errors.departmentName.message}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
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
                        {errors.description && (
                            <div className="invalid-feedback">{errors.description.message}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-check-circle me-2"></i> {t('Add Department')}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};
