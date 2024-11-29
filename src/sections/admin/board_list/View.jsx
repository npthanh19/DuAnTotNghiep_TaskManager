import React, { useEffect, useState } from 'react';
import './board_log.css';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getAllWorktimes } from '../../../services/worktimeService';
import { getAllProjects } from '../../../services/projectsService';
import { getAllTasks, getTasksByWorktimeId, getTaskWithoutWorktime, updateLocationTask, updateWorktimeTask } from '../../../services/tasksService';
import { v4 as uuidv4 } from 'uuid';
import { getAllDepartments } from '../../../services/deparmentsService';

export function View() {
     const [newTask, setNewTask] = useState('');
     const [isCreatedFormVisible, setIsCreatedFormVisible] = useState(false);
     const [showDropdown, setShowDropdown] = useState(false);
     const [selectedUsers, setSelectedUsers] = useState([]);
     const [projects, setProjects] = useState([]);
     const [departments, setDepartments] = useState([]);
     const users = [
          { id: 1, name: 'User 1', avatar: '/assets/admin/img/avatars/1.png' },
          { id: 2, name: 'User 2', avatar: '/assets/admin/img/avatars/2.png' },
          { id: 3, name: 'User 3', avatar: '/assets/admin/img/avatars/3.png' },
     ];

     useEffect(() => {
          const fetchProjects = async () => {
               try {
                    const fetchedProjects = await getAllProjects();
                    setProjects(fetchedProjects);
               } catch (error) {
                    console.error('Error fetching projects:', error);
               }
          };

          fetchProjects();
          const fetchDepartments = async () => {
               try {
                    const fetchedDepartments = await getAllDepartments();
                    setDepartments(fetchedDepartments);
               } catch (error) {
                    console.error('Error fetching projects:', error);
               }
          };

          fetchDepartments();

          const fetchWorkTimes = async () => {
               try {
                    const worktimes = await getAllWorktimes();
                    const formattedData = worktimes.map((worktime) => {
                         const startDate = new Date(worktime.start_date);
                         const endDate = new Date(worktime.end_date);

                         const dateRange = `${startDate.toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                         })} – ${endDate.toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                         })}`;

                         return {
                              id: worktime.id.toString(),
                              dateRange,
                              tasks: [],
                         };
                    });
                    const updatedData = await Promise.all(
                         formattedData.map(async (item) => {
                              try {
                                   const taskData = await getTasksByWorktimeId(item.id);
                                   const tasks = taskData.tasks;
                                   return { ...item, tasks };
                              } catch (error) {
                                   console.error(`Error fetching tasks for Worktime ID ${item.id}:`, error);
                                   return item;
                              }
                         }),
                    );

                    setSprints(updatedData);
               } catch (error) {
                    console.error('Error fetching worktimes:', error);
               }
          };
          const fetchTasksWithProjectId = async () => {
               try {
                    const tasks = await getAllTasks(); // Lấy tất cả tasks
                    const worktimes = await getAllWorktimes(); // Lấy tất cả worktimes

                    // Mapping task với project_id
                    const tasksWithProjectId = tasks.map((task) => {
                         const worktime = worktimes.find((w) => w.id === task.worktime_id);
                         return { ...task, project_id: worktime?.project_id || null };
                    });

                    console.log('Tasks with Project ID:', tasksWithProjectId);
                    setTaskNotWorkTime(tasksWithProjectId.filter((task) => !task.worktime_id));
               } catch (error) {
                    console.error('Error fetching tasks with project ID:', error);
               }
          };

          const fetchTask = async () => {
               try {
                    // Lấy tasks không có worktime_id
                    const tasks = await getTaskWithoutWorktime();
                    console.log('tasks without worktime', tasks);
                    setTaskNotWorkTime(tasks);
               } catch (error) {
                    console.error('Error fetching tasks without worktime:', error);
               }
          };

          fetchWorkTimes();
          fetchTask();
     }, []);

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
          if (!destination) return;

          const updatedSprints = [...sprints];
          const updatedUnassignTasks = [...taskNotWorkTime];

          if (source.droppableId === 'unassignTasks') {
               const movedTask = taskNotWorkTime[source.index];
               updatedUnassignTasks.splice(source.index, 1);

               if (destination.droppableId === 'unassignTasks') {
                    updatedUnassignTasks.splice(destination.index, 0, movedTask);
               } else {
                    const destinationSprint = updatedSprints.find((sprint) => sprint.id === destination.droppableId);
                    if (destinationSprint) {
                         destinationSprint.tasks.splice(destination.index, 0, movedTask);
                    }
               }
               setTaskNotWorkTime(updatedUnassignTasks);
               setSprints(updatedSprints);
               await updateWorktimeTask(movedTask.id, destination.droppableId === 'unassignTasks' ? null : Number(destination.droppableId));
          } else {
               const sourceSprint = updatedSprints.find((sprint) => sprint.id === source.droppableId);
               const destinationSprint = updatedSprints.find((sprint) => sprint.id === destination.droppableId);

               if (sourceSprint && destinationSprint) {
                    const movedTask = sourceSprint.tasks[source.index];
                    sourceSprint.tasks.splice(source.index, 1);
                    destinationSprint.tasks.splice(destination.index, 0, movedTask);
                    setSprints(updatedSprints);
                    await updateWorktimeTask(movedTask.id, Number(destination.droppableId));
               } else if (!destinationSprint) {
                    const movedTask = sourceSprint.tasks[source.index];
                    sourceSprint.tasks.splice(source.index, 1);
                    updatedUnassignTasks.splice(destination.index, 0, movedTask);
                    setSprints(updatedSprints);
                    setTaskNotWorkTime(updatedUnassignTasks);
                    await updateWorktimeTask(movedTask.id, null);
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
                         <small className="mb-0">Backlog</small>
                         <div className="d-flex align-items-center small">
                              <div className="users_img d-flex align-items-center position-relative me-3">
                                   {/* <img src={users[0].avatar} alt={users[0].name} className="user-avatar" />
                                   <span className="qty ms-2">+{users.length - 1}</span>
                                   <button className="btn btn-link btn-sm ms-2" onClick={handleToggleDropdown}>
                                        <i className="bi bi-plus-circle" />
                                   </button> */}

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
                              <input type="text" className="form-control form-control-sm me-3" placeholder="Search..." style={{ width: '150px' }} />
                              <select className="form-select form-select-sm me-3" aria-label="Epic Dropdown">
                                   <option value="">Epic</option>
                                   {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                             {project.project_name}
                                        </option>
                                   ))}
                              </select>
                              {/* <select className="form-select form-select-sm me-3" aria-label="Label Dropdown">
                                   <option value="">Label</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                             {department.department_name}
                                        </option>
                                   ))}
                              </select> */}
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
                    {sprints?.map((sprint) => (
                         <Droppable key={sprint.id} droppableId={sprint.id}>
                              {(provided) => (
                                   <div {...provided.droppableProps} ref={provided.innerRef} className="list-group qtn-status mb-4">
                                        <h4>
                                             {sprint.dateRange}
                                             <div className="status">
                                                  <div className="item">
                                                       <p>1</p>
                                                       <p>2</p>
                                                       <p>3</p>
                                                       <p>4</p>
                                                  </div>
                                                  <div className="status__worktime">Bắt đầu</div>
                                             </div>
                                        </h4>
                                        {sprint.tasks?.map((task, index) => {
                                             // Tìm project dựa trên project_id của task
                                             const project = task?.project_id ? projects.find((proj) => proj.id === task.project_id) : null;

                                             return (
                                                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                       {(provided) => (
                                                            <div
                                                                 {...provided.draggableProps}
                                                                 {...provided.dragHandleProps}
                                                                 ref={provided.innerRef}
                                                                 className="list__task-board align-items-center py-2 border-bottom">
                                                                 <div className=" boardlist_name">{`${task.id} - ${task.task_name}`}</div>
                                                                 <div className=" boardlist_project">{project ? project.project_name : 'N/A'}</div>
                                                                 <div className=" boardlist_status">{`${task.status}`}</div>
                                                                 <div className="boardlist_time">{task?.task_time || '-'}</div>
                                                                 <div className="">
                                                                      <img
                                                                           src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                                                                           alt=""
                                                                           style={{ width: '50px' }}
                                                                      />
                                                                 </div>
                                                                 <div className=" bi bi-trash menu-icon boardlist_trash"></div>
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
                    <Droppable droppableId="unassignTasks">
                         {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef} className="list-group mb-4">
                                   <h4>Unassigned Tasks</h4>
                                   {taskNotWorkTime?.map((task, index) => {
                                        const project = task?.project_id ? projects.find((proj) => proj.id === task.project_id) : null;

                                        return (
                                             <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                  {(provided) => (
                                                       <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            className="list__task-board align-items-center py-2 border-bottom">
                                                            <div className=" boardlist_name">{`${task.id} - ${task.task_name}`}</div>
                                                            <div className=" boardlist_project">{project ? project.project_name : 'N/A'}</div>
                                                            <div className=" boardlist_status">{`${task.status}`}</div>
                                                            <div className=" boardlist_time">1</div>
                                                            <div className="">
                                                                 <img
                                                                      src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                                                                      alt=""
                                                                      style={{ width: '50px' }}
                                                                 />
                                                            </div>

                                                            <div className=" bi bi-trash menu-icon boardlist_trash"></div>
                                                       </div>
                                                  )}
                                             </Draggable>
                                        );
                                   })}
                                   {provided.placeholder}
                              </div>
                         )}
                    </Droppable>
               </DragDropContext>
          </div>
     );
}
