import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { addUsersToDepartment, removeUserFromDepartment, getDepartmentById } from '../../../services/deparmentsService';
import { getAllUsers } from '../../../services/usersService';
import { useTranslation } from 'react-i18next';

const AddUserToDepartment = ({ departmentId, onClose, onRemoveSuccess = () => { }, onAddSuccess }) => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [departmentName, setDepartmentName] = useState('');
    const [addedUserIds, setAddedUserIds] = useState([]);

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const departmentData = await getDepartmentById(departmentId);
                setDepartmentName(departmentData.department_name);
                setAddedUserIds(departmentData.users.map((user) => user.id));
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
            toast.error(t('Please select at least one user to add!'));
            return;
        }
        try {
            await addUsersToDepartment(departmentId, selectedUserIds);
            setAddedUserIds((prev) => [...prev, ...selectedUserIds]);
            toast.success(t('Users have been successfully added to the department!'));
            onAddSuccess();
        } catch (error) {
            toast.error(t('Failed!'));
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            await removeUserFromDepartment(departmentId, userId);
            toast.success(t('User has been removed from the department!'));

            if (typeof onRemoveSuccess === 'function') {
                onRemoveSuccess();
            } else {
                console.warn('onRemoveSuccess is not a function');
            }
            setAddedUserIds((prev) => prev.filter((id) => id !== userId));
        } catch (error) {
            toast.error(t('Failed!'));
        }
    };

    const availableUsers = users.filter((user) => !addedUserIds.includes(user.id));

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{t('Add Users to Department')}: {departmentName}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddSubmit}>
                            <div className="mb-3">
                                <label htmlFor="departmentName" className="form-label">{t('Department Name')}</label>
                                <input type="text" className="form-control" id="departmentName" value={departmentName} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="existingUsers" className="form-label">{t('Select Available Users')}</label>
                                <Select
                                    options={availableUsers.map((user) => ({ value: user.id, label: user.name }))}
                                    onChange={handleUserChange}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    isMulti
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">{t('Add')}</button>
                        </form>

                        <h6 className="mt-3">{t('Added Users To Departments')}:</h6>
                        <ul className="list-group">
                            {addedUserIds.length === 0 ? (
                                <li className="list-group-item text-center">{t('No users are currently in this department.')}</li>
                            ) : (
                                addedUserIds.map((id) => {
                                    const user = users.find((usr) => usr.id === id);
                                    return (
                                        <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                            {user ? user.name : t('Undefined User')}
                                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveUser(id)}>{t('Remove')}</button>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserToDepartment;
