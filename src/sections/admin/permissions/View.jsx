import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllPermissions, deletePermission, createPermission, updatePermission, getPermissionById } from '../../../services/permissionService';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';

export function View() {
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 5;
     const { t } = useTranslation();
     const navigate = useNavigate();

     const [permissions, setPermissions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [searchPermissionTerm, setSearchPermissionTerm] = useState('');
     const [isAddingPermission, setIsAddingPermission] = useState(false);
     const [isEditing, setIsEditing] = useState(false);
     const [editingPermission, setEditingPermission] = useState({ id: null, name: '' });
     const [childrenPermissions, setChildrenPermissions] = useState([]);
     const [showChildren, setShowChildren] = useState(false);
     const [parentPermissionName, setParentPermissionName] = useState('');
     const [isAddingChild, setIsAddingChild] = useState(null);
     const [childPermissionName, setChildPermissionName] = useState('');

     useEffect(() => {
          const fetchPermissions = async () => {
               setLoading(true);
               try {
                    const fetchedPermissions = await getAllPermissions();
                    const sortedPermissions = fetchedPermissions.sort((a, b) => b.id - a.id);
                    setPermissions(sortedPermissions);
               } catch (err) {
                    setError(err.message || 'Unable to fetch the list of permissions');
               } finally {
                    setLoading(false);
               }
          };
          fetchPermissions();
     }, []);

     const handleDeletePermission = async (id) => {
          try {
               await deletePermission(id);
               setPermissions((prevPermissions) => prevPermissions.filter((permission) => permission.id !== id));
               Swal.fire({
                    icon: 'success',
                    text: t('The permissions has been moved to the trash!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    text: t('An error occurred while deleting the permissions.'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          }
     };

     const handleDeleteClick = (id) => {
          Swal.fire({
               title: t('Delete Permission'),
               text: t('Are you sure you want to delete this permission?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    await handleDeletePermission(id);
               }
          });
     };

     const handleEdit = (permission) => {
          setIsAddingPermission(false);
          setEditingPermission({ id: permission.id, name: permission.name });
          setIsEditing(true);
     };

     const handleupdatePermission = async () => {
          if (!editingPermission.name) return;
          try {
               const updatedPermission = await updatePermission(editingPermission.id, { name: editingPermission.name });
               setPermissions((prevPermissions) => prevPermissions.map((perm) => (perm.id === updatedPermission.id ? updatedPermission : perm)));
               Swal.fire({
                    icon: 'success',
                    text: t('Update successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               reset();
               setEditingPermission({ id: null, name: '' });
               setIsEditing(false);
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    title: t('Update Failed!'),
                    text: error.message || t('Something went wrong'),
               });
          }
     };

     const handlecreatePermission = async (data) => {
          try {
               const newPermission = await createPermission({ name: data.name });
               setPermissions((prevPermissions) => [newPermission, ...prevPermissions]);
               Swal.fire({
                    icon: 'success',
                    text: t('Added successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               reset();
               setIsAddingPermission(false);
          } catch (error) {
               console.error('Error creating permission:', error);
               Swal.fire({
                    icon: 'error',
                    title: t('Added Failed!'),
                    text: error.message || t('Something went wrong'),
               });
          }
     };

     const handleViewChildren = async (parentId) => {
          try {
               const permissionWithChildren = await getPermissionById(parentId);
               setChildrenPermissions(permissionWithChildren.children || []);
               setIsEditing(false);
          } catch (error) {
               toast.error(t('An error occurred while fetching child permissions'));
          }
     };

     const handleViewChildrenToggle = (parentId, parentName) => {
          if (showChildren) {
               setShowChildren(false);
          } else {
               handleViewChildren(parentId);
               setParentPermissionName(parentName);
               setShowChildren(true);
          }
     };

     const handleDeleteChild = async (childId) => {
          try {
               await deletePermission(childId);

               setChildrenPermissions((prevChildrenPermissions) => prevChildrenPermissions.filter((child) => child.id !== childId));

               Swal.fire({
                    icon: 'success',
                    text: t('The child Permission has been moved to the trash!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    text: t('An error occurred while deleting the child Permission.'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          }
     };

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;

     const filteredPermissions = permissions.filter(
          (permission) => permission.name && permission.name.toLowerCase().includes(searchPermissionTerm.toLowerCase()),
     );
     const currentPermissions = filteredPermissions.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handlePermissionSearchChange = (e) => {
          setSearchPermissionTerm(e.target.value);
          setCurrentPage(1);
     };

     if (loading) {
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', marginTop: '-70px' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">{t('Loading...')}</span>
                    </div>
               </div>
          );
     }

     if (error) {
          return <div>Error: {error}</div>;
     }

     const handleAddChild = (parentPermission) => {
          setIsAddingChild(parentPermission.id);
          setParentPermissionName(parentPermission.name);
          setChildPermissionName('');
     };

     const handleCreateChildPermission = async () => {
          if (!childPermissionName) return;
          try {
               const newChildPermission = await createPermission({
                    name: childPermissionName,
                    parent_id: isAddingChild,
               });
               setChildrenPermissions((prev) => [newChildPermission, ...prev]);
               Swal.fire({
                    icon: 'success',
                    text: t('Child Permission has been added!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
               reset();
               setIsAddingChild(null);
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    title: t('An error occurred while adding the child permission'),
                    text: error.message || t('Something went wrong'),
               });          }
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold mb-0 highlighted-text">
                         <span>{t('Permissions')}</span>
                    </h3>
                    <div className="d-flex align-items-center ms-auto">
                         <input
                              type="text"
                              className="form-control form-control-sm me-2"
                              placeholder={t('Search...')}
                              value={searchPermissionTerm}
                              onChange={handlePermissionSearchChange}
                         />
                         <button
                              className="btn btn-outline-secondary btn-sm d-flex align-items-center ms-2"
                              onClick={() => navigate('/taskmaneger/permissions/trash')}>
                              <i className="bi bi-trash me-2"></i>
                         </button>
                         <button
                              className="btn btn-primary btn-sm d-flex align-items-center me-2"
                              onClick={() => {
                                   setIsAddingPermission(true);
                                   setIsEditing(false);
                              }}>
                              <i className="bi bi-plus me-2"></i> {t('Add')}
                         </button>
                    </div>
               </div>

               {isAddingPermission && (
                    <form className="card-body" onSubmit={handleSubmit(handlecreatePermission)}>
                         <input
                              type="text"
                              className="form-control form-control-sm mt-2"
                              placeholder={t('Enter permission name')}
                              {...register('name', { required: true })}
                         />
                         {errors.name && <p className="text-danger">{t('Permission name cannot be empty!')}</p>}
                         <div className="d-flex mt-2 justify-content-end">
                              <button type="submit" className="btn btn-success btn-sm me-2">
                                   {t('Add Permission')}
                              </button>
                              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsAddingPermission(false)}>
                                   {t('Cancel')}
                              </button>
                         </div>
                    </form>
               )}

               {isEditing && (
                    <div className="card-body">
                         <input
                              type="text"
                              className="form-control form-control-sm mt-2"
                              value={editingPermission.name}
                              onChange={(e) => setEditingPermission({ ...editingPermission, name: e.target.value })}
                         />
                         <div className="d-flex mt-2 justify-content-end">
                              <button className="btn btn-warning btn-sm me-2" onClick={handleupdatePermission}>
                                   {t('Update Permission')}
                              </button>
                              <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
                                   {t('Cancel')}
                              </button>
                         </div>
                    </div>
               )}

               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th>ID</th>
                                   <th>{t('Permission Name')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentPermissions.map((permission, index) => (
                                   <tr key={permission.id}>
                                        <td>{index + 1}</td>
                                        <td>{permission.name}</td>
                                        <td className="col-1">
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${permission.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${permission.id}`}>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleAddChild(permission)}>
                                                                 <i className="bi bi-plus me-2"></i> {t('Add Children')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(permission)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeleteClick(permission.id)}>
                                                                 <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-primary"
                                                                 onClick={() => handleViewChildrenToggle(permission.id, permission.name)}>
                                                                 <i className="bi bi-eye me-2"></i>{' '}
                                                                 {t(showChildren ? 'Hide Children' : 'View Children')}
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
                    {isAddingChild && (
                         <div className="form-container card shadow-sm p-4 mt-3">
                              <h5 className="text-center mb-4">{t('Add New Child Permission')}</h5>
                              <form
                                   onSubmit={(e) => {
                                        e.preventDefault();
                                        handleCreateChildPermission();
                                   }}>
                                   <div className="mb-3">
                                        <label htmlFor="permissionName" className="form-label">
                                             {t('Permission Name')}
                                        </label>
                                        <input
                                             type="text"
                                             id="permissionName"
                                             className="form-control form-control-sm"
                                             value={childPermissionName}
                                             onChange={(e) => setChildPermissionName(e.target.value)}
                                             required
                                             placeholder={t('Enter permission name')}
                                        />
                                   </div>
                                   <div className="d-flex justify-content-end">
                                        <button type="submit" className="btn btn-success btn-sm me-2">
                                             {t('Add')}
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setIsAddingChild(null)}>
                                             {t('Cancel')}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    )}
                    {childrenPermissions.length > 0 && showChildren && (
                         <div className="card mt-3 shadow-sm">
                              <div className="card-header d-flex justify-content-between align-items-center">
                                   <h5>
                                        {t('Child Permissions of:')} {parentPermissionName}
                                   </h5>
                                   <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowChildren(false)}>
                                        {t('Close')}
                                   </button>
                              </div>
                              <div className="card-body p-3">
                                   <table className="table table-striped table-bordered table-hover">
                                        <thead className="table-light">
                                             <tr>
                                                  <th>ID</th>
                                                  <th>{t('Permission Name')}</th>
                                                  <th>{t('Actions')}</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {childrenPermissions.length === 0 ? (
                                                  <tr>
                                                       <td colSpan="3" className="text-center">
                                                            {t('No Children')}
                                                       </td>
                                                  </tr>
                                             ) : (
                                                  childrenPermissions.map((child) => (
                                                       <tr key={child.id}>
                                                            <td>{child.id}</td>
                                                            <td>{child.name}</td>
                                                            <td>
                                                                 <button
                                                                      className="btn btn-sm btn-danger"
                                                                      onClick={() => handleDeleteChild(child.id)}>
                                                                      {t('Delete')}
                                                                 </button>
                                                            </td>
                                                       </tr>
                                                  ))
                                             )}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    )}
                    <nav aria-label="Page navigation">
                         <ul className="pagination mt-2">
                              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                   <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                        {t('Previous')}
                                   </button>
                              </li>
                              {[...Array(totalPages)].map((_, index) => (
                                   <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                             {index + 1}
                                        </button>
                                   </li>
                              ))}
                              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                   <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}>
                                        {t('Next')}
                                   </button>
                              </li>
                         </ul>
                    </nav>
               </div>
               <ToastContainer
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
               />
          </div>
     );
}
