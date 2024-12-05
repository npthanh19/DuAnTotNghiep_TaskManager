import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCommentsByTask, createComment, deleteComment } from '../../../services/commentService';
import { getTaskById } from '../../../services/tasksService';
import { getUserById } from '../../../services/usersService';
import { getTaskFiles } from '../../../services/fileService';
import { DeleteComment } from './Delete';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

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
          const commentsWithUserDetails = await Promise.all(
              comments.map(async (comment) => {
                  try {
                      const user = await getUserById(comment.user_id);
                      return { 
                          ...comment, 
                          userName: user.fullname,
                          avatar: user.avatar // Lấy avatar từ thông tin người dùng
                      };
                  } catch (error) {
                      console.error(`Error fetching user with ID ${comment.user_id}:`, error);
                      return { 
                          ...comment, 
                          userName: 'Unknown User', 
                          avatar: null 
                      };
                  }
              }),
          );
          setComments(commentsWithUserDetails);
          setFilteredComments(commentsWithUserDetails);
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
           
                   // Sắp xếp danh sách comments theo thời gian (mới nhất lên đầu)
                   const sortedComments = fetchedComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
           
                   // Cập nhật danh sách comment với file kèm theo
                   const commentsWithFiles = await Promise.all(
                       sortedComments.map(async (comment) => {
                           const files = await getTaskFiles(taskId);
                           return {
                               ...comment,
                               files: files.filter(file => file.comment_id === comment.id),
                           };
                       })
                   );
           
                   await fetchUserNames(commentsWithFiles); // Sửa lại tên hàm
               } catch (error) {
                   console.error('Error fetching comments or task name:', error);
               }
           };
           
      
          if (taskId) {
              fetchCommentsAndTaskName();
              fetchTaskFiles();
          }
      }, [taskId]);

     const handleDeleteCommentSuccess = async (id) => {
          try {
               await deleteComment(id);
               setComments((prevComment) => prevComment.filter((comment) => comment.id !== id));
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

     const handleDeleteClick = (id) => {
          Swal.fire({
               title: t('Delete Comment'),
               text: t('Are you sure you want to delete this comment?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    await handleDeleteCommentSuccess(id);
               }
          });
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
                          {comment.avatar ? (
                              <img
                                  src={`${process.env.REACT_APP_BASE_URL}/avatar/${comment.avatar}`}
                                  alt="Avatar"
                                  className="avatar me-2"
                                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                              />
                          ) : (
                              <div className="avatar-placeholder me-2" style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#ddd' }}></div>
                          )}
                          <span>
                              <strong>{t('Name')}: </strong>
                              {comment.userName} <br />
                              <small>
                                  <strong>{t('Comment')}: </strong>
                                  {comment.comment} <br />
                                  <strong>{t('File Name')}: </strong>
                                  {comment.files && comment.files.length > 0 ? (
                                      comment.files.map((file) => <span key={file.id}>{file.file_name}</span>)
                                  ) : (
                                      <span>{t('No files attached')}</span>
                                  )}
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
              // Gửi request để thêm comment
              await createComment(formData);
      
              // Lấy lại danh sách file sau khi thêm comment
              await fetchTaskFiles();
      
              // Xử lý comment mới thêm vào danh sách hiện tại
              const processedComment = {
                  id: Date.now(), // Tạm thời dùng timestamp làm ID
                  ...newComment,
                  replies: [], // Đảm bảo không có lỗi khi render
                  files: selectedImage ? [{ id: Date.now(), file_name: selectedImage.name }] : [], // Thêm file vào comment
              };
      
              // Cập nhật danh sách comment và sắp xếp theo thời gian tạo
              setComments((prevComments) => {
               const updatedComments = [processedComment, ...prevComments];
               return updatedComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
           });
           
           setFilteredComments((prevFilteredComments) => {
               const updatedFilteredComments = [processedComment, ...prevFilteredComments];
               return updatedFilteredComments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
           });
           
              // Xóa nội dung nhập
              setCommentContent('');
              setShowAddCommentInput(false);
              setSelectedImage(null);
      
              // Hiển thị thông báo thành công
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
