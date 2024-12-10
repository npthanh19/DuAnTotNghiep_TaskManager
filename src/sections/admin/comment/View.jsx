import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { getTaskDetails } from '../../../services/tasksService'; // Đảm bảo bạn đã tạo hàm này trong services
import { createComment, deleteComment } from '../../../services/commentService';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { DeleteComment } from './Delete';
import { getUserById } from '../../../services/usersService';

export const CommentForm = ({ taskId, showModal, handleCloseModal }) => {
     const [taskDetails, setTaskDetails] = useState(null);
     const [taskName, setTaskName] = useState('');
     const [searchQuery, setSearchQuery] = useState('');
     const [filteredComments, setFilteredComments] = useState([]);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedCommentId, setSelectedCommentId] = useState(null);
     const [showAddCommentInput, setShowAddCommentInput] = useState(false);
     const { t } = useTranslation();
     const [userFullName, setUserFullName] = useState('');
     const [commentContent, setCommentContent] = useState('');
     const [selectedImage, setSelectedImage] = useState(null);
     const [repliesVisibility, setRepliesVisibility] = useState({});

     // Fetch the user full name
     useEffect(() => {
          const fetchUserFullName = () => {
               const storedFullName = localStorage.getItem('user_name');
               if (storedFullName) {
                    setUserFullName(storedFullName);
               } else {
                    console.error('User  is not logged in or fullname not available in localStorage');
               }
          };
          fetchUserFullName();
     }, []);
     useEffect(() => {
          const fetchTaskDetails = async () => {
               try {
                    const response = await getTaskDetails(taskId);
                    if (response.task) {
                         setTaskDetails(response.task);
                         setTaskName(response.task.task_name || '');
                         setFilteredComments(response.comments || []);
                    } else {
                         console.error('No data returned from API');
                    }
               } catch (error) {
                    console.error('Error fetching task details:', error);
               }
          };

          if (taskId) fetchTaskDetails();
     }, [taskId]); // Đảm bảo dependency array chỉ chứa taskId

     // Fetch task details including comments and files

     // Handle comment deletion
     const handleDeleteCommentSuccess = async (id) => {
          try {
               if (!id) {
                    console.error('Invalid comment ID');
                    return;
               }
               await deleteComment(id); // API xóa bình luận
               setFilteredComments((prevComments) => prevComments.filter((comment) => comment.id !== id)); // Cập nhật lại danh sách bình luận
               Swal.fire({
                    icon: 'success',
                    text: t('The comment has been moved to the trash!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    text: t('An error occurred while deleting the comment.'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          }
     };

     const handleDeleteClick = async (id) => {
          if (!id) {
               console.error('Invalid comment ID');
               return;
          }

          console.log('Deleting comment with ID:', id); // Thêm log kiểm tra ID

          Swal.fire({
               title: t('Delete Comments'),
               text: t('Are you sure you want to delete this comment?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         // Xóa bình luận từ backend
                         await deleteComment(id);

                         // Cập nhật lại danh sách bình luận sau khi xóa
                         setFilteredComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
                         console.log('Updated comments list after delete:', filteredComments);

                         Swal.fire({
                              icon: 'success',
                              text: t('The comment has been moved to the trash!'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         console.error('Failed to delete comment:', error);
                         Swal.fire({
                              icon: 'error',
                              text: t('An error occurred while deleting the comment.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    }
               }
          });
     };

     // Filter comments based on search query
     useEffect(() => {
          if (searchQuery) {
               const results = taskDetails?.comments?.filter((comment) => {
                    const searchText = searchQuery.toLowerCase();
                    const userNameMatch = comment.userName && comment.userName.toLowerCase().includes(searchText);
                    const textMatch = comment.comment && comment.comment.toLowerCase().includes(searchText);
                    return userNameMatch || textMatch;
               });
               setFilteredComments(results || []);
          } else {
               setFilteredComments(taskDetails?.comments || []); // Reset nếu không có tìm kiếm
          }
     }, [searchQuery, taskDetails]);

     useEffect(() => {
          const filterComments = () => {
               const results = taskDetails?.comments?.filter((comment) => {
                    const searchText = searchQuery.toLowerCase();
                    const userNameMatch = comment.userName && comment.userName.toLowerCase().includes(searchText);
                    const textMatch = comment.comment && comment.comment.toLowerCase().includes(searchText);
                    return userNameMatch || textMatch;
               });
               return results || [];
          };
          if (searchQuery) {
               setFilteredComments(filterComments());
          } else {
               setFilteredComments(taskDetails?.comments || []); // Reset to all comments if no search
          }
     }, [searchQuery, taskDetails]);

     const toggleRepliesVisibility = (commentId) => {
          setRepliesVisibility((prevVisibility) => ({
               ...prevVisibility,
               [commentId]: !prevVisibility[commentId],
          }));
     };

     const handleCancelComment = () => {
          setCommentContent(''); // Xóa nội dung comment
          setSelectedImage(null); // Xóa file đã chọn
          setShowAddCommentInput(false); // Ẩn form thêm comment nếu cần
      };
      

     const renderCommentsWithReplies = (comment, indent = 0) => {
          const commentDate = new Date(comment.created_at);
          const formattedDate = commentDate.toLocaleString('vi-VN', {
               year: 'numeric',
               month: 'long',
               day: 'numeric',
          });
          const formattedTime = commentDate.toLocaleTimeString('vi-VN', {
               hour: '2-digit',
               minute: '2-digit',
          });
          return (
               <li
                    key={`comment-${comment.id || Math.random()}`}
                    className="list-group-item"
                    style={{ marginLeft: indent, backgroundColor: indent ? '#f8f9fa' : 'white' }}>
                    <div className="d-flex justify-content-between align-items-center">
                         <div className="d-flex align-items-center">
                              {comment.user && comment.user.avatar ? (
                                   <img
                                        src={`${process.env.REACT_APP_BASE_URL}/avatar/${comment.user.avatar}`}
                                        alt="Avatar"
                                        className="avatar me-2"
                                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                   />
                              ) : (
                                   <div
                                        className="avatar-placeholder me-2"
                                        style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#ddd' }}></div>
                              )}
                              <span>
                                   <strong>{t('Name')}: </strong>
                                   {comment.fullname || comment.user.fullname} <br />
                                   <small>
                                        <strong>{t('Comment')}: </strong>
                                        {comment.comment} <br />
                                        <strong>{t('File Name')}: </strong>
                                        {comment.files && comment.files.length > 0 ? (
                                             comment.files.map((file) => <span key={file.id}>{file.file_name}</span>)
                                        ) : (
                                             <span>{t('Không có file đính kèm')}</span>
                                        )}
                                        <br />
                                   </small>
                              </span>
                         </div>
                         <div>
                              {formattedDate} lúc {formattedTime}
                         </div>
                    </div>
                    <div className="d-flex m-2">
                         <a
                              className="text-danger ms-2"
                              onClick={(e) => {
                                   handleDeleteClick(comment.id);
                              }}>
                              {t('Delete')}
                         </a>

                         {!comment.parent_id && (
                              <a className="ms-3" onClick={() => toggleRepliesVisibility(comment.id)}>
                                   {repliesVisibility[comment.id] ? t('Hide comments') : t('See more')}
                              </a>
                         )}
                    </div>
                    {repliesVisibility[comment.id] && comment.replies?.map((reply) => renderCommentsWithReplies(reply, indent + 20))}
               </li>
          );
     };

     const handleSaveComment = async () => {
          const newComment = {
               userName: userFullName,
               comment: commentContent,
               created_at: new Date().toISOString(),
               task_id: taskId,
          };

          const formData = new FormData();
          formData.append('comment', newComment.comment);
          formData.append('task_id', newComment.task_id);
          formData.append('user_name', newComment.userName);
          formData.append('created_at', newComment.created_at);

          if (selectedImage) {
               formData.append('files[]', selectedImage);
          }

          try {
               const response = await createComment(formData); // Gọi API tạo bình luận
               console.log('API response for new comment:', response);

               const processedComment = {
                    id: response.comment.id, // Lấy ID trả về từ API
                    userName: userFullName, // Đảm bảo lưu đầy đủ thông tin người dùng
                    fullname: userFullName, // Thêm fullname cho người dùng
                    user: {
                         avatar: response.comment.user.avatar || localStorage.getItem('user_avatar'), // Ưu tiên lấy avatar từ API
                    },
                    ...newComment,
                    replies: [], // Đảm bảo không có trả lời khi tạo mới
                    files: selectedImage ? [{ id: response.file_id, file_name: selectedImage.name }] : [], // Gắn tệp nếu có
               };

               setFilteredComments((prevComments) => [processedComment, ...prevComments]); // Thêm bình luận vào danh sách
               setCommentContent(''); // Xóa nội dung bình luận
               setShowAddCommentInput(false); // Ẩn input khi gửi xong
               setSelectedImage(null); // Reset ảnh đã chọn

               Swal.fire({
                    icon: 'success',
                    text: t('Added successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
          } catch (error) {
               console.error('Error adding comment:', error);
               Swal.fire({
                    icon: 'error',
                    title: t('Added Failed!'),
                    text: t('Something went wrong'),
               });
          }
     };

     return (
          <>
               <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="modal-xl">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                         <div className="d-flex align-items-center">
                              <i className="bi bi-pencil" title="Edit Task">
                                   <small className="ms-3">{t('Comment')}</small>
                              </i>
                         </div>
                         <button onClick={handleCloseModal} className="btn-close ms-3" aria-label="Close"></button>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                         <div className="flex-grow-1" style={{ maxWidth: '250px' }}>
                              <input
                                   type="text"
                                   className="form-control"
                                   placeholder={t('Search by comments or username...')}
                                   value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}
                              />
                         </div>
                         <div className="btn btn-primary" onClick={() => setShowAddCommentInput(true)}>
                              {t('Add Comment')}
                         </div>
                    </div>

                    {showAddCommentInput && (
                         <div>
                              <div className="form-group">
                                   <textarea
                                        className="form-control"
                                        placeholder={t('Write a comment...')}
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)}></textarea>
                              </div>
                              <div className="form-group mt-3">
                                   <label>{t('Select an image')}</label>
                                   <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSelectedImage(e.target.files[0])}
                                        className="form-control"
                                   />
                              </div>
                              <div className="mt-3">
                                   <button onClick={handleSaveComment} className="btn btn-primary">
                                        {t('Save Comment')}
                                   </button>
                                   <button onClick={handleCancelComment} className="btn btn-secondary me-2">
                                        {t('Cancel')}
                                   </button>
                              </div>
                         </div>
                    )}

                    <div className="comment-section">
                         <h5>
                              {t('Comment')}: {taskName}
                         </h5>
                         <nav aria-label="Page navigation">
                              <ul className="list-group comment-list" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                   {filteredComments.map((comment) => renderCommentsWithReplies(comment))}
                              </ul>
                         </nav>
                    </div>

                    <ToastContainer position="bottom-right" />
               </Modal>

               {showDeleteModal && (
                    <DeleteComment
                         showModal={showDeleteModal}
                         handleCloseModal={() => setShowDeleteModal(false)}
                         commentId={selectedCommentId}
                         onDeleteSuccess={handleDeleteCommentSuccess}
                    />
               )}
          </>
     );
};
