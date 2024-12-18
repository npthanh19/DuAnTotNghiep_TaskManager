     import React, { useEffect, useState, useMemo } from 'react';
     import { Modal } from 'react-bootstrap';
     import { ToastContainer } from 'react-toastify';
     import { getTaskDetails } from '../../../services/tasksService'; // Đảm bảo bạn đã tạo hàm này trong services
     import { createComment, deleteComment } from '../../../services/commentService';
     import { useTranslation } from 'react-i18next';
     import Swal from 'sweetalert2';
     import { DeleteComment } from './Delete';
     import { getUserById } from '../../../services/usersService';
     import EmojiPicker from 'emoji-picker-react';
     import { downloadFile, viewFile, getFilePreviewUrl } from '../../../services/fileService';

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
          const [replyCommentId, setReplyCommentId] = useState(null); // Để theo dõi bình luận đang được trả lời
          const [replyContent, setReplyContent] = useState(''); // Nội dung bình luận trả lời
          const [selectedFile, setSelectedFile] = useState(null);
          const [comments, setComments] = useState([]);
          const [showEmojiPicker, setShowEmojiPicker] = useState(false);
          const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState(false);
          const [selectedFilePreview, setSelectedFilePreview] = useState(null);
          const [showFilePreviewModal, setShowFilePreviewModal] = useState(false);

          // Fetch the user full name
          useEffect(() => {
               const fetchUserFullName = () => {
                    const storedFullName = localStorage.getItem('user_name');
                    if (storedFullName) {
                         setUserFullName(storedFullName);
                    } else {
                         console.error(t('User  is not logged in or fullname not available in localStorage'));
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

                              // Đảm bảo comments được lưu với đầy đủ thông tin và cấu trúc phân cấp
                              const processComments = (comments) => {
                                   return comments.map((comment) => ({
                                        ...comment,
                                        files: comment.files || [],
                                        replies: comment.replies ? processComments(comment.replies) : [],
                                        user: comment.user || {},
                                   }));
                              };

                              const processedComments = processComments(response.comments || []);
                              setFilteredComments(processedComments);
                              setComments(processedComments);
                         }
                    } catch (error) {
                         console.error('Error fetching task details:', error);
                    }
               };

               if (taskId) fetchTaskDetails();
          }, [taskId]);

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

          // Thêm hàm xử lý xem file

          // Sửa lại hàm tải file
          const handleDownloadFile = async (fileId, fileName) => {
               try {
                    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/files/${fileId}/download`, {
                         headers: {
                              Authorization: `Bearer ${localStorage.getItem('token')}`,
                         },
                    });

                    if (!response.ok) {
                         throw new Error('Download failed');
                    }

                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();

                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);

                    Swal.fire({
                         icon: 'success',
                         text: t('File downloaded successfully'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               } catch (error) {
                    console.error('Error downloading file:', error);
                    Swal.fire({
                         icon: 'error',
                         text: t('Error downloading file'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          };

          // ... existing code ...

          // Sửa lại hàm handleFileClick
          const handleFileClick = async (file) => {
               try {
                    // Xác định loại file dựa vào phần mở rộng
                    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

                    // Tạo URL đầy đủ cho file
                    const fileUrl = `${process.env.REACT_APP_BASE_URL}/storage/comment_files/${file.file_name}`;

                    if (imageExtensions) {
                         // Nếu là file hình ảnh
                         setSelectedFilePreview({
                              type: 'image',
                              url: fileUrl,
                              name: file.file_name,
                              id: file.id,
                              path: file.file_path,
                         });
                    } else {
                         // Nếu là file khác
                         setSelectedFilePreview({
                              type: 'other',
                              name: file.file_name,
                              id: file.id,
                              path: file.file_path,
                         });
                    }
                    setShowFilePreviewModal(true);
               } catch (error) {
                    console.error('Error previewing file:', error);
                    Swal.fire({
                         icon: 'error',
                         text: t('Error previewing file'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          };

          const FilePreviewModal = () => {
               return (
                    <Modal show={showFilePreviewModal} onHide={() => setShowFilePreviewModal(false)} size="lg" centered>
                         <Modal.Header closeButton>
                              <Modal.Title>{selectedFilePreview?.name}</Modal.Title>
                         </Modal.Header>
                         <Modal.Body className="text-center">
                              {selectedFilePreview?.type === 'image' ? (
                                   <img
                                   src={`${process.env.REACT_APP_BASE_URL}/storage/${selectedFilePreview.path}`}
                                        alt={selectedFilePreview?.name}
                                        style={{
                                             maxWidth: '100%',
                                             maxHeight: '70vh',
                                             objectFit: 'contain',
                                        }}
                                        className="img-fluid"
                                   />
                              ) : (
                                   <div className="text-center p-5">
                                        <i className="bi bi-file-earmark fs-1 mb-3"></i>
                                        <p className="mb-0">{t('This file type cannot be previewed')}</p>
                                   </div>
                              )}
                         </Modal.Body>
                         <Modal.Footer className="justify-content-center">
                              <button
                                   className="btn btn-primary d-flex align-items-center gap-2"
                                   onClick={() => handleDownloadFile(selectedFilePreview.id, selectedFilePreview.name)}>
                                   <i className="bi bi-download"></i>
                                   {t('Download')}
                              </button>
                         </Modal.Footer>
                    </Modal>
               );
          };

          const handleDeleteClick = async (id) => {
               if (!id) {
                    console.error('Invalid comment ID');
                    return;
               }

               try {
                    const result = await Swal.fire({
                         title: t('Delete Comments'),
                         text: t('Are you sure you want to delete this comment?'),
                         icon: 'warning',
                         showCancelButton: true,
                         confirmButtonColor: '#d33',
                         cancelButtonColor: '#3085d6',
                         confirmButtonText: t('Delete'),
                         cancelButtonText: t('Cancel'),
                    });

                    if (result.isConfirmed) {
                         // Lưu trữ state cũ để có thể khôi phục nếu có lỗi
                         const previousComments = [...filteredComments];

                         // Cập nhật UI trước khi gọi API
                         setFilteredComments((prevComments) => {
                              // Tìm và xóa comment khỏi danh sách
                              const removeComment = (comments) => {
                                   return comments.filter((comment) => {
                                        if (comment.id === id) {
                                             return false; // Xóa comment này
                                        }
                                        if (comment.replies) {
                                             // Đệ quy xóa trong replies
                                             comment.replies = removeComment(comment.replies);
                                        }
                                        return true;
                                   });
                              };
                              return removeComment(prevComments);
                         });

                         try {
                              // Gọi API xóa
                              await deleteComment(id);

                              // Hiển thị thông báo thành công
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

                              // Khôi phục lại state cũ nếu có lỗi
                              setFilteredComments(previousComments);

                              // Hiển thị thông báo lỗi
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
               } catch (error) {
                    console.error('Error in handleDeleteClick:', error);
               }
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
          // Toggle hiển thị các phản hồi khi nhấn "Xem thêm"
          const toggleRepliesVisibility = (commentId) => {
               setRepliesVisibility((prevState) => ({
                    ...prevState,
                    [commentId]: !prevState[commentId],
               }));
          };
          const handleCancelComment = () => {
               setCommentContent(''); // Xóa nội dung comment
               setSelectedImage(null); // Xóa file đã chọn
               setShowAddCommentInput(false); // Ẩn form thêm comment nếu cần
          };
          const handleReplyClick = (commentId) => {
               setReplyCommentId(commentId); // Đặt commentId đang trả lời
          };
          const handleReplyChange = (e) => {
               setReplyContent(e.target.value); // Cập nhật nội dung bình luận trả lời
          };
          // Handle cancel action
          const handleCancelReply = () => {
               setReplyContent(''); // Clear the reply content
               setReplyCommentId(null); // Close the reply form
          };
          // Handle file change
          const handleFileChange = (event) => {
               const file = event.target.files[0];
               if (file) {
                    setSelectedFile(file);
               }
          };

          // Thêm các hàm xử lý emoji
          const onEmojiClick = (emojiObject) => {
               setCommentContent((prev) => prev + emojiObject.emoji);
               setShowEmojiPicker(false);
          };

          const onReplyEmojiClick = (emojiObject) => {
               setReplyContent((prev) => prev + emojiObject.emoji);
               setShowReplyEmojiPicker(false);
          };

          // Hàm gửi phản hồi
          const handleSubmitReply = async () => {
               if (replyContent.trim()) {
                    try {
                         const formData = new FormData();
                         formData.append('comment', replyContent);
                         formData.append('task_id', taskId);
                         formData.append('parent_id', replyCommentId);

                         if (selectedFile) {
                              formData.append('files[]', selectedFile);
                         }

                         const response = await createComment(formData);

                         // Hàm đệ quy để cập nhật comments
                         const updateCommentsWithNewReply = (comments) => {
                              return comments.map((comment) => {
                                   if (comment.id === replyCommentId) {
                                        return {
                                             ...comment,
                                             replies: [
                                                  ...(comment.replies || []),
                                                  {
                                                       id: response.comment.id,
                                                       comment: response.comment.comment,
                                                       created_at: response.comment.created_at,
                                                       user: response.comment.user,
                                                       files: response.comment.files || [],
                                                       replies: [], // Thêm mảng replies rỗng cho comment mới
                                                  },
                                             ],
                                        };
                                   }
                                   if (comment.replies && comment.replies.length > 0) {
                                        return {
                                             ...comment,
                                             replies: updateCommentsWithNewReply(comment.replies),
                                        };
                                   }
                                   return comment;
                              });
                         };

                         // Cập nhật cả hai state
                         const updatedComments = updateCommentsWithNewReply(filteredComments);
                         setFilteredComments(updatedComments);
                         setComments(updatedComments);

                         // Tự động hiển thị replies sau khi thêm
                         setRepliesVisibility((prev) => ({
                              ...prev,
                              [replyCommentId]: true,
                         }));

                         // Reset form
                         setReplyContent('');
                         setReplyCommentId(null);
                         setSelectedFile(null);

                         Swal.fire({
                              icon: 'success',
                              text: t('Comment response successful'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         console.error('Error submitting reply:', error);
                         // Xử lý lỗi...
                    }
               }
          };

          const handleViewMoreClick = (commentId) => {
               setRepliesVisibility((prevState) => ({
                    ...prevState,
                    [commentId]: !prevState[commentId], // Đảo ngược trạng thái hiển thị replies
               }));
          };
          // Render form trả lời
          const renderReplyForm = (comment) => {
               return (
                    replyCommentId === comment.id && (
                         <div className="reply-form ms-3">
                              <div className="position-relative">
                                   <textarea
                                        className="mb-2 form-control"
                                        value={replyContent}
                                        onChange={handleReplyChange}
                                        placeholder={t('Write the answer...')}
                                        rows="3"
                                   />
                                   <button
                                        className="btn btn-sm btn-outline-secondary position-absolute"
                                        style={{ bottom: '5px', right: '5px' }}
                                        onClick={() => setShowReplyEmojiPicker(!showReplyEmojiPicker)}>
                                        😊
                                   </button>
                                   {showReplyEmojiPicker && (
                                        <div className="position-absolute" style={{ bottom: '40px', right: '0', zIndex: 1000 }}>
                                             <EmojiPicker onEmojiClick={onReplyEmojiClick} />
                                        </div>
                                   )}
                              </div>
                              <input type="file" id="file-upload" onChange={handleFileChange} accept="image/*, .pdf, .docx" />
                              <div className="button-group mt-2">
                                   <button className="btn btn-primary" onClick={handleSubmitReply}>
                                        {t('To Do')}
                                   </button>
                                   <button className="btn btn-secondary" onClick={handleCancelReply}>
                                        {t('Cancel')}
                                   </button>
                              </div>
                         </div>
                    )
               );
          };

          const handleReplySubmit = (parentCommentId, replyContent) => {
               // Tạo một phản hồi mới từ dữ liệu đã nhập
               const newReply = {
                    id: Math.random(),
                    comment: replyContent,
                    created_at: new Date().toISOString(),
                    parent_id: parentCommentId,
                    fullname: 'User', // Cập nhật tên người dùng thực tế
                    user: { fullname: 'User', avatar: 'user-avatar.jpg' }, // Thêm thông tin người dùng
               };

               // Cập nhật lại các bình luận, thêm phản hồi mới vào mảng replies của bình luận cha
               setComments((prevComments) => {
                    return prevComments.map((comment) => {
                         if (comment.id === parentCommentId) {
                              // Nếu là bình luận cha, thêm phản hồi vào
                              return {
                                   ...comment,
                                   replies: [...(comment.replies || []), newReply],
                              };
                         }
                         return comment;
                    });
               });
          };

          const commentStyles = {
               // Container chính cho thread bình luận
               threadContainer: {
                    position: 'relative',
                    paddingLeft: '30px', // Tạo khoảng cách cho đường thẳng đứng
               },
               // Đường thẳng đứng chính
               verticalLine: {
                    position: 'absolute',
                    left: '15px',
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    backgroundColor: '#ddd',
               },
               // Container cho mỗi reply
               replyContainer: {
                    position: 'relative',
                    marginBottom: '15px',
               },
               // Đường gạch ngang nối với reply
               horizontalConnector: {
                    position: 'absolute',
                    left: '-15px',
                    top: '20px',
                    width: '15px',
                    height: '2px',
                    backgroundColor: '#ddd',
               },
               commentBox: {
                    backgroundColor: '#f8f9fa',
                    padding: '10px',
                    borderRadius: '8px',
                    marginLeft: '15px',
               },
          };

          // Hàm render bình luận và phản hồi
          const renderCommentsWithReplies = (comment, indent = 0) => {
               if (!comment || !comment.created_at) return null;

               const replies = Array.isArray(comment.replies) ? comment.replies : [];
               const hasReplies = replies.length > 0;

               // Sửa lại phần render file trong comment
               const getFilePreview = (file) => {
                    const fileExtension = file.file_name.split('.').pop().toLowerCase();
                    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

                    if (imageExtensions.includes(fileExtension)) {
                         const imageUrl = `${process.env.REACT_APP_BASE_URL}/storage/${file.file_path}`;
                         return (
                              <div className="file-preview cursor-pointer" onClick={() => handleFileClick(file)}>
                                   <img
                                        src={imageUrl}
                                        alt={file.file_name}
                                        className="img-thumbnail"
                                        style={{
                                             width: '50px',
                                             height: '50px',
                                             objectFit: 'cover',
                                             cursor: 'pointer',
                                        }}
                                        onError={(e) => {
                                             e.target.onerror = null;
                                             e.target.src = 'path/to/fallback/image.png';
                                        }}
                                   />
                              </div>
                         );
                    }

                    return (
                         <div className="file-preview cursor-pointer" onClick={() => handleFileClick(file)}>
                              <span className="badge bg-light text-primary d-flex align-items-center gap-1">
                                   <i className="bi bi-file-earmark"></i>
                                   {file.file_name}
                              </span>
                         </div>
                    );
               };

               // Thêm xử lý format ngày giờ
               const formatDateTime = (dateString) => {
                    const date = new Date(dateString);
                    return new Intl.DateTimeFormat('vi-VN', {
                         year: 'numeric',
                         month: '2-digit',
                         day: '2-digit',
                         hour: '2-digit',
                         minute: '2-digit',
                         second: '2-digit',
                    }).format(date);
               };

               return (
                    <li
                         key={`comment-${comment.id}`}
                         className="list-group-item"
                         style={{ marginLeft: `${indent}px`, backgroundColor: indent ? '#f8f9fa' : 'white' }}>
                         <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                   <div style={commentStyles.commentContainer}>
                                        {comment.user?.avatar ? (
                                             <img
                                                  src={`${process.env.REACT_APP_BASE_URL}/avatar/${comment.user.avatar}`}
                                                  alt="Avatar"
                                                  className="avatar me-2"
                                                  style={{
                                                       width: '30px',
                                                       height: '30px',
                                                       borderRadius: '50%',
                                                  }}
                                             />
                                        ) : (
                                             <div className="avatar-placeholder me-2"></div>
                                        )}
                                   </div>
                                   <span>
                                        <strong>{t('Name')}: </strong>
                                        {comment.user?.fullname || t('Unknown User')} <br />
                                        <small>
                                             <strong>{t('Comment')}: </strong>
                                             {comment.comment} <br />
                                             <strong>{t('File Name')}: </strong>
                                             {comment.files && comment.files.length > 0 ? (
                                                  <div className="d-flex flex-wrap gap-2 mt-1">
                                                       {comment.files.map((file) => (
                                                            <div
                                                                 key={file.id}
                                                                 className="file-preview-item"
                                                                 onClick={() => handleFileClick(file)}
                                                                 style={{ cursor: 'pointer' }}>
                                                                 {file.mime_type?.startsWith('image/') ? (
                                                                      <img
                                                                           src={file.file_url}
                                                                           alt={file.file_name}
                                                                           className="img-thumbnail"
                                                                           style={{
                                                                                width: '50px',
                                                                                height: '50px',
                                                                                objectFit: 'cover',
                                                                           }}
                                                                      />
                                                                 ) : (
                                                                      <span className="badge bg-light text-primary d-flex align-items-center gap-1">
                                                                           <i className="bi bi-file-earmark"></i>
                                                                           {file.file_name}
                                                                      </span>
                                                                 )}
                                                            </div>
                                                       ))}
                                                  </div>
                                             ) : (
                                                  <span>{t('No attachments')}</span>
                                             )}
                                             <br />
                                             {/* Thêm hiển thị ngày giờ */}
                                             <strong>{t('Time')}: </strong>
                                             {formatDateTime(comment.created_at)}
                                        </small>
                                   </span>
                              </div>
                         </div>

                         <div className="d-flex m-2">
                              <a className="text-danger ms-2" onClick={() => handleDeleteClick(comment.id)}>
                                   {t('Delete')}
                              </a>
                              <a className="ms-3 text-primary" onClick={() => handleReplyClick(comment.id)}>
                                   {t('Feedback')}
                              </a>
                              {hasReplies && (
                                   <a className="ms-3 text-info" onClick={() => handleViewMoreClick(comment.id)}>
                                        {repliesVisibility[comment.id] ? t('Hide comments') : t('See more')}
                                   </a>
                              )}
                         </div>

                         {indent > 0 && <div style={commentStyles.connector}></div>}

                         {replyCommentId === comment.id && <div className="mt-3">{renderReplyForm(comment)}</div>}
                         {/* Hiển thị replies */}
                         {hasReplies && repliesVisibility[comment.id] && (
                              <div style={commentStyles.threadContainer}>
                                   {/* Đường thẳng đứng */}
                                   <div style={commentStyles.verticalLine}></div>
                                   {/* Danh sách replies */}
                                   <ul className="list-unstyled">
                                        {replies.map((reply) => (
                                             <div key={reply.id} style={commentStyles.replyContainer}>
                                                  {/* Đường gạch ngang */}
                                                  <div style={commentStyles.horizontalConnector}></div>
                                                  {renderCommentsWithReplies(reply, indent + 1)}
                                             </div>
                                        ))}
                                   </ul>
                              </div>
                         )}
                    </li>
               );
          };

          const filteredParentComments = filteredComments.filter((comment) => !comment.parent_id);

          const handleSaveComment = async () => {
               if (!commentContent.trim()) {
                    return;
               }

               try {
                    // Tạo formData với nội dung comment và file
                    const formData = new FormData();
                    formData.append('comment', commentContent);
                    formData.append('task_id', taskId);

                    if (selectedImage) {
                         formData.append('files[]', selectedImage);
                    }

                    const response = await createComment(formData);

                    // Tạo object comment mới với thông tin đầy đủ
                    const newComment = {
                         id: response.comment.id,
                         comment: response.comment.comment,
                         created_at: response.comment.created_at,
                         user: {
                              id: response.comment.user.id,
                              fullname: response.comment.user.fullname,
                              avatar: response.comment.user.avatar,
                         },
                         files: response.comment.files || [],
                         replies: [],
                    };

                    // Cập nhật state với comment mới
                    setFilteredComments((prevComments) => [newComment, ...prevComments]);

                    // Reset form
                    setCommentContent('');
                    setSelectedImage(null);
                    setShowAddCommentInput(false);

                    Swal.fire({
                         icon: 'success',
                         text: t('Comment added successfully'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               } catch (error) {
                    console.error('Error saving comment:', error);
                    Swal.fire({
                         icon: 'error',
                         text: t('An error occurred.'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
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
                                   <div className="form-group position-relative">
                                        <textarea
                                             className="form-control"
                                             placeholder={t('Write a comment...')}
                                             value={commentContent}
                                             onChange={(e) => setCommentContent(e.target.value)}></textarea>
                                        <button
                                             className="btn btn-sm btn-outline-secondary position-absolute"
                                             style={{ bottom: '5px', right: '5px' }}
                                             onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                             😊
                                        </button>
                                        {showEmojiPicker && (
                                             <div className="position-absolute" style={{ bottom: '40px', right: '0', zIndex: 1000 }}>
                                                  <EmojiPicker onEmojiClick={onEmojiClick} />
                                             </div>
                                        )}
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
                                   <ul className="comment-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {filteredComments
                                             .filter((comment) => !comment.parent_id) // Chỉ hiển thị bình luận cha
                                             .map((comment) => renderCommentsWithReplies(comment))}
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

                    {/* ... existing code ... */}
                    <FilePreviewModal />
               </>
          );
     };
