import React, { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './board.css';
import { getRunningTasks, updateTaskStatus } from '../../../services/tasksService';
import { TaskDetail } from './TaskDetail';
import { getAllProjects } from '../../../services/projectsService';
import { getAllWorktimes } from '../../../services/worktimeService';
import { getAllUsers, getUserById } from '../../../services/usersService';
import { useTranslation } from 'react-i18next';

const users = [
     { id: 1, name: 'User 1', avatar: '/assets/admin/img/avatars/1.png' },
     { id: 2, name: 'User 2', avatar: '/assets/admin/img/avatars/2.png' },
     { id: 3, name: 'User 3', avatar: '/assets/admin/img/avatars/3.png' },
];

export const View = () => {
     const [data, setData] = useState({});
     const [showModal, setShowModal] = useState(false);
     const [selectedTask, setSelectedTask] = useState(null);
     const [projects, setProjects] = useState([]);
     const [selectedUsers, setSelectedUsers] = useState([]);
     const [showDropdown, setShowDropdown] = useState(false);
     const { t } = useTranslation();

     const COLUMN_STATUS_MAP = {
          'to do': 1,
          'in progress': 2,
          preview: 3,
          done: 4,
     };

     useEffect(() => {
          getDataTask();

          async function getDataTask() {
               const [tasks, fetchedProjects, worktimes, users] = await Promise.all([
                    getRunningTasks(),
                    getAllProjects(),
                    getAllWorktimes(),
                    getAllUsers(),
               ]);

               console.log('tasks', tasks);

               const projectMap = fetchedProjects.reduce((acc, project) => {
                    acc[project.id] = project.project_name;
                    return acc;
               }, {});

               const worktimeMap = worktimes.reduce((acc, worktime) => {
                    acc[worktime.id] = worktime.name;
                    return acc;
               }, {});
               const userMap = users.reduce((acc, user) => {
                    acc[user.id] = user.fullname;
                    return acc;
               }, {});

               setProjects(fetchedProjects);
               console.log('Running tasks data:', tasks);
               // Tạo các card từ dữ liệu tasks
               const cards = tasks.reduce((acc, task) => {
                    acc[`card-${task.id}`] = {
                         id: `card-${task.id}`,
                         task_name: task.task_name,
                         project_name: projectMap[task.project_id] || 'Unknown Project',
                         user_name: userMap[task.user_id] || 'Unknown User',
                         status: task.status,
                         task_time: task.task_time,
                         description: task.description,
                         worktime_id: worktimeMap[task.worktime_id] || 'Unknown Worktime',
                         assigned_users: task.assigned_users,
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
                    'column-1': { id: 'column-1', title: 'to do', cardIds: groupedCards['column-1'] },
                    'column-2': { id: 'column-2', title: 'in progress', cardIds: groupedCards['column-2'] },
                    'column-3': { id: 'column-3', title: 'preview', cardIds: groupedCards['column-3'] },
                    'column-4': { id: 'column-4', title: 'done', cardIds: groupedCards['column-4'] },
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
                         <small className="mb-0 ms-4">{t('Project Name')}</small>

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
                              <input
                                   type="text"
                                   className="form-control form-control-sm me-3"
                                   placeholder={t('Search...')}
                                   style={{ width: '150px' }}
                              />

                              <select className="form-select form-select-sm me-3" aria-label="Select Project">
                                   <option value="">{t('Select Project')}</option>
                                   {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                             {project.project_name}
                                        </option>
                                   ))}
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
                                                                                     <p>
                                                                                          {t('Status')}: {card.status || '-'}
                                                                                     </p>
                                                                                     {/* Assigned Users */}
                                                                                     <div className="assigned_users">
                                                                                          {card.assigned_users.map((user) => (
                                                                                               <div
                                                                                                    key={user.user_id}
                                                                                                    className="assigned_user"
                                                                                                    style={{
                                                                                                         position: 'relative',
                                                                                                         display: 'inline-block',
                                                                                                         marginRight: '5px',
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
