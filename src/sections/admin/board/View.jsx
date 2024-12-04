import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './board.css';
import { getRunningTasks, updateTaskStatus } from '../../../services/tasksService';
import { TaskDetail } from './TaskDetail';

const users = [
     { id: 1, name: 'User 1', avatar: '/assets/admin/img/avatars/1.png' },
     { id: 2, name: 'User 2', avatar: '/assets/admin/img/avatars/2.png' },
     { id: 3, name: 'User 3', avatar: '/assets/admin/img/avatars/3.png' },
];

export const View = () => {
     const [data, setData] = useState({});
     const [showModal, setShowModal] = useState(false);
     const [selectedTask, setSelectedTask] = useState(null);

     const [selectedUsers, setSelectedUsers] = useState([]);
     const [showDropdown, setShowDropdown] = useState(false);

     const COLUMN_STATUS_MAP = {
          'to do': 1,
          'in progress': 2,
          preview: 3,
          done: 4,
     };

     useEffect(() => {
          getDataTask();

          async function getDataTask() {
               const tasks = await getRunningTasks();

               // Tạo các card từ dữ liệu tasks
               const cards = tasks.reduce((acc, task) => {
                    acc[`card-${task.id}`] = {
                         id: `card-${task.id}`,
                         task_name: task.task_name,
                         project_name: `Project ${task.project_id}`, // Bạn có thể thay đổi nếu cần
                         user_id: `user-${task.user_id}`,
                         status: task.status,
                         description: task.description,
                    };
                    return acc;
               }, {});

               // Nhóm các card theo status
               const groupedCards = tasks.reduce(
                    (acc, task) => {
                         const columnKey = getColumnKey(task.status); // Chuyển status thành column key
                         acc[columnKey] = acc[columnKey] || [];
                         acc[columnKey].push(`card-${task.id}`);
                         return acc;
                    },
                    {
                         'column-1': [], // To Do
                         'column-2': [], // In Progress
                         'column-3': [], // Preview
                         'column-4': [], // Done
                    },
               );

               // Cập nhật columns với cardIds tương ứng
               const updatedColumns = {
                    'column-1': { id: 'column-1', title: 'To Do', cardIds: groupedCards['column-1'] },
                    'column-2': { id: 'column-2', title: 'In Progress', cardIds: groupedCards['column-2'] },
                    'column-3': { id: 'column-3', title: 'Preview', cardIds: groupedCards['column-3'] },
                    'column-4': { id: 'column-4', title: 'Done', cardIds: groupedCards['column-4'] },
               };

               setData((prev) => ({
                    ...prev,
                    cards: cards,
                    columns: updatedColumns,
               }));
          }

          // Chuyển status thành column key
          function getColumnKey(status) {
               switch (status) {
                    case 'to do':
                         return 'column-1';
                    case 'in progress':
                         return 'column-2';
                    case 'preview':
                         return 'column-3';
                    case 'done':
                         return 'column-4';
                    default:
                         return 'column-1';
               }
          }
     }, []);

     const onDragEnd = async (result) => {
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
      
              setData((prevData) => ({
                  ...prevData,
                  columns: {
                      ...prevData.columns,
                      [newColumn.id]: newColumn,
                  },
              }));
              return;
          }
      
          // Update card position between different columns
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
      
          // Update state to reflect new card order
          setData((prevData) => ({
              ...prevData,
              columns: {
                  ...prevData.columns,
                  [newStart.id]: newStart,
                  [newFinish.id]: newFinish,
              },
          }));
      
          // Get task ID and new status
          const taskId = draggableId.replace('card-', '');
          const newStatus = COLUMN_STATUS_MAP[finishColumn.title.toLowerCase()];
      
          // Update task status via API
          try {
              await updateTaskStatus(taskId, newStatus);
              console.log(`Task ${taskId} status updated to ${newStatus}`);
      
              // Sau khi cập nhật status, cập nhật lại dữ liệu card trong state để re-render giao diện
              setData((prevData) => {
                  const updatedCards = { ...prevData.cards };
                  updatedCards[draggableId].status = finishColumn.title.toLowerCase(); // Cập nhật status của task
      
                  return {
                      ...prevData,
                      cards: updatedCards,
                  };
              });
          } catch (error) {
              console.error(`Failed to update task ${taskId} status`, error);
          }
      };
      

     const handleShowDetails = (card) => {
          const processedCard = {
               ...card,
               id: card.id.replace('card-', ''), // Loại bỏ 'card-' khỏi id
          };
          setSelectedTask(processedCard);
          setShowModal(true);
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
                                   {Object.values(data.columns || {}).map((column) => (
                                        <Droppable key={column.id} droppableId={column.id} type="card">
                                             {(provided) => (
                                                  <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                                                       <div className="column-header">
                                                            <h2>
                                                                 {column.title}
                                                                 <span className="column-count">({column.cardIds?.length || 0})</span>
                                                            </h2>
                                                       </div>
                                                       {column.cardIds?.map((cardId, index) => {
                                                            const card = data.cards?.[cardId] || {};
                                                            const user = data.users?.[card.user_id] || {};
                                                            return (
                                                                 <Draggable key={card.id} draggableId={card.id} index={index}>
                                                                      {(provided) => (
                                                                           <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                className="card">
                                                                                <div className="card-header">
                                                                                     <h4 className="task_name">{card.task_name || 'Unnamed Task'}</h4>
                                                                                     <button
                                                                                          className="details-button"
                                                                                          onClick={() => handleShowDetails(card)}>
                                                                                          <i className="bi bi-info-circle"></i>
                                                                                     </button>
                                                                                </div>
                                                                                <div className="people">
                                                                                     <p>Status: {card.status || 'Unknown'}</p>
                                                                                     {/* <img
                                                                                          src={user.avatarUrl || 'default-avatar.png'}
                                                                                          alt={`${card.user_id} avatar`}
                                                                                          className="avatar"
                                                                                     /> */}
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
               <TaskDetail showModal={showModal} setShowModal={setShowModal} selectedTask={selectedTask} />
          </>
     );
};
