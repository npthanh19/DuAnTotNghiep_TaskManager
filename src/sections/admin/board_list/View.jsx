import React, { useEffect, useState } from 'react';
import './board_log.css';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getAllWorktimes } from '../../../services/worktimeService';
import { getAllProjects } from '../../../services/projectsService';
import {
     getAllTasks,
     getTasksByWorktimeId,
     getTaskWithoutWorktime,
     updateLocationTask,
     updateTaskStatus,
     updateWorktimeTask,
} from '../../../services/tasksService';
import { v4 as uuidv4 } from 'uuid';
import { getAllDepartments } from '../../../services/deparmentsService';
import { useTranslation } from 'react-i18next';
import { getAllAssignments } from '../../../services/assignmentService';
export function View() {
     const [newTask, setNewTask] = useState('');
     const [isCreatedFormVisible, setIsCreatedFormVisible] = useState(false);
     const [showDropdown, setShowDropdown] = useState(false);
     const [selectedUsers, setSelectedUsers] = useState([]);
     const [projects, setProjects] = useState([]);
     const [departments, setDepartments] = useState([]);
     const [sprints, setSprints] = useState();
     const [taskNotWorkTime, setTaskNotWorkTime] = useState();
     const [isInputVisible, setIsInputVisible] = useState({});
     const [members, setMembers] = useState();
      const [loading, setLoading] = useState(true);
     const [selectedProject, setSelectedProject] = useState('');
     const [filteredTasks, setFilteredTasks] = useState([]);
     const [filteredSprints, setFilteredSprints] = useState([]);
     const [searchQuery, setSearchQuery] = useState('');
     const uniqueMembers = [];
     const memberIds = new Set();

     const { t } = useTranslation();
     const users = [
          { id: 1, name: 'User 1', avatar: '/assets/admin/img/avatars/1.png' },
          { id: 2, name: 'User 2', avatar: '/assets/admin/img/avatars/2.png' },
          { id: 3, name: 'User 3', avatar: '/assets/admin/img/avatars/3.png' },
     ];
     const handleUserChange = (event, member) => {
          if (event.target.checked) {
               setSelectedUsers([...selectedUsers, member.user.id]);
          } else {
               setSelectedUsers(selectedUsers.filter((userId) => userId !== member.user.id));
          }
     };

     const handleProjectChange = (e) => {
          setSelectedProject(e.target.value);
     };

     const handleResetFilter = () => {
          setSelectedUsers([]);
          setSelectedProject('');
     };

     useEffect(() => {
          console.log('selectedUsers', selectedUsers);

          const filterTasks = () => {
               return taskNotWorkTime?.filter((task) => {
                    const isUserMatched = selectedUsers.length > 0 ? task.assigned_users.some((user) => selectedUsers.includes(user.user_id)) : true;

                    const isProjectMatched = selectedProject ? task.project_id.toString() === selectedProject : true;

                    const isSearchMatched = task?.task_name.toLowerCase().includes(searchQuery.toLowerCase());

                    return isUserMatched && isProjectMatched && isSearchMatched;
               });
          };

          const filterSprints = () => {
               return sprints?.map((sprint) => ({
                    ...sprint,
                    tasks: sprint.tasks.filter((task) => {
                         const isUserMatched =
                              selectedUsers.length > 0 ? task.assigned_users.some((user) => selectedUsers.includes(user.user_id)) : true;

                         const isProjectMatched = selectedProject ? task.project_id.toString() === selectedProject : true;

                         const isSearchMatched = task?.task_name.toLowerCase().includes(searchQuery.toLowerCase());

                         return isUserMatched && isProjectMatched && isSearchMatched;
                    }),
               }));
          };

          setFilteredTasks(filterTasks());
          setFilteredSprints(filterSprints());
     }, [selectedUsers, selectedProject, taskNotWorkTime, sprints]);

     useEffect(() => {
          const fetchMember = async () => {
               try {
                    const fetchMember = await getAllAssignments();
                    setMembers(fetchMember);
               } catch (error) {
                    console.error('Error fetching projects:', error);
               }
          };
          fetchMember();
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
                         const status = worktime.status;

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
                              status,
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
                    console.log('tasks --', tasks);
                    setTaskNotWorkTime(tasks);
               } catch (error) {
                    console.error('Error fetching tasks without worktime:', error);
               }
          };

          fetchWorkTimes();
          fetchTask();
     }, []);

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

     const handleStatusChange = async (taskId, status) => {
          let dataMapping;
          if (status === 'to do') dataMapping = 1;
          if (status === 'in progress') dataMapping = 2;
          if (status === 'preview') dataMapping = 3;
          if (status === 'done') dataMapping = 4;

          try {
               const updatedTask = await updateTaskStatus(taskId, dataMapping);
               console.log(`Task updated successfully:`, updatedTask);

               // Cập nhật lại danh sách sprints
               setSprints((prevSprints) =>
                    prevSprints.map((sprint) => ({
                         ...sprint,
                         tasks: sprint.tasks.map((task) => (task.id === taskId ? { ...task, status } : task)),
                    })),
               );

               // Nếu task nằm trong `taskNotWorkTime`, cập nhật nó
               setTaskNotWorkTime((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status } : task)));
          } catch (error) {
               console.error(`Failed to update task status:`, error);
          }
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
                         <small className="mb-0">{t('Backlog')}</small>
                         <div className="d-flex align-items-center small">
                              <div className="users_img d-flex align-items-center position-relative me-3">
                                   <img src={users[0].avatar} alt={users[0].name} className="user-avatar" />
                                   <span className="qty ms-2">+{users.length - 1}</span>
                                   <button className="btn btn-link btn-sm ms-2" onClick={handleToggleDropdown}>
                                        <i className="bi bi-plus-circle" />
                                   </button>

                                   {showDropdown && (
                                        <div className="dropdown-menu show" style={{ position: 'absolute', zIndex: 1000, top: '100%', left: '0' }}>
                                        {members.slice(1).map((member) => {
                                            // Kiểm tra nếu thành viên đã xuất hiện rồi, nếu chưa thì hiển thị và thêm vào Set
                                            if (!memberIds.has(member.user.id)) {
                                                memberIds.add(member.user.id);
                                                uniqueMembers.push(member);
                                            }
                                            return null; // Không render ở đây, chỉ thêm vào uniqueMembers
                                        })}
                                
                                        {uniqueMembers.map((member) => (
                                            <div key={member.id} className="dropdown-item d-flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.includes(member.user.id)} // Kiểm tra xem user đã được chọn chưa
                                                    onChange={(event) => handleUserChange(event, member)} // Gọi hàm handleUserChange khi thay đổi
                                                    className="me-2"
                                                />
                                                <img
                                                    src={
                                                        member.user.avatar
                                                            ? `${process.env.REACT_APP_BASE_URL}/avatar/${member.user.avatar}`
                                                            : 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg'
                                                    }
                                                    alt={member.user.fullname}
                                                    className="user-avatar me-2"
                                                />
                                                {member.user.fullname}
                                            </div>
                                        ))}
                                    </div>
                                   )}
                              </div>
                              <input
                                   type="text"
                                   className="form-control form-control-sm me-3"
                                   placeholder="Tìm kiếm..."
                                   style={{ width: '150px' }}
                                   value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}
                              />
                              <select
                                   className="form-select form-select-sm me-3"
                                   aria-label="Epic Dropdown"
                                   value={selectedProject}
                                   onChange={handleProjectChange}>
                                   <option value="">{t('Epic')}</option>
                                   {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                             {project.project_name}
                                        </option>
                                   ))}
                              </select>

                              {/* <select className="form-select form-select-sm me-3" aria-label="User Dropdown" onChange={handleUserChange}>
                                   <option value="">Chọn thành viên</option>
                                   {users.map((user) => (
                                        <option key={user.user_id} value={user.user_id}>
                                             {user.name}
                                        </option>
                                   ))}
                              </select> */}
                              <button className="btn btn-secondary ms-3" onClick={handleResetFilter}>
                              Reset
                              </button>
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
                                   {t('Add Tasks')}
                              </button>
                         </div>
                    </div>
               )}
               <DragDropContext onDragEnd={handleDragEnd}>
                    {filteredSprints?.map((sprint) => (
                         <Droppable key={sprint.id} droppableId={sprint.id}>
                              {(provided) => (
                                   <div {...provided.droppableProps} ref={provided.innerRef} className="list-group qtn-status mb-4">
                                        <h4>
                                             {sprint.dateRange}
                                             <div className="status">
                                                  <div className="item">
                                                       <p style={{ color: 'gray' }}>
                                                            {sprint.tasks.filter((task) => task.status === 'to do').length}
                                                       </p>
                                                       <p className="text-primary">
                                                            {sprint.tasks.filter((task) => task.status === 'in progress').length}
                                                       </p>

                                                       <p style={{ color: 'gold' }}>
                                                            {sprint.tasks.filter((task) => task.status === 'preview').length}
                                                       </p>
                                                       <p style={{ color: 'green' }}>
                                                            {sprint.tasks.filter((task) => task.status === 'done').length}
                                                       </p>
                                                  </div>
                                                  <div className="status__worktime">
                                                       {sprint?.status === 'runing'
                                                            ? 'Đang chạy'
                                                            : sprint?.status === 'not start'
                                                            ? 'Chưa bắt đầu'
                                                            : sprint?.status === 'conplete'
                                                            ? 'Hoàn thành'
                                                            : 'Không xác định'}
                                                  </div>
                                             </div>
                                        </h4>
                                        {sprint.tasks?.map((task, index) => {
                                             const project = task?.project_id ? projects.find((proj) => proj.id === task.project_id) : null;

                                             return (
                                                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                       {(provided) => (
                                                            <div
                                                                 {...provided.draggableProps}
                                                                 {...provided.dragHandleProps}
                                                                 ref={provided.innerRef}
                                                                 className="list__task-board align-items-center py-2 border-bottom">
                                                                 <div className="boardlist_name">{`${task.id} - ${task.task_name}`}</div>
                                                                 <div className="boardlist_project">{project ? project.project_name : 'N/A'}</div>
                                                                 <div className="boardlist_status">
                                                                      <select
                                                                           className="form-select"
                                                                           value={task?.status}
                                                                           onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                                                                           <option value="to do">{t('To Do')}</option>
                                                                           <option value="in progress">{t('In Progress')}</option>
                                                                           <option value="preview">{t('Preview')}</option>
                                                                           <option value="done">{t('Done')}</option>
                                                                      </select>
                                                                 </div>
                                                                 <div className="boardlist_time">{task ? task.task_time : '-'}</div>
                                                                 {/* Assigned Users */}
                                                                 <div className="assigned_users" style={{ display: 'flex', position: 'relative' }}>
                                                                      {task.assigned_users.map((user, index) => (
                                                                           <div
                                                                                key={user.user_id}
                                                                                className="assigned_user"
                                                                                style={{
                                                                                     position: 'relative',
                                                                                     display: 'inline-block',
                                                                                     marginRight: index === 0 ? '5px' : '0', // Thành viên đầu tiên có margin phải.
                                                                                     zIndex: task.assigned_users.length - index, // Thành viên sau nằm dưới.
                                                                                     marginLeft: index > 0 ? '-15px' : '0', // Avatar từ thứ hai dịch ngược lại.
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
                                                                                          border: '2px solid #fff', // Để tạo viền trắng rõ hơn giữa các avatar.
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

                                                                 <div className="bi bi-trash menu-icon boardlist_trash"></div>
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
                                   <h4>{t('Unassigned Tasks')}</h4>
                                   {filteredTasks?.map((task, index) => {
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
                                                            <div className="boardlist_status">
                                                                 <select
                                                                      className="form-select"
                                                                      value={task?.status}
                                                                      onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                                                                      <option value="to do">{t('To Do')}</option>
                                                                      <option value="in progress">{t('In Progress')}</option>
                                                                      <option value="preview">{t('Preview')}</option>
                                                                      <option value="done">{t('Done')}</option>
                                                                 </select>
                                                            </div>
                                                            <div className=" boardlist_time">{task ? task.task_time : '-'}</div>
                                                            {/* Assigned Users */}
                                                            <div className="assigned_users" style={{ display: 'flex', position: 'relative' }}>
                                                                      {task.assigned_users.map((user, index) => (
                                                                           <div
                                                                                key={user.user_id}
                                                                                className="assigned_user"
                                                                                style={{
                                                                                     position: 'relative',
                                                                                     display: 'inline-block',
                                                                                     marginRight: index === 0 ? '5px' : '0', // Thành viên đầu tiên có margin phải.
                                                                                     zIndex: task.assigned_users.length - index, // Thành viên sau nằm dưới.
                                                                                     marginLeft: index > 0 ? '-15px' : '0', // Avatar từ thứ hai dịch ngược lại.
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
                                                                                          border: '2px solid #fff', // Để tạo viền trắng rõ hơn giữa các avatar.
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
