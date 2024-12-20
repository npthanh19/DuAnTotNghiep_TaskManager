import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createComment, deleteComment, getCommentsByTask, updateComment } from '../../../services/commentService';
import { updateTaskStatus, getRunningTasks, updateTaskDescription } from '../../../services/tasksService';
import Swal from 'sweetalert2';
import { getAllUsers, getUserById } from '../../../services/usersService';
import { useTranslation } from 'react-i18next';

export const TaskDetail = ({ showModal, setShowModal, selectedTask, stateEdit, setStateEdit }) => {
     const [isClosing, setIsClosing] = useState(false);
     const [editorData, setEditorData] = useState('');
     const [comments, setComments] = useState([]);
     const [newComment, setNewComment] = useState('');
     const [editComment, setEditComment] = useState([]);
     const [sprints, setSprints] = useState([]);
     const [avatarUrl] = useState('/assets/admin/img/avatars/1.png');
     const { t } = useTranslation();

     useEffect(() => {
          if (selectedTask) {
               setEditorData(selectedTask?.description || '');
               fetchComments(selectedTask.id);
          }
     }, [selectedTask]);

     const handleCloseModal = () => {
          setIsClosing(true);
          setTimeout(() => {
               // Đảm bảo trạng thái task đã được cập nhật trong UI
               setShowModal(false);
               setIsClosing(false);
          }, 300);
     };

     const handleEditorChange = (event, editor) => {
          const data = editor.getData();
          setEditorData(data);
     };

     const fetchComments = async (taskId) => {
          try {
               const response = await getCommentsByTask(taskId);
               console.log('Fetched comments:', response);
               setComments(Array.isArray(response) ? response : []);
          } catch (error) {
               console.error('Error fetching comments:', error);
          }
     };

     const handleStatusChange = async (status) => {
          if (status === selectedTask.status) {
               return;
          }

          let dataMapping;
          if (status === t('To Do')) dataMapping = 1;
          if (status === t('In Progress')) dataMapping = 2;
          if (status === t('Preview')) dataMapping = 3;
          if (status === t('Done')) dataMapping = 4;

          try {
               const updatedTask = await updateTaskStatus(selectedTask.id, dataMapping);
               console.log(`Task updated successfully:`, updatedTask);
               selectedTask.status = status;
               setSprints((prevSprints) =>
                    prevSprints.map((sprint) => ({
                         ...sprint,
                         tasks: sprint.tasks.map((task) => (task.id === selectedTask.id ? { ...task, status } : task)),
                    })),
               );
               Swal.fire('Cập nhật trạng thái', `Task đã được chuyển sang trạng thái: ${status}`, 'success');
          } catch (error) {
               console.error(`Failed to update task status:`, error);
               Swal.fire('Lỗi!', 'Có lỗi xảy ra khi cập nhật trạng thái task.', 'error');
          }
     };

     const handleAddComment = async () => {
          if (newComment.trim() !== '') {
               try {
                    await createComment({
                         comment: newComment,
                         task_id: selectedTask?.id,
                         avatar: avatarUrl,
                    });

                    fetchComments(selectedTask.id);
                    setNewComment('');
               } catch (error) {
                    console.error('Error adding comment:', error);
               }
          }
     };

     const handleDeleteComment = async (id) => {
          Swal.fire({
               title: t('Are you sure?'),
               text: t('You will not be able to undo this action!'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         await deleteComment(id);
                         setComments((prev) => prev.filter((comment) => comment.id !== id));
                         Swal.fire({
                              icon: 'success',
                              title: t('Deleted!'),
                              text: t('Your comment has been deleted.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         console.error('Error deleting comment:', error);
                         Swal.fire({
                              icon: 'error',
                              text: t('Something went wrong.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    }
               }
          });
     };

     const handleEditDescription = async (taskId) => {
          try {
               // Gọi tới hàm updateTaskDescription để cập nhật mô tả
               await updateTaskDescription(taskId, editorData);

               // Cập nhật danh sách comments với mô tả mới (nếu cần đồng bộ frontend)
               setComments((prev) =>
                    prev.map((comment) =>
                         comment.id === taskId ? { ...comment, comment: editorData, updated_at: new Date().toISOString() } : comment,
                    ),
               );

               // Đặt trạng thái chỉnh sửa về null
               setEditComment(null);
               setStateEdit(!stateEdit);
          } catch (error) {
               console.error('Error updating task description:', error);
          }
     };

     const handleSaveClick = (taskId) => {
          Swal.fire({
               title: 'Bạn có chắc chắn muốn lưu?',
               text: 'Dữ liệu sẽ được lưu lại!',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: 'Lưu',
               cancelButtonText: 'Hủy',
          }).then((result) => {
               if (result.isConfirmed) {
                    handleEditDescription(taskId);
                    Swal.fire('Đã lưu!', 'Dữ liệu đã được lưu.', 'success');
               }
          });
     };

     const renderComments = (comments) =>
          comments.map((comment) => (
               <li key={comment.id} className="list-group-item">
                    <div className="d-flex align-items-center">
                         <img src={avatarUrl} alt="Avatar" className="avatar me-2" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                         <div className="me-auto">
                              {editComment?.id === comment?.id ? (
                                   <>
                                        <input
                                             type="text"
                                             value={editComment?.comment}
                                             onChange={(e) => setEditComment({ ...editComment, comment: e.target.value })}
                                             className="form-control me-2"
                                        />
                                        <button className="btn btn-success btn-sm me-2">{t('Save')}</button>
                                        <button onClick={() => setEditComment(null)} className="btn btn-danger btn-sm">
                                             {t('Cancel')}
                                        </button>
                                   </>
                              ) : (
                                   <>
                                        <span className="me-auto">{comment.comment}</span>
                                        <button onClick={() => setEditComment(comment)} className="btn btn-sm btn-primary me-2">
                                             {t('Edit')}
                                        </button>

                                        <button onClick={() => handleDeleteComment(comment.id)} className="btn btn-sm btn-danger">
                                             {t('Delete')}
                                        </button>
                                   </>
                              )}
                         </div>
                    </div>
                    {comment.replies && comment.replies.length > 0 && <ul className="list-group ms-4 mt-2">{renderComments(comment.replies)}</ul>}
               </li>
          ));
     return (
          <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName={`modal-xl ${isClosing ? 'zoom-out' : ''}  modal-responsive`}>
               <Modal.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                         <i className="bi bi-pencil" title="Edit Task">
                              <small className="ms-3">{t('Note')}</small> / {t('Task')} ?
                         </i>
                         <button onClick={handleCloseModal} className="btn-close ms-3" aria-label="Close"></button>
                    </div>

                    {selectedTask && (
                         <div className="row">
                              <div className="col-lg-8 col-md-12 border-end pe-3">
                                   <p className="d-flex align-items-center">
                                        <strong className="me-2">{selectedTask.task_name}</strong>
                                   </p>
                                   <div className="d-flex align-items-center mt-2">
                                        <p className="mb-0">{t('Description')}</p>
                                   </div>

                                   <CKEditor editor={ClassicEditor} data={editorData} onChange={handleEditorChange} />

                                   <div className="d-flex align-items-center mt-2">
                                        <button className="btn btn-primary btn-sm" onClick={() => handleSaveClick(selectedTask.id)}>
                                             {t('Save')}
                                        </button>
                                        <p className="ms-2 mb-0 small">{t('Cancel')}</p>
                                   </div>

                                   <div className="comment-section mt-4 d-none">
                                        <h5>{t('Comment')}</h5>
                                        <div className="input-group mb-3">
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder={t('Add Comment')}
                                                  value={newComment}
                                                  onChange={(e) => setNewComment(e.target.value)}
                                             />
                                             <button className="btn btn-outline-secondary" onClick={handleAddComment}>
                                                  Thêm
                                             </button>
                                        </div>
                                        <ul className="list-group comment-list">{renderComments(comments)}</ul>
                                   </div>
                              </div>

                              <div className="col-lg-4 col-md-12 d-flex flex-column align-items-start">
                                   <div className="d-flex align-items-center mb-2">
                                        <div className="dropdown me-2">
                                             <button
                                                  className="btn btn-primary dropdown-toggle"
                                                  type="button"
                                                  id="dropdownMenuButton"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false">
                                                  {selectedTask.status ? selectedTask.status : 'To do'}
                                             </button>
                                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                  <li>
                                                       <a className="dropdown-item" onClick={() => handleStatusChange(t('To Do'))}>
                                                            {t('To Do')}
                                                       </a>
                                                  </li>
                                                  <li>
                                                       <a className="dropdown-item" onClick={() => handleStatusChange(t('in Progress'))}>
                                                            {t('In Progress')}
                                                       </a>
                                                  </li>
                                                  <li>
                                                       <a className="dropdown-item" onClick={() => handleStatusChange(t('Review'))}>
                                                            {t('Review')}
                                                       </a>
                                                  </li>
                                                  <li>
                                                       <a className="dropdown-item" onClick={() => handleStatusChange(t('Done'))}>
                                                            {t('Done')}
                                                       </a>
                                                  </li>
                                             </ul>
                                        </div>
                                        <button className="btn btn-secondary">
                                             <i className="bi bi-lightning-charge"></i> {t('Actions')}
                                        </button>
                                   </div>

                                   <table className="table table-bordered" style={{ width: '100%' }}>
                                        <thead className="table">
                                             <tr>
                                                  <th colSpan={2}>{t('Detail')}</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             <tr>
                                                  <td>{t('Assignee')}</td>
                                                  <td>
                                                       {/* Assigned Users */}
                                                       <div className="assigned_users" style={{ display: 'flex', position: 'relative' }}>
                                                            {selectedTask.assigned_users.map((user, index) => (
                                                                 <div
                                                                      key={user.user_id}
                                                                      className="assigned_user"
                                                                      style={{
                                                                           position: 'relative',
                                                                           display: 'inline-block',
                                                                           marginRight: index === 0 ? '5px' : '0', // Margin phải cho thành viên đầu tiên
                                                                           zIndex: selectedTask.assigned_users.length - index, // Thứ tự lớp chồng
                                                                           marginLeft: index > 0 ? '-15px' : '0', // Dịch ngược cho avatar sau
                                                                      }}>
                                                                      <img
                                                                           src={
                                                                                user.avatar
                                                                                     ? `${process.env.REACT_APP_BASE_URL}/avatar/${user.avatar}`
                                                                                     : 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg'
                                                                           }
                                                                           alt={user.fullname}
                                                                           title={user.fullname}
                                                                           style={{
                                                                                width: '30px',
                                                                                height: '30px',
                                                                                borderRadius: '50%',
                                                                                cursor: 'pointer',
                                                                                border: '2px solid #fff', // Viền trắng giữa các avatar
                                                                           }}
                                                                      />
                                                                      <div
                                                                           className="user_fullname"
                                                                           style={{
                                                                                display: 'none',
                                                                                position: 'absolute',
                                                                                bottom: '-25px',
                                                                                left: '50%',
                                                                                transform: 'translateX(-50%)',
                                                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                                                color: '#fff',
                                                                                padding: '5px',
                                                                                borderRadius: '3px',
                                                                                fontSize: '12px',
                                                                                whiteSpace: 'nowrap',
                                                                           }}>
                                                                           {user.fullname}
                                                                      </div>
                                                                 </div>
                                                            ))}
                                                       </div>
                                                  </td>
                                             </tr>
                                             <tr>
                                                  <td>{t('Projects')}</td>
                                                  <td>{selectedTask?.project_name || 'N/A'}</td>
                                             </tr>
                                             <tr>
                                                  <td>{t('Worktimes')}</td>
                                                  <td>{selectedTask?.worktime_id || 'N/A'}</td>
                                             </tr>
                                             <tr>
                                                  <td>{t('Score estimate')}</td>
                                                  <td>{selectedTask?.task_time || 'N/A'}</td>
                                             </tr>
                                             <tr>
                                                  <td>{t('User Create')}</td>
                                                  <td>{selectedTask.user_name ? selectedTask.user_name : 'Không xác định'}</td>
                                             </tr>
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    )}
               </Modal.Body>
          </Modal>
     );
};
// 1
