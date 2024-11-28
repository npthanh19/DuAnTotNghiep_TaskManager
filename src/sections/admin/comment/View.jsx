import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCommentsByTask, createComment } from '../../../services/commentService';
import { getTaskById } from '../../../services/tasksService';
import { getUserById } from '../../../services/usersService';
import { getTaskFiles } from '../../../services/fileService';
import { DeleteComment } from './Delete';
import { useTranslation } from 'react-i18next';

export const CommentForm = ({ taskId, showModal, handleCloseModal }) => {
     const [comments, setComments] = useState([]);
     const [taskName, setTaskName] = useState('');
     const [searchQuery, setSearchQuery] = useState('');
     const [filteredComments, setFilteredComments] = useState([]);
     const [selectedCommentId, setSelectedCommentId] = useState(null);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [taskFiles, setTaskFiles] = useState([]);
     const [repliesVisibility, setRepliesVisibility] = useState({});
     const [showAddCommentInput, setShowAddCommentInput] = useState(false);
     const { t } = useTranslation();
     const [userFullName, setUserFullName] = useState('');
     const [commentContent, setCommentContent] = useState(''); // State for the comment content
     const [selectedImage, setSelectedImage] = useState(null); // State for the selected image

     // Fetch the user full name
     useEffect(() => {
          const fetchUserFullName = async () => {
               try {
                    const user = await getUserById(1); // Replace 1 with the current user ID
                    setUserFullName(user.fullname);
               } catch (error) {
                    console.error('Error fetching user name:', error);
               }
          };
          fetchUserFullName();
     }, []);

     const fetchUserNames = async (comments) => {
          const commentsWithUserNames = await Promise.all(
               comments.map(async (comment) => {
                    try {
                         const user = await getUserById(comment.user_id);
                         return { ...comment, userName: user.fullname };
                    } catch (error) {
                         console.error(`Error fetching user with ID ${comment.user_id}:`, error);
                         return { ...comment, userName: 'Unknown User' };
                    }
               }),
          );
          setComments(commentsWithUserNames);
          setFilteredComments(commentsWithUserNames);
     };

     const fetchTaskFiles = async () => {
          try {
               const files = await getTaskFiles(taskId);
               setTaskFiles(files);
          } catch (error) {
               console.error('Error fetching task files:', error);
          }
     };

     useEffect(() => {
          const fetchCommentsAndTaskName = async () => {
               try {
                    const fetchedComments = await getCommentsByTask(taskId);
                    const taskData = await getTaskById(taskId);
                    setTaskName(taskData.task_name);
                    await fetchUserNames(fetchedComments);
               } catch (error) {
                    console.error('Error fetching comments or task name:', error);
               }
          };

          if (taskId) {
               fetchCommentsAndTaskName();
               fetchTaskFiles();
          }
     }, [taskId]);

     const handleDeleteCommentSuccess = (commentId, errorMsg) => {
          if (errorMsg) {
               toast.error(`Xóa bình luận thất bại: ${errorMsg}`);
          } else {
               toast.success('Xóa bình luận thành công!');
               setComments((prev) => prev.filter((comment) => comment.id !== commentId));
               setFilteredComments((prev) => prev.filter((comment) => comment.id !== commentId));
          }
          setShowDeleteModal(false);
     };

     useEffect(() => {
          const results = comments.filter((comment) => {
               const searchText = searchQuery.toLowerCase();
               const userNameMatch = comment.userName && comment.userName.toLowerCase().includes(searchText);
               const textMatch = comment.content && comment.content.toLowerCase().includes(searchText);
               return userNameMatch || textMatch;
          });
          setFilteredComments(results);
     }, [searchQuery, comments]);

     const toggleRepliesVisibility = (commentId) => {
          setRepliesVisibility((prevVisibility) => ({
               ...prevVisibility,
               [commentId]: !prevVisibility[commentId],
          }));
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
               <li key={comment.id} className="list-group-item" style={{ marginLeft: indent, backgroundColor: indent ? '#f8f9fa' : 'white' }}>
                    <div className="d-flex justify-content-between align-items-center">
                         <div className="d-flex align-items-center">
                              <img
                                   src={comment.avatar}
                                   alt="Avatar"
                                   className="avatar me-2"
                                   style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                              />
                              <span>
                                   <strong>{t('Name')}: </strong>
                                   {comment.userName} <br />
                                   <small>
                                        <strong>{t('Comment')}: </strong>
                                        {comment.comment} <br />
                                        <strong>{t('File Name')}: </strong>
                                        {taskFiles
                                             .filter((file) => file.comment_id === comment.id || file.parent_id === comment.id)
                                             .map((file) => (
                                                  <span key={file.id}>{file.file_name}</span>
                                             ))}
                                        <br />
                                   </small>
                              </span>
                         </div>
                         <div>
                              {formattedDate} at {formattedTime}
                         </div>
                    </div>
                    <div className="d-flex m-2">
                         <a
                              href="#"
                              className="text-danger ms-2"
                              onClick={(e) => {
                                   e.preventDefault();
                                   setSelectedCommentId(comment.id);
                                   setShowDeleteModal(true);
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
               task_id: taskId, // Gửi task_id để liên kết với công việc
          };

          // Create a FormData object to send the comment data along with the image file
          const formData = new FormData();
          formData.append('comment', newComment.comment);
          formData.append('task_id', newComment.task_id);
          formData.append('user_name', newComment.userName);
          formData.append('created_at', newComment.created_at);

          // If an image is selected, append it to the form data
          if (selectedImage) {
               formData.append('image', selectedImage);
          }

          try {
               // Gọi API để thêm bình luận vào cơ sở dữ liệu (Ensure your API can handle FormData)
               const savedComment = await createComment(formData); // Update this to send formData

               // Cập nhật danh sách bình luận sau khi lưu thành công
               setComments([savedComment, ...comments]);
               setFilteredComments([savedComment, ...comments]);

               // Xóa dữ liệu đầu vào và ẩn khu vực nhập
               setCommentContent('');
               setShowAddCommentInput(false);
               setSelectedImage(null); // Xóa ảnh đã chọn sau khi lưu

               toast.success('Bình luận đã được thêm!');
          } catch (error) {
               toast.error('Có lỗi xảy ra khi thêm bình luận.');
          }
     };

     const CommentItem = ({ comment }) => {
          return (
               <div>
                    <img src={comment.avatar} alt="avatar" width="30" height="30" />
                    <div>
                         <strong>{comment.userName}</strong>
                         <p>{comment.comment}</p>
                         <small>{new Date(comment.created_at).toLocaleString()}</small>
                    </div>
               </div>
          );
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
                                        placeholder={t('Write your comment here...')}
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)}></textarea>
                              </div>
                              <div className="form-group mt-3">
                                   <label>{t('Select an image')}</label>
                                   <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSelectedImage(e.target.file_name[0])}
                                        className="form-control"
                                   />
                              </div>
                              <div className="mt-3">
                                   <button onClick={handleSaveComment} className="btn btn-primary">
                                        {t('Save Comment')}
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
