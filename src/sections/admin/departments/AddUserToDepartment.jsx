import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { addUsersToDepartment, removeUserFromDepartment, getDepartmentById, getUsersWithStatus } from '../../../services/deparmentsService';
import { getAllUsers } from '../../../services/usersService';
import { getAllRoles } from '../../../services/rolesService';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

const AddUserToDepartment = ({ departmentId, onClose, onRemoveSuccess = () => {}, onAddSuccess }) => {
     const { t } = useTranslation();
     const [users, setUsers] = useState([]); // All users
     const [selectedUserIds, setSelectedUserIds] = useState([]); // Selected users to add
     const [departmentName, setDepartmentName] = useState(''); // Department name
     const [addedUserIds, setAddedUserIds] = useState([]); // Already added users
     const [roles, setRoles] = useState([]); // User roles
     const [usersWithStatus, setUsersWithStatus] = useState([]); // Users with status (confirmation status)

     useEffect(() => {
          // Fetch department info
          const fetchDepartment = async () => {
               try {
                    const departmentData = await getDepartmentById(departmentId);
                    setDepartmentName(departmentData.department_name);
                    setAddedUserIds(departmentData.users.map((user) => user.id)); // Store user IDs already added
               } catch (error) {
                    console.error('Error fetching department:', error);
               }
          };

          // Fetch all users
          const fetchUsers = async () => {
               try {
                    const data = await getAllUsers();
                    setUsers(data); // Update users list
               } catch (error) {
                    console.error('Error fetching users:', error);
               }
          };

          // Fetch roles
          const fetchRoles = async () => {
               try {
                    const allRoles = await getAllRoles();
                    setRoles(allRoles); // Update roles list
               } catch (error) {
                    console.error('Error fetching roles:', error);
               }
          };

          // Fetch users with status (confirmation status)
          const fetchUsersWithStatus = async () => {
               try {
                    const data = await getUsersWithStatus(departmentId);
                    setUsersWithStatus(data); // Store users with status
               } catch (error) {
                    console.error('Error fetching users with status:', error);
               }
          };

          fetchDepartment();
          fetchUsers();
          fetchRoles();
          fetchUsersWithStatus(); // Fetch users with status
     }, [departmentId]);

     // Handle user selection
     const handleUserChange = (selectedOptions) => {
          const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
          setSelectedUserIds(values);
     };

     // Handle add user form submission
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

          try {
               const response = await addUsersToDepartment(departmentId, selectedUserIds);
               await Swal.fire({
                    icon: 'success',
                    text: t('Invitations have been sent successfully! Please wait for users to confirm.'),
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
          }
     };

     // Handle removing a user from the department
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
                                             className="basic-multi-select"
                                             classNamePrefix="select"
                                             isMulti
                                        />
                                   </div>
                                   <button type="submit" className="btn btn-primary">
                                        {t('Add')}
                                   </button>
                              </form>

                              <h6 className="mt-3">{t('Invited Users')}:</h6>
                              <ul className="list-group">
                                   {addedUserIds.map((id) => {
                                        const user = usersWithStatus.find((usr) => usr.id === id); // Use usersWithStatus here
                                        const status = user?.confirmation_status || t('Pending');
                                        return (
                                             <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                                  {user ? `${user.fullname} - (${status})` : t('Người tạo phòng ban')}
                                                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveUser(id)}>
                                                       {t('Remove')}
                                                  </button>
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
