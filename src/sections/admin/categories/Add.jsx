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
        toast.success(t('Thêm mới thành công!'));
        console.log(data); // Bạn có thể xử lý logic gửi dữ liệu ở đây
        reset();
        setTimeout(() => {
            navigate('/admin/categories');
        }, 1000);
    };

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Add new')}</span>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">
                            {t('Name Category')}
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            className={`form-control ${errors.categoryName ? 'is-invalid' : ''}`}
                            {...register('categoryName', { required: t('Tên danh mục không được để trống') })}
                        />
                        {errors.categoryName && <div className="invalid-feedback">{errors.categoryName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">
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
                        <label htmlFor="categoryStatus" className="form-label">
                            {t('Status')}
                        </label>
                        <select
                            id="categoryStatus"
                            className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                            {...register('status', { required: t('Trạng thái không được để trống') })}>
                            <option value="Active">{t('Active')}</option>
                            <option value="Inactive">{t('Inactive')}</option>
                        </select>
                        {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoryCreatedAt" className="form-label">
                            {t('Created At')}
                        </label>
                        <input
                            type="date"
                            id="categoryCreatedAt"
                            className={`form-control ${errors.createdAt ? 'is-invalid' : ''}`}
                            {...register('createdAt', { required: t('Ngày tạo không được để trống') })}
                        />
                        {errors.createdAt && <div className="invalid-feedback">{errors.createdAt.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoryImage" className="form-label">
                            {t('Image')}
                        </label>
                        <input
                            type="file"
                            id="categoryImage"
                            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                            {...register('image', { required: t('Hình ảnh không được để trống') })}
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoryEmail" className="form-label">
                            {t('Email')}
                        </label>
                        <input
                            type="email"
                            id="categoryEmail"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            {...register('email', {
                                required: t('Email không được để trống'),
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('Email không hợp lệ') },
                            })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoryPassword" className="form-label">
                            {t('Password')}
                        </label>
                        <input
                            type="password"
                            id="categoryPassword"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            {...register('password', { required: t('Mật khẩu không được để trống') })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-check-circle me-2"></i> {t('Thêm')}
                    </button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};
