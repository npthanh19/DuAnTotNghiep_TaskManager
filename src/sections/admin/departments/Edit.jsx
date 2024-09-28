import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Edit = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [department, setDepartment] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            const fetchedDepartment = {
                id,
                departmentName: `Department ${id}`, // Example department name
                description: `Description of department ${id}`, // Example description
            };
            setDepartment(fetchedDepartment);
            reset(fetchedDepartment);
        };
        fetchDepartment();
    }, [id, reset]);

    const onSubmit = (data) => {
        toast.success(t('Cập nhật phòng ban thành công!'));
        setTimeout(() => {
            navigate('/taskmaneger/departments');
        }, 1000);
    };

    if (!department) return <p>{t('Đang tải...')}</p>;

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Update Department')}</span>
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
                            {...register('departmentName', { required: t('Tên phòng ban không được để trống!') })}
                        />
                        {errors.departmentName && <div className="invalid-feedback">{errors.departmentName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            {t('Description')}
                        </label>
                        <textarea
                            id="description"
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            {...register('description', { required: t('Mô tả không được để trống!') })}
                        />
                        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
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
