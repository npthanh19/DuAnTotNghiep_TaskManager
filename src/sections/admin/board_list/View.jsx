import React, { useEffect, useState } from 'react';
import './board_log.css';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getAllWorktimes } from '../../../services/worktimeService';
import { getAllTasks, getTasksByWorktimeId, getTaskWithoutWorktime, updateLocationTask } from '../../../services/tasksService';
import { v4 as uuidv4 } from 'uuid';

export function View() {
     const [newTask, setNewTask] = useState('');
     const [isCreatedFormVisible, setIsCreatedFormVisible] = useState(false);
     const [showDropdown, setShowDropdown] = useState(false);
     const [selectedUsers, setSelectedUsers] = useState([]);
     /* const [initialSprints, setInitialSprints] = useState(); */
     const users = [
          { id: 1, name: 'User 1', avatar: '/assets/admin/img/avatars/1.png' },
          { id: 2, name: 'User 2', avatar: '/assets/admin/img/avatars/2.png' },
          { id: 3, name: 'User 3', avatar: '/assets/admin/img/avatars/3.png' },
     ];

     useEffect(() => {
          const fetchWorkTimes = async () => {
               const worktimes = await getAllWorktimes();
               console.log(worktimes)


               const formattedData = worktimes.map((worktime) => {
                    const startDate = new Date(worktime.start_date);
                    const endDate = new Date(worktime.end_date);

                    const dateRange = `${startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} – ${endDate.toLocaleDateString(
                         'en-GB',
                         { day: '2-digit', month: 'short' },
                    )}`;

                    return {
                         id: worktime.id.toString(),
                         dateRange,
                         tasks: [],
                    };
               });



               setSprints(formattedData);
               console.log(sprints);
          };

          const fetchTask = async () => {
               const tasks = await getTaskWithoutWorktime();
               console.log('tasks', tasks);
               setTaskNotWorkTime(tasks);
          };

          fetchWorkTimes();
          fetchTask();
     }, []);

     /* const initialSprints = [
          { id: 'FE-0001', dateRange: '26 Aug – 2 Sep', tasks: [ 
               { id: 'SCRUM-1', name: 'Cắt theme trang admin', status: 'REVIEW', assignee: '/assets/admin/img/avatars/2.png', priority: 5, completed: false }, 
               { id: 'SCRUM-2', name: 'Sửa lỗi giao diện', status: 'IN PROGRESS', assignee: '/assets/admin/img/avatars/3.png', priority: 3, completed: false }, 
               { id: 'SCRUM-3', name: 'Tối ưu hóa tốc độ tải trang', status: 'TO DO', assignee: '/assets/admin/img/avatars/1.png', priority: 4, completed: false } 
          ]},
     ]; */

     const [sprints, setSprints] = useState();
     const [taskNotWorkTime, setTaskNotWorkTime] = useState();
     const [isInputVisible, setIsInputVisible] = useState({});

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

     const handleStatusChange = (sprintId, taskId, newStatus) => {
          const updatedSprints = sprints.map((sprint) => {
               if (sprint.id === sprintId) {
                    return {
                         ...sprint,
                         tasks: sprint.tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
                    };
               }
               return sprint;
          });
          setSprints(updatedSprints);
     };

     const handleAddTask = (sprintId) => {
          if (!newTask.trim()) return;
          const updatedSprints = sprints.map((sprint) => {
               if (sprint.id === sprintId) {
                    return {
                         ...sprint,
                         tasks: [
                              ...sprint.tasks,
                              {
                                   id: `SCRUM-${sprint.tasks.length + 1}`,
                                   name: newTask,
                                   status: 'TO DO',
                                   assignee: '/assets/admin/img/avatars/1.png',
                                   priority: 1,
                                   completed: false,
                              },
                         ],
                    };
               }
               return sprint;
          });
          setSprints(updatedSprints);
          setNewTask('');
          setIsInputVisible(false);
     };

     const handleDragEnd = async (result) => {
          const { source, destination } = result;
      
          // Không có điểm đến (hủy thao tác kéo thả)
          if (!destination) return;
      
          const updatedSprints = [...sprints];  // sao chép trạng thái hiện tại của sprints
          const updatedUnassignTasks = [...taskNotWorkTime];  // sao chép trạng thái hiện tại của unassignTasks
      
          // Kéo từ unassignTasks
          if (source.droppableId === 'unassignTasks') {
              const movedTask = taskNotWorkTime[source.index];
              updatedUnassignTasks.splice(source.index, 1);
      
              if (destination.droppableId === 'unassignTasks') {
                  // Kéo trong cùng unassignTasks
                  updatedUnassignTasks.splice(destination.index, 0, movedTask);
              } else {
                  // Kéo vào sprint
                  const destinationSprint = updatedSprints.find(sprint => sprint.id === destination.droppableId);
                  if (destinationSprint) {
                      const updatedTasks = [...destinationSprint.tasks];
                      updatedTasks.splice(destination.index, 0, movedTask);
                      destinationSprint.tasks = updatedTasks;
      
                      // Cập nhật lại state của sprints
                      setSprints(updatedSprints);
                  }
                  // Cập nhật lại state của unassignTasks
                  setTaskNotWorkTime(updatedUnassignTasks);
      
                  // Gọi API để cập nhật vị trí task trong cơ sở dữ liệu
                  await updateLocationTask(movedTask.id, { locationId: destination.droppableId });
              }
          } else {
              // Kéo trong hoặc giữa các sprint
              const sourceSprint = updatedSprints.find(sprint => sprint.id === source.droppableId);
              const destinationSprint = updatedSprints.find(sprint => sprint.id === destination.droppableId);
      
              if (sourceSprint && destinationSprint) {
                  const movedTask = sourceSprint.tasks[source.index];
                  const updatedSourceTasks = [...sourceSprint.tasks];
                  updatedSourceTasks.splice(source.index, 1);
      
                  if (source.droppableId === destination.droppableId) {
                      // Kéo trong cùng sprint
                      updatedSourceTasks.splice(destination.index, 0, movedTask);
                      sourceSprint.tasks = updatedSourceTasks;
      
                      // Cập nhật lại state của sprints
                      setSprints(updatedSprints);
                  } else {
                      // Kéo giữa các sprint
                      const updatedDestinationTasks = [...destinationSprint.tasks];
                      updatedDestinationTasks.splice(destination.index, 0, movedTask);
                      destinationSprint.tasks = updatedDestinationTasks;
      
                      // Cập nhật lại state của sprints
                      setSprints(updatedSprints);
                  }
      
                  // Gọi API để cập nhật vị trí task trong cơ sở dữ liệu
                  await updateLocationTask(movedTask.id, { locationId: destination.droppableId });
              } else if (!destinationSprint) {
                  // Kéo ra khỏi sprint vào unassignTasks
                  const movedTask = sourceSprint.tasks[source.index];
                  const updatedSourceTasks = [...sourceSprint.tasks];
                  updatedSourceTasks.splice(source.index, 1);
      
                  const updatedUnassignTasks = [...taskNotWorkTime];
                  updatedUnassignTasks.splice(destination.index, 0, movedTask);
      
                  // Cập nhật lại state của sprints và unassignTasks
                  setSprints(updatedSprints);
                  setTaskNotWorkTime(updatedUnassignTasks);
      
                  // Gọi API để cập nhật vị trí task trong cơ sở dữ liệu
                  await updateLocationTask(movedTask.id, { locationId: 'unassignTasks' });
              }
          }
      };
      

     const handleToggleAllTasks = (sprintId, isChecked) => {
          const updatedSprints = sprints.map((sprint) => {
               if (sprint.id === sprintId) {
                    return {
                         ...sprint,
                         tasks: sprint.tasks.map((task) => ({ ...task, completed: isChecked })),
                    };
               }
               return sprint;
          });
          setSprints(updatedSprints);
     };

     const handleTaskCompletionToggle = (sprintId, taskId) => {
          const updatedSprints = sprints.map((sprint) => {
               if (sprint.id === sprintId) {
                    return {
                         ...sprint,
                         tasks: sprint.tasks.map((task) => {
                              if (task.id === taskId) {
                                   return { ...task, completed: !task.completed };
                              }
                              return task;
                         }),
                    };
               }
               return sprint;
          });
          setSprints(updatedSprints);
     };

     const toggleInputVisibility = (sprintId) => {
          setIsInputVisible((prev) => ({
               ...prev,
               [sprintId]: !prev[sprintId],
          }));
     };

     return (
          <div className="container-fluid py-4">
               <h2 className="mb-4">
                    <div className="d-flex align-items-center justify-content-between">
                         {/* Project name nằm bên trái */}
                         <small className="mb-0">Backlog</small>

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

               {isCreatedFormVisible && (
                    <div className="created-form mb-3">
                         <div className="input-group">
                              <input
                                   type="text"
                                   className="form-control form-control-sm"
                                   placeholder="Add new sprint/task"
                                   value={newTask}
                                   onChange={(e) => setNewTask(e.target.value)}
                              />
                              <button className="btn btn-primary btn-sm" onClick={() => handleAddTask('FE-0001')}>
                                   Add Task
                              </button>
                         </div>
                    </div>
               )}

               <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="unassignTasks">
                         {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef} className="list-group mb-4">
                                   <h4>Unassigned Tasks</h4>
                                   {taskNotWorkTime?.map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                             {(provided) => (
                                                  <div
                                                       {...provided.draggableProps}
                                                       {...provided.dragHandleProps}
                                                       ref={provided.innerRef}
                                                       className="d-flex align-items-center py-2 border-bottom">
                                                       <div className="me-auto">{task?.task_name}</div>
                                                  </div>
                                             )}
                                        </Draggable>
                                   ))}
                                   {provided.placeholder}
                              </div>
                         )}
                    </Droppable>

                    {sprints?.map((sprint) => (
                         <Droppable key={sprint.id} droppableId={sprint.id}>
                              {(provided) => (
                                   <div {...provided.droppableProps} ref={provided.innerRef} className="list-group mb-4">
                                        <h4>{sprint.dateRange}</h4>
                                        {sprint.tasks?.map((task, index) => ( 
                                             <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                  {(provided) => (
                                                       <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            className="d-flex align-items-center py-2 border-bottom">
                                                            <div className="me-auto">{task?.task_name}</div>
                                                            {
                                                                 console.log(task)
                                                            }
                                                       </div>
                                                  )}
                                             </Draggable>
                                        ))}
                                        {provided.placeholder}
                                   </div>
                              )}
                         </Droppable>
                    ))}
               </DragDropContext>
          </div>
     );
}
