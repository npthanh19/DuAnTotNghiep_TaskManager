import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './board.css';
import Modal from 'react-bootstrap/Modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const initialData = {
     columns: {
          'column-1': { id: 'column-1', title: 'To Do', cardIds: ['card-1', 'card-2', 'card-3'] },
          'column-2': { id: 'column-2', title: 'In Progress', cardIds: [] },
          'column-3': { id: 'column-3', title: 'Preview', cardIds: [] },
          'column-4': { id: 'column-4', title: 'Done', cardIds: [] },
     },
     cards: {
          'card-1': { id: 'card-1', task_name: 'Sample Task 1', project_name: 'Project A', user_id: 'user-1', status: 'Pending' },
          'card-2': { id: 'card-2', task_name: 'Sample Task 2', project_name: 'Project B', user_id: 'user-2', status: 'In Progress' },
          'card-3': { id: 'card-3', task_name: 'Sample Task 3', project_name: 'Project C', user_id: 'user-3', status: 'Completed' },
     },
     users: {
          'user-1': { id: 'user-1', avatarUrl: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg' },
          'user-2': { id: 'user-2', avatarUrl: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg' },
          'user-3': { id: 'user-3', avatarUrl: 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg' },
     },
};

const users = [
     { id: 1, name: 'User 1', avatar: '/assets/admin/img/avatars/1.png' },
     { id: 2, name: 'User 2', avatar: '/assets/admin/img/avatars/2.png' },
     { id: 3, name: 'User 3', avatar: '/assets/admin/img/avatars/3.png' },
];

export const View = () => {
     const [data, setData] = useState(initialData);
     const [showModal, setShowModal] = useState(false);
     const [isClosing, setIsClosing] = useState(false);
     const [selectedTask, setSelectedTask] = useState(null);
     const [editorData, setEditorData] = useState('');
     const [comments, setComments] = useState([]);
     const [newComment, setNewComment] = useState('');
     const [avatarUrl, setAvatarUrl] = useState('/assets/admin/img/avatars/1.png');
     const [isCreatedFormVisible, setIsCreatedFormVisible] = useState(false);
     const [selectedUsers, setSelectedUsers] = useState([]);
     const [showDropdown, setShowDropdown] = useState(false);

     const onDragEnd = (result) => {
          const { destination, source, draggableId } = result;

          if (!destination) {
               return;
          }

          if (destination.droppableId === source.droppableId && destination.index === source.index) {
               return;
          }

          const startColumn = data.columns[source.droppableId];
          const finishColumn = data.columns[destination.droppableId];

          if (startColumn === finishColumn) {
               const newCardIds = Array.from(startColumn.cardIds);
               newCardIds.splice(source.index, 1);
               newCardIds.splice(destination.index, 0, draggableId);

               const newColumn = {
                    ...startColumn,
                    cardIds: newCardIds,
               };

               setData({
                    ...data,
                    columns: {
                         ...data.columns,
                         [newColumn.id]: newColumn,
                    },
               });
               return;
          }

          const startCardIds = Array.from(startColumn.cardIds);
          startCardIds.splice(source.index, 1);
          const newStart = {
               ...startColumn,
               cardIds: startCardIds,
          };

          const finishCardIds = Array.from(finishColumn.cardIds);
          finishCardIds.splice(destination.index, 0, draggableId);
          const newFinish = {
               ...finishColumn,
               cardIds: finishCardIds,
          };

          setData({
               ...data,
               columns: {
                    ...data.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
               },
          });
     };

     const handleShowDetails = (card) => {
          setSelectedTask(card);
          setShowModal(true);
     };

     const handleCloseModal = () => {
          setIsClosing(true);
          setTimeout(() => {
               setShowModal(false);
               setIsClosing(false);
          }, 300);
     };

     const handleEditorChange = (event, editor) => {
          const data = editor.getData();
          setEditorData(data);
     };

     const handleAddComment = () => {
          if (newComment.trim() !== '') {
               setComments([...comments, { text: newComment, avatar: avatarUrl }]);
               setNewComment('');
          }
     };

     const handleStatusChange = (status) => {
          console.log(`Status changed to: ${status}`);
     };

     const handleToggleDropdown = () => {
          setShowDropdown((prev) => !prev);
     };

     const handleSelectUser = (user) => {
          setSelectedUsers((prev) => {
               if (prev.includes(user.id)) {
                    return prev.filter((id) => id !== user.id);
               }
               return [...prev, user.id];
          });
     };

     return (
          <>
               <h2 className="mb-4">
                    <div className="d-flex align-items-center justify-content-between">
                         {/* Project name nằm bên trái */}
                         <small className="mb-0 ms-4">Project name</small>

                         {/* Các phần còn lại nằm bên phải */}
                         <div className="d-flex align-items-center small">
                              {/* User */}
                              <div className="users_img d-flex align-items-center position-relative me-3">
                                   <img src={users[0].avatar} alt={users[0].name} className="user-avatar" />
                                   <span className="qty ms-2">+{users.length - 1}</span>
                                   <button className="btn btn-link btn-sm ms-2" onClick={handleToggleDropdown}>
                                        <i className="bi bi-plus-circle" />
                                   </button>

                                   {showDropdown && (
                                        <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 1000, top: '100%', left: '0' }}>
                                             {users.slice(1).map((user) => (
                                                  <div key={user.id} className="dropdown-item d-flex align-items-center">
                                                       <input
                                                            type="checkbox"
                                                            checked={selectedUsers.includes(user.id)}
                                                            onChange={() => handleSelectUser(user)}
                                                            className="me-2"
                                                       />
                                                       <img src={user.avatar} alt={user.name} className="user-avatar me-2" />
                                                       {user.name}
                                                  </div>
                                             ))}
                                        </div>
                                   )}
                              </div>

                              {/* Search */}
                              <input type="text" className="form-control form-control-sm me-3" placeholder="Search..." style={{ width: '150px' }} />

                              {/* Dropdowns */}
                              <select className="form-select form-select-sm me-3" aria-label="Epic Dropdown">
                                   <option value="">Epic</option>
                                   <option value="epic1">Topic 1</option>
                                   <option value="epic2">Topic 2</option>
                                   <option value="epic3">Topic 3</option>
                              </select>
                              <select className="form-select form-select-sm me-3" aria-label="Label Dropdown">
                                   <option value="">Label</option>
                                   <option value="label1">Nhân Viên</option>
                                   <option value="label2">Dev</option>
                                   <option value="label3">Chủ tịch</option>
                              </select>
                         </div>
                    </div>
               </h2>

               <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="all-columns" direction="horizontal">
                         {(provided) => (
                              <div ref={provided.innerRef} {...provided.droppableProps} className="columns-container">
                                   {Object.values(data.columns).map((column) => (
                                        <Droppable key={column.id} droppableId={column.id} type="card">
                                             {(provided) => (
                                                  <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                                                       <div className="column-header">
                                                            <h2>
                                                                 {column.title}
                                                                 <span className="column-count">({column.cardIds.length})</span>
                                                            </h2>
                                                       </div>
                                                       {column.cardIds.map((cardId, index) => {
                                                            const card = data.cards[cardId];
                                                            const user = data.users[card.user_id];
                                                            return (
                                                                 <Draggable key={card.id} draggableId={card.id} index={index}>
                                                                      {(provided) => (
                                                                           <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                className="card">
                                                                                <div className="card-header">
                                                                                     <h4 className="task_name">{card.task_name}</h4>
                                                                                     <button
                                                                                          className="details-button"
                                                                                          onClick={() => handleShowDetails(card)}>
                                                                                          <i className="bi bi-info-circle"></i>
                                                                                     </button>
                                                                                </div>
                                                                                <div className="people">
                                                                                     <p>Status: {card.status}</p>
                                                                                     <img
                                                                                          src={user.avatarUrl}
                                                                                          alt={`${card.user_id} avatar`}
                                                                                          className="avatar"
                                                                                     />
                                                                                </div>
                                                                           </div>
                                                                      )}
                                                                 </Draggable>
                                                            );
                                                       })}
                                                       {provided.placeholder}
                                                  </div>
                                             )}
                                        </Droppable>
                                   ))}
                                   {provided.placeholder}
                              </div>
                         )}
                    </Droppable>
               </DragDropContext>

               <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    centered
                    dialogClassName={`modal-xl ${isClosing ? 'zoom-out' : ''}  modal-responsive`}>
                    <Modal.Body>
                         <div className="d-flex justify-content-between align-items-center mb-3">
                              <i className="bi bi-pencil" title="Edit Task">
                                   <small className="ms-3">Note</small> / Task ?
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
                                             <p className="mb-0">Description</p>
                                        </div>

                                        <CKEditor editor={ClassicEditor} data={editorData} onChange={handleEditorChange} />

                                        <div className="d-flex align-items-center mt-2">
                                             <button className="btn btn-primary btn-sm">Save</button>
                                             <p className="ms-2 mb-0 small">Cancel</p>
                                        </div>

                                        <div className="d-flex align-items-center mt-3">
                                             <strong className="ms-1">Activity</strong>
                                        </div>
                                        <div className="d-flex align-items-center mt-2">
                                             <p className="mb-0 small me-2">Show:</p>
                                             <span className="badge bg-secondary me-2" onClick={() => {}}>
                                                  All
                                             </span>
                                             <span className="badge bg-secondary me-2" onClick={() => {}}>
                                                  Comment
                                             </span>
                                             <span className="badge bg-secondary" onClick={() => {}}>
                                                  History
                                             </span>
                                        </div>

                                        <div className="comment-section mt-4">
                                             <h5>Bình luận</h5>
                                             <div className="input-group mb-3">
                                                  <input
                                                       type="text"
                                                       className="form-control"
                                                       placeholder="Thêm bình luận..."
                                                       value={newComment}
                                                       onChange={(e) => setNewComment(e.target.value)}
                                                  />
                                                  <button className="btn btn-outline-secondary" onClick={handleAddComment}>
                                                       Thêm
                                                  </button>
                                             </div>
                                             <ul className="list-group comment-list">
                                                  {comments.map((comment, index) => (
                                                       <li key={index} className="list-group-item d-flex align-items-center">
                                                            <img
                                                                 src={comment.avatar}
                                                                 alt="Avatar"
                                                                 className="avatar me-2"
                                                                 style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                                            />
                                                            {comment.text}
                                                       </li>
                                                  ))}
                                             </ul>
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
                                                       Todo
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                       <li>
                                                            <a className="dropdown-item" onClick={() => handleStatusChange('todo')}>
                                                                 Todo
                                                            </a>
                                                       </li>
                                                       <li>
                                                            <a className="dropdown-item" onClick={() => handleStatusChange('in-progress')}>
                                                                 In Progress
                                                            </a>
                                                       </li>
                                                       <li>
                                                            <a className="dropdown-item" onClick={() => handleStatusChange('review')}>
                                                                 Review
                                                            </a>
                                                       </li>
                                                       <li>
                                                            <a className="dropdown-item" onClick={() => handleStatusChange('done')}>
                                                                 Done
                                                            </a>
                                                       </li>
                                                  </ul>
                                             </div>
                                             <button className="btn btn-secondary">
                                                  <i className="bi bi-lightning-charge"></i> Action
                                             </button>
                                        </div>

                                        <table className="table table-bordered" style={{ width: '100%' }}>
                                             <thead className="table">
                                                  <tr>
                                                       <th colSpan={2}>Detail</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  <tr>
                                                       <td>Assignee</td>
                                                       <td>
                                                            <img
                                                                 src="/assets/admin/img/avatars/1.png"
                                                                 alt="Assignee"
                                                                 style={{ width: '25px', height: '25px', borderRadius: '50%' }}
                                                            />
                                                            John Doe
                                                       </td>
                                                  </tr>
                                                  <tr>
                                                       <td>Labels</td>
                                                       <td>None</td>
                                                  </tr>
                                                  <tr>
                                                       <td>Parent</td>
                                                       <td>None</td>
                                                  </tr>
                                                  <tr>
                                                       <td>Sprint</td>
                                                       <td>FE-0001</td>
                                                  </tr>
                                                  <tr>
                                                       <td>Story Point Estimate</td>
                                                       <td>None</td>
                                                  </tr>
                                                  <tr>
                                                       <td>Reporter</td>
                                                       <td>
                                                            <img
                                                                 src="/assets/admin/img/avatars/1.png"
                                                                 alt="Reporter"
                                                                 style={{ width: '25px', height: '25px', borderRadius: '50%' }}
                                                            />
                                                            Jane Smith
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>

                                        <div className="mt-3 d-flex gap-2 flex-wrap">
                                             <div className="d-flex flex-column me-3">
                                                  <p className="mb-0 small">
                                                       <strong>Created:</strong> ...
                                                  </p>
                                                  <p className="mb-0 small">
                                                       <strong>Updated:</strong> Just now
                                                  </p>
                                             </div>
                                             <div className="d-flex align-items-center">
                                                  <i className="bi bi-gear me-2 small" title="Settings"></i>
                                                  <span className="small">Configure</span>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         )}
                    </Modal.Body>
               </Modal>
          </>
     );
};
