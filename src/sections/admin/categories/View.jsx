import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteCategories } from '../../../sections/admin/categories/Delete';

export const View = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedCategoryId, setSelectedCategoryId] = useState(null);

     const handleDeleteClick = (id) => {
          setSelectedCategoryId(id);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedCategoryId(null);
     };

     const handleEdit = (id) => {
          navigate(`/admin/categories/edit/${id}`);
     };

     const handleStatusChange = (id, newStatus) => {
          console.log(`Category ID ${id} status changed to ${newStatus}`);
     };

     const categories = [
          { id: 1, name: 'Category 1', description: 'Description 1', status: 'Active', createdAt: '2024-01-01', email: 'email1@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
          { id: 2, name: 'Category 2', description: 'Description 2', status: 'Inactive', createdAt: '2024-01-02', email: 'email2@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
          { id: 3, name: 'Category 3', description: 'Description 3', status: 'Active', createdAt: '2024-01-03', email: 'email3@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
          { id: 4, name: 'Category 4', description: 'Description 4', status: 'Active', createdAt: '2024-01-04', email: 'email4@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
          { id: 5, name: 'Category 5', description: 'Description 5', status: 'Inactive', createdAt: '2024-01-05', email: 'email5@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
          { id: 6, name: 'Category 6', description: 'Description 6', status: 'Active', createdAt: '2024-01-06', email: 'email6@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
          { id: 7, name: 'Category 7', description: 'Description 7', status: 'Inactive', createdAt: '2024-01-07', email: 'email7@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
          { id: 8, name: 'Category 8', description: 'Description 8', status: 'Active', createdAt: '2024-01-08', email: 'email8@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
          { id: 9, name: 'Category 9', description: 'Description 9', status: 'Active', createdAt: '2024-01-09', email: 'email9@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
          { id: 10, name: 'Category 10', description: 'Description 10', status: 'Inactive', createdAt: '2024-01-10', email: 'email10@example.com', password: '******', image: 'https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2023/anh-che-meme1_63.jpg' },
     ];

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

     const totalPages = Math.ceil(categories.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">Categories</span>
                    </h3>
                    <Link to="/admin/categories/add" className="btn btn-primary">
                         <i className="bi bi-plus me-2"></i> {t('Add new')}
                    </Link>
               </div>
               <div className="card-body">
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="col-1">ID</th>
                                   <th className="col-2">Name</th>
                                   <th className="col-2">Email</th>
                                   <th className="col-2">Password</th>
                                   <th className="col-2">Description</th>
                                   <th className="col-1">Status</th>
                                   <th className="col-2">Created At</th>
                                   <th className="col-1">Image</th>
                                   <th className="col-1">Actions</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentCategories.map((category) => (
                                   <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.email}</td>
                                        <td>{category.password}</td>
                                        <td>{category.description}</td>
                                        <td>
                                             <select
                                                  value={category.status}
                                                  onChange={(e) => handleStatusChange(category.id, e.target.value)}
                                                  className="form-select">
                                                  <option value="Active">{t('Active')}</option>
                                                  <option value="Inactive">{t('Inactive')}</option>
                                             </select>
                                        </td>
                                        <td>{category.createdAt}</td>
                                        <td>
                                             <img src={category.image} alt={category.name} className="img-thumbnail" style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${category.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${category.id}`}>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(category.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeleteClick(category.id)}>
                                                                 <i className="bi bi-trash me-2"></i>
                                                                 {t('Delete')}
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
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
               {showDeleteModal && <DeleteCategories categoryId={selectedCategoryId} onClose={handleCloseModal} />}
          </div>
     );
};
