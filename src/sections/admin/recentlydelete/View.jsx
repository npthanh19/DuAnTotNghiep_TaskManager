import React, { useState } from 'react';
import Modal from './Modal';
import { DeleteRecently } from './Delete';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function View() {
     const [showModal, setShowModal] = useState(false);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedItems, setSelectedItems] = useState([]);
     const [currentPage, setCurrentPage] = useState(1);
     const [modalItem, setModalItem] = useState(null);
     const itemsPerPage = 9;
     const { t } = useTranslation();


     const [tasksAndProjects, setTasksAndProjects] = useState([
          { id: 1, name: 'Task 1', type: 'Task', path: '/tasks/task1', date: 'Sep 26, 2024' },
          { id: 2, name: 'Project 1', type: 'Project', path: '/projects/project1', date: 'Sep 25, 2024' },
          { id: 3, name: 'Task 2', type: 'Task', path: '/tasks/task2', date: 'Sep 24, 2024' },
          { id: 4, name: 'Project 2', type: 'Project', path: '/projects/project2', date: 'Sep 24, 2024' },
          { id: 5, name: 'Task 3', type: 'Task', path: '/tasks/task3', date: 'Sep 24, 2024' },
          { id: 6, name: 'Project 3', type: 'Project', path: '/projects/project3', date: 'Sep 24, 2024' },
          { id: 7, name: 'Task 4', type: 'Task', path: '/tasks/task4', date: 'Sep 24, 2024' },
          { id: 8, name: 'Project 4', type: 'Project', path: '/projects/project4', date: 'Sep 24, 2024' },
          { id: 9, name: 'Task 5', type: 'Task', path: '/tasks/task5', date: 'Sep 24, 2024' },
          { id: 10, name: 'Project 5', type: 'Project', path: '/projects/project5', date: 'Sep 24, 2024' },
          { id: 11, name: 'Task 6', type: 'Task', path: '/tasks/task6', date: 'Sep 24, 2024' },
          { id: 12, name: 'Project 6', type: 'Project', path: '/projects/project6', date: 'Sep 24, 2024' },
          { id: 13, name: 'Task 7', type: 'Task', path: '/tasks/task7', date: 'Sep 24, 2024' },
     ]);

     const handleSelectAll = (e) => {
          if (e.target.checked) {
               setSelectedItems(tasksAndProjects.map((item) => item.id));
          } else {
               setSelectedItems([]);
          }
     };

     const handleSelectItem = (itemId) => {
          setSelectedItems((prevSelected) => {
               if (prevSelected.includes(itemId)) {
                    return prevSelected.filter((id) => id !== itemId);
               } else {
                    return [...prevSelected, itemId];
               }
          });
     };

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentItems = tasksAndProjects.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(tasksAndProjects.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleItemClick = (event, item) => {
          if (event.target.type !== 'checkbox') {
               setModalItem(item);
               setShowModal(true);
          }
     };

     const handleCloseModal = () => {
          setModalItem(null);
          setShowModal(false);
     };

     const handleDeleteClick = () => {
          setShowDeleteModal(true);
     };

     const handleRestore = () => {
          const restoredItems = tasksAndProjects.filter((item) => selectedItems.includes(item.id));
          toast.success(`Restored items: ${restoredItems.map((item) => item.name).join(', ')}`);
          setSelectedItems([]);
          setShowDeleteModal(false);
     };

     const handlePermanentDelete = () => {
          toast.success('Successfully deleted items permanently!');
          setTasksAndProjects((prevTasks) => prevTasks.filter((item) => !selectedItems.includes(item.id)));
          setSelectedItems([]);
          setShowDeleteModal(false);
     };

     return (
          <div className="card container-fluid mt-4">
               <header className="d-flex justify-content-between align-items-center mb-3">
                    <h1>{t('Trash')}</h1>
               </header>

               <div>
                    {tasksAndProjects.length === 0 ? (
                         <p className="text-center">{t('Your trash is empty.')}</p>
                    ) : (
                         <>
                              <div className="form-check mb-3 d-flex align-items-center">
                                   <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedItems.length === tasksAndProjects.length}
                                   />
                                   <label className="form-check-label me-3">{t('Select all')}</label>
                                   <div className="ms-auto">
                                        <button
                                             className={`btn btn-primary btn-sm me-2 ${selectedItems.length === 0 ? 'disabled' : ''}`}
                                             disabled={selectedItems.length === 0}
                                             onClick={handleRestore}>
                                             {t('Restore')}
                                        </button>
                                        <button
                                             className={`btn btn-danger btn-sm ${selectedItems.length === 0 ? 'disabled' : ''}`}
                                             disabled={selectedItems.length === 0}
                                             onClick={handleDeleteClick}>
                                             {t('Delete permanently')}
                                        </button>
                                   </div>
                              </div>
                              <div className="list-group">
                                   {currentItems.map((item) => (
                                        <div
                                             key={item.id}
                                             className="list-group-item d-flex justify-content-between align-items-center"
                                             onClick={(e) => handleItemClick(e, item)}
                                             style={{ cursor: 'pointer' }}>
                                             <div className="form-check">
                                                  <input
                                                       className="form-check-input"
                                                       type="checkbox"
                                                       checked={selectedItems.includes(item.id)}
                                                       onChange={() => handleSelectItem(item.id)}
                                                  />
                                             </div>
                                             <div className="flex-grow-1 ms-3">
                                                  <strong>
                                                       {item.type}: {item.name}
                                                  </strong>
                                                  <br />
                                                  <span>{t('Path')}: {item.path}</span>
                                             </div>
                                             <span className="badge bg-secondary">{item.date}</span>
                                        </div>
                                   ))}
                              </div>

                              <nav aria-label="Page navigation" className="mt-3">
                                   <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                             <button
                                                  className="page-link"
                                                  onClick={() => handlePageChange(currentPage - 1)}
                                                  disabled={currentPage === 1}>
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
                         </>
                    )}
               </div>

               {showDeleteModal && <DeleteRecently recentlyId={selectedItems} onClose={() => setShowDeleteModal(false)} onRestore={handleRestore} />}

               {showDeleteModal && (
                    <DeleteRecently recentlyId={selectedItems} onClose={() => setShowDeleteModal(false)} onDelete={handlePermanentDelete} />
               )}

               {modalItem && <Modal show={showModal} item={modalItem} onClose={handleCloseModal} />}
               <ToastContainer position="top-right" autoClose={2000} />
          </div>
     );
}
