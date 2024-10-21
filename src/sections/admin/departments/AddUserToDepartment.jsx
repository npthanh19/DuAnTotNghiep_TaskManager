import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'; // Import react-select
import { addUserToDepartment, removeUserFromDepartment, getDepartmentById } from '../../../services/deparmentsService';
import { getAllUsers } from '../../../services/usersService';

const AddUserToDepartment = ({ departmentId, onClose, onRemoveSuccess = () => {}, onAddSuccess }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [addedUserIds, setAddedUserIds] = useState([]);

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const departmentData = await getDepartmentById(departmentId);
                setDepartmentName(departmentData.department_name);
                setAddedUserIds(departmentData.users.map((user) => user.id)); // Giả sử departmentData.users chứa danh sách người dùng hiện tại
            } catch (error) {
                console.error('Error fetching department:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchDepartment();
        fetchUsers();
    }, [departmentId]);

    const handleUserChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
        setSelectedUserIds(values);
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUserIds || selectedUserIds.length === 0) {
            toast.error('Vui lòng chọn ít nhất một người dùng để thêm!');
            return;
        }
        try {
            // Gửi trực tiếp selectedUserIds thay vì bọc vào một đối tượng
            await addUserToDepartment(departmentId, selectedUserIds);
            setAddedUserIds((prev) => [...prev, ...selectedUserIds]);
            toast.success('Người dùng đã được thêm vào phòng ban thành công!');
            onAddSuccess();
        } catch (error) {
            console.error('Error adding user to department:', error);
            toast.error('Có lỗi xảy ra khi thêm người dùng vào phòng ban! Vui lòng thử lại.');
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            await removeUserFromDepartment(departmentId, userId);
            toast.success('Người dùng đã được xóa khỏi phòng ban!');

            if (typeof onRemoveSuccess === 'function') {
                onRemoveSuccess();
            } else {
                console.warn('onRemoveSuccess is not a function');
            }

            setAddedUserIds((prev) => prev.filter((id) => id !== userId));
        } catch (error) {
            console.error('Error removing user from department:', error);
            toast.error('Có lỗi xảy ra khi xóa người dùng khỏi phòng ban! Vui lòng thử lại.');
        }
    };

    const availableUsers = users.filter((user) => !addedUserIds.includes(user.id));

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Thêm Người Dùng vào Phòng Ban: {departmentName}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddSubmit}>
                            <div className="mb-3">
                                <label htmlFor="departmentName" className="form-label">Tên Phòng Ban</label>
                                <input type="text" className="form-control" id="departmentName" value={departmentName} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="existingUsers" className="form-label">Chọn Người Dùng Có Sẵn</label>
                                <Select
                                    options={availableUsers.map((user) => ({ value: user.id, label: user.name }))}
                                    onChange={handleUserChange}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    isMulti
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Thêm</button>
                        </form>

                        <h6 className="mt-3">Người Dùng Đã Thêm:</h6>
                        <ul className="list-group">
                            {addedUserIds.map((id) => {
                                const user = users.find((usr) => usr.id === id);
                                return (
                                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {user ? user.name : 'Người dùng không xác định'}
                                        <button className="btn btn-danger btn-sm" onClick={() => handleRemoveUser(id)}>Xóa</button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserToDepartment;
