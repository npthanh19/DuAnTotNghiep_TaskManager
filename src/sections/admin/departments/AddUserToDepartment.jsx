import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { addUsersToDepartment, removeUserFromDepartment, getDepartmentById, getUsersWithStatus } from '../../../services/deparmentsService';
import { getAllUsers } from '../../../services/usersService';
import { getAllRoles } from '../../../services/rolesService';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const AddUserToDepartment = ({ departmentId, onClose, onRemoveSuccess = () => {}, onAddSuccess }) => {
     const { t } = useTranslation();
     const [users, setUsers] = useState([]);
     const [selectedUserIds, setSelectedUserIds] = useState([]);
     const [departmentName, setDepartmentName] = useState('');
     const [addedUserIds, setAddedUserIds] = useState([]);
     const [roles, setRoles] = useState([]);
     const [usersWithStatus, setUsersWithStatus] = useState([]);
     const [currentUserRole, setCurrentUserRole] = useState(null);
     const [isLoading, setIsLoading] = useState(false);

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

          // Fetch all users
          const fetchUsers = async () => {
               try {
                    const data = await getAllUsers();
                    setUsers(data);
               } catch (error) {
                    console.error('Error fetching users:', error);
               }
          };

          const fetchRoles = async () => {
               if (currentUserRole !== 3) {
                    try {
                         const allRoles = await getAllRoles();
                         setRoles(allRoles);
                    } catch (error) {
                         console.error('Error fetching roles:', error);
                    }
               }
          };

          const fetchUsersWithStatus = async () => {
               try {
                    const data = await getUsersWithStatus(departmentId);
                    setUsersWithStatus(data);
               } catch (error) {
                    console.error('Error fetching users with status:', error);
               }
          };

          const fetchCurrentUserRole = () => {
               const storedRole = localStorage.getItem('role');
               setCurrentUserRole(Number(storedRole));
          };

          fetchDepartment();
          fetchUsers();
          fetchCurrentUserRole();
          fetchUsersWithStatus();
          fetchRoles();
     }, [departmentId, currentUserRole]);

     const handleUserChange = (selectedOptions) => {
          const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
          setSelectedUserIds(values);
     };

     const handleAddSubmit = async (e) => {
          e.preventDefault();
          if (!selectedUserIds || selectedUserIds.length === 0) {
               await Swal.fire({
                    icon: 'error',
                    text: t('Please select at least one user to invite!'),
                    confirmButtonText: t('OK'),
               });
               return;
          }

          setIsLoading(true);

          try {
               const response = await addUsersToDepartment(departmentId, selectedUserIds);
               await Swal.fire({
                    icon: 'success',
                    text: t('Invitations have been sent successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });

               onAddSuccess();
          } catch (error) {
               await Swal.fire({
                    icon: 'error',
                    text: t('Failed to send invitations.'),
                    confirmButtonText: t('OK'),
               });
          } finally {
               setIsLoading(false);
          }
     };

     const handleRemoveUser = async (userId) => {
          const result = await Swal.fire({
               title: t('Delete'),
               text: t('Do you want to remove this user from the department?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await removeUserFromDepartment(departmentId, userId);
                    Swal.fire({
                         icon: 'success',
                         text: t('User has been removed from the department!'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });

                    if (typeof onRemoveSuccess === 'function') {
                         onRemoveSuccess();
                    }

                    setAddedUserIds((prev) => prev.filter((id) => id !== userId));
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         title: t('Error!'),
                         text: t('Failed to remove user.'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          }
     };

     const handleCreateOption = (inputValue) => {
          if (!/\S+@\S+\.\S+/.test(inputValue)) {
               Swal.fire({
                    icon: 'error',
                    text: t('Invalid email address!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
               return;
          }

          const newUser = {
               id: `custom-${inputValue}`,
               fullname: inputValue,
               email: inputValue,
               role_id: null,
          };

          setUsers((prevUsers) => [...prevUsers, newUser]);

          setSelectedUserIds((prev) => [...prev, newUser.id]);
     };

     const availableUsers = users.filter((user) => !addedUserIds.includes(user.id));

     const getRoleName = (roleId) => {
          const role = roles.find((r) => r.id === roleId);
          return role ? role.name : '-';
     };

     return (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
               <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title">
                                   {t('Add Users to Department')}: {departmentName}
                              </h5>
                              <button type="button" className="btn-close" onClick={onClose}></button>
                         </div>
                         <div className="modal-body">
                              <form onSubmit={handleAddSubmit}>
                                   <div className="mb-3">
                                        <label htmlFor="departmentName" className="form-label">
                                             {t('Department Name')}
                                        </label>
                                        <input type="text" className="form-control" id="departmentName" value={departmentName} readOnly />
                                   </div>
                                   <div className="mb-3">
                                        <label htmlFor="existingUsers" className="form-label">
                                             {t('Select Available Users')}
                                        </label>
                                        <Select
                                             options={availableUsers.map((user) => ({
                                                  value: user.id,
                                                  label: `${user.fullname} - (${getRoleName(user.role_id)}) - ${user.email}`,
                                             }))}
                                             onChange={handleUserChange}
                                             onCreateOption={handleCreateOption}
                                             className="basic-multi-select"
                                             classNamePrefix="select"
                                             isMulti
                                        />
                                   </div>
                                   <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                        {isLoading ? t('Adding...') : t('Add')}
                                        {isLoading && (
                                             <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                                        )}{' '}
                                   </button>
                              </form>

                              <h6 className="mt-3">{t('Invited Users')}:</h6>
                              <ul className="list-group">
                                   {addedUserIds.map((id) => {
                                        const user = usersWithStatus.find((usr) => usr.id === id);
                                        const status = user?.confirmation_status ? t(user.confirmation_status) : t('Pending');
                                        return (
                                             <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                                  {user?.fullname} ({status})
                                                  {currentUserRole !== 3 && (
                                                       <button className="btn btn-danger btn-sm" onClick={() => handleRemoveUser(id)}>
                                                            {t('Remove')}
                                                       </button>
                                                  )}
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
