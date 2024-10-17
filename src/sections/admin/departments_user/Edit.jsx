import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDepartmentById, updateDepartment } from '../../../services/deparmentsService'; 
import { getAllUsers } from '../../../services/usersService'; 

export const Edit = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [departmentUser, setDepartmentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartmentUser = async () => {
            try {
                const department = await getDepartmentById(id);
                if (!department) {
                    throw new Error('Không tìm thấy phòng ban');
                }
                setDepartmentUser(department);
                reset(department);
                setSelectedUserIds(department.users.map(user => user.id));
            } catch (error) {
                console.error('Error fetching department user data:', error.response?.data || error.message);
                toast.error(error.response?.data?.message || 'Không tìm thấy phòng ban!');
            }
        };
    
        fetchDepartmentUser();
    }, [id, reset]);
    
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers(); // Lấy danh sách người dùng
                setUsers(userList); // Cập nhật state users
            } catch (error) {
                console.error('Error fetching users:', error.response?.data);
            }
        };
    
        fetchUsers();
    }, []);
    
    

    const onSubmit = async (data) => {
        const updatedData = {
            ...data,
            user_id: selectedUserIds, // gán user_id cho dữ liệu đã cập nhật
        };

        try {
            await updateDepartment(id, updatedData); // cập nhật phòng ban với dữ liệu mới
            toast.success('Cập nhật thành công!');
            setTimeout(() => {
                navigate(`/taskmaneger/departments_user/details/${id}`); // điều hướng đến trang chi tiết
            }, 1000);
        } catch (error) {
            console.error("Update failed:", error); // log lỗi
            toast.error('Cập nhật thất bại! ' + (error.message || ''));
        }
    };

    const handleSelectChange = (event) => {
        const options = Array.from(event.target.selectedOptions);
        const values = options.map(option => option.value);
        setSelectedUserIds(values);
    };

    if (!departmentUser) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="card my-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">{t('Update Department User')}</span>
                </h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="department_name" className="form-label">
                            {t('Name')}
                        </label>
                        <input
                            type="text"
                            id="department_name"
                            className={`form-control ${errors.department_name ? 'is-invalid' : ''}`}
                            {...register('department_name', { required: t('Department name không được để trống!') })}
                        />
                        {errors.department_name && <div className="invalid-feedback">{errors.department_name.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="user_name" className="form-label">
                            {t('User')}
                        </label>
                        <select
                            id="user_name"
                            multiple
                            className={`form-select ${errors.user_name ? 'is-invalid' : ''}`}
                            onChange={handleSelectChange}
                        >
                            <option value="">{t('Chọn người dùng')}</option>
                            {users.length === 0 ? (
                                <option disabled>{t('No users available')}</option>
                            ) : (
                                users.map((user) => (
                                    <option key={user.id} value={user.id} selected={selectedUserIds.includes(user.id)}>
                                        {user.name}
                                    </option>
                                ))
                            )}
                        </select>
                        {errors.user_name && <div className="invalid-feedback">{errors.user_name.message}</div>}
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
