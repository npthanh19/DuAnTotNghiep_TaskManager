import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CommentForm = ({ taskId, showModal, handleCloseModal }) => {
     const [comments, setComments] = useState([]);
     const [searchQuery, setSearchQuery] = useState('');
     const [filteredComments, setFilteredComments] = useState([]);

     useEffect(() => {
          const fetchComments = async () => {
               const fetchedComments = [
                    { user_id: 1, avatar: '/assets/admin/img/avatars/1.png', text: 'Great work!' },
                    { user_id: 2, avatar: '/assets/admin/img/avatars/2.png', text: 'Needs improvement.' },
                    { user_id: 3, avatar: '/assets/admin/img/avatars/1.png', text: 'Great work!' },
                    { user_id: 4, avatar: '/assets/admin/img/avatars/2.png', text: 'Needs improvement.' },
                    { user_id: 5, avatar: '/assets/admin/img/avatars/1.png', text: 'Great work!' },
                    { user_id: 6, avatar: '/assets/admin/img/avatars/2.png', text: 'Needs improvement.' },
                    { user_id: 7, avatar: '/assets/admin/img/avatars/1.png', text: 'Great work!' },
                    { user_id: 8, avatar: '/assets/admin/img/avatars/2.png', text: 'Needs improvement.' },
               ];
               setComments(fetchedComments);
               setFilteredComments(fetchedComments);
          };

          fetchComments();
     }, [taskId]);

     useEffect(() => {
          const results = comments.filter((comment) => {
               const searchText = searchQuery.toLowerCase();
               const userIdMatch = comment.user_id.toString().includes(searchText);
               const textMatch = comment.text.toLowerCase().includes(searchText);
               return userIdMatch || textMatch;
          });
          setFilteredComments(results);
     }, [searchQuery, comments]);

     const handleDelete = (userId) => {
          toast.success(`Đã xóa bình luận của người dùng có ID: ${userId}`);
     };

     return (
          <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="modal-xl">
               <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                         <div className="d-flex align-items-center">
                              <i className="bi bi-pencil" title="Edit Task">
                                   <small className="ms-3">Comments</small>
                              </i>
                         </div>
                         <button onClick={handleCloseModal} className="btn-close ms-3" aria-label="Close"></button>
                    </div>

                    <div className="mb-3" style={{ flex: 1, maxWidth: '250px' }}>
                         <input
                              type="text"
                              className="form-control"
                              placeholder="Search by comment or User ID..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                         />
                    </div>

                    <div className="comment-section">
                         <h5>Bình luận</h5>
                         <ul className="list-group comment-list" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                              {filteredComments.map((comment) => (
                                   <li key={comment.user_id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                             <img
                                                  src={comment.avatar}
                                                  alt="Avatar"
                                                  className="avatar me-2"
                                                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                             />
                                             <span>
                                                  <strong>User {comment.user_id}:</strong> {comment.text}
                                             </span>
                                        </div>
                                        <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(comment.user_id)}>
                                             <i className="bi bi-trash"></i> Xóa
                                        </button>
                                   </li>
                              ))}
                         </ul>
                         <ToastContainer />
                    </div>
               </Modal.Body>
          </Modal>
     );
};
