import React, { useState } from 'react';
import './board_log.css';

export function View() {
     const [newTask, setNewTask] = useState('');
     const [isCreatedFormVisible, setIsCreatedFormVisible] = useState(false);

     const [showDropdown, setShowDropdown] = useState(false);
     const [selectedUsers, setSelectedUsers] = useState([]);

     const users = [
          { id: 1, name: 'User 1', avatar: '/assets/admin/img/avatars/1.png' },
          { id: 2, name: 'User 2', avatar: '/assets/admin/img/avatars/2.png' },
          { id: 3, name: 'User 3', avatar: '/assets/admin/img/avatars/3.png' },
     ];

     const initialSprints = [
          { id: 'FE-0001', dateRange: '26 Aug – 2 Sep', tasks: [ 
               { id: 'SCRUM-1', name: 'Cắt theme trang admin', status: 'REVIEW', assignee: '/assets/admin/img/avatars/2.png', priority: 5, completed: false }, 
               { id: 'SCRUM-2', name: 'Sửa lỗi giao diện', status: 'IN PROGRESS', assignee: '/assets/admin/img/avatars/3.png', priority: 3, completed: false }, 
               { id: 'SCRUM-3', name: 'Tối ưu hóa tốc độ tải trang', status: 'TO DO', assignee: '/assets/admin/img/avatars/1.png', priority: 4, completed: false } 
          ]},
          
          { id: 'BE-0001', dateRange: '26 Aug – 27 Aug', tasks: [ 
               { id: 'SCRUM-4', name: 'Tìm hiểu Filament', status: 'DONE', assignee: '/assets/admin/img/avatars/2.png', priority: 2, completed: false }, 
               { id: 'SCRUM-5', name: 'Cài đặt môi trường phát triển', status: 'IN PROGRESS', assignee: '/assets/admin/img/avatars/3.png', priority: 3, completed: false }, 
               { id: 'SCRUM-6', name: 'Tạo cơ sở dữ liệu cho dự án', status: 'TO DO', assignee: '/assets/admin/img/avatars/1.png', priority: 4, completed: false } 
          ]},
          
          { id: 'FE-0002', dateRange: '3 Sep – 10 Sep', tasks: [ 
               { id: 'SCRUM-7', name: 'Thiết kế giao diện người dùng', status: 'REVIEW', assignee: '/assets/admin/img/avatars/2.png', priority: 5, completed: false }, 
               { id: 'SCRUM-8', name: 'Phát triển chức năng tìm kiếm', status: 'IN PROGRESS', assignee: '/assets/admin/img/avatars/3.png', priority: 3, completed: false }, 
               { id: 'SCRUM-9', name: 'Kiểm tra bảo mật ứng dụng', status: 'TO DO', assignee: '/assets/admin/img/avatars/1.png', priority: 4, completed: false } 
          ]},
          
          { id: 'BE-0002', dateRange: '3 Sep – 4 Sep', tasks: [ 
               { id: 'SCRUM-10', name: 'Tích hợp API', status: 'DONE', assignee: '/assets/admin/img/avatars/2.png', priority: 2, completed: false }, 
               { id: 'SCRUM-11', name: 'Viết tài liệu API', status: 'IN PROGRESS', assignee: '/assets/admin/img/avatars/3.png', priority: 3, completed: false }, 
               { id: 'SCRUM-12', name: 'Xây dựng giao diện cho API', status: 'TO DO', assignee: '/assets/admin/img/avatars/1.png', priority: 4, completed: false } 
          ]}
     ];

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

     const [sprints, setSprints] = useState(initialSprints);
     const [isInputVisible, setIsInputVisible] = useState({});

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

     const handleAddTask = () => {
          console.log('New Task:', newTask);
          setNewTask('');
          setIsInputVisible(false);
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
                    <small className="d-block mb-2">Backlog</small>
                    <div className="d-flex align-items-center justify-content-between">
                         <button className="btn btn-bg-secondary" onClick={() => setIsCreatedFormVisible(!isCreatedFormVisible)}>
                              <i className="bi bi-plus-circle me-1" /> Created
                         </button>

                         <div className="d-flex align-items-center small">
                              {/* User */}
                              <div className="users_img d-flex align-items-center position-relative">
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

                              <input type="text" className="form-control form-control-sm me-3" placeholder="Search..." style={{ width: '150px' }} />
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
                              <button className="btn btn-primary btn-sm" onClick={handleAddTask}>
                                   Add Task
                              </button>
                         </div>
                    </div>
               )}

               {sprints.map((sprint) => (
                    <div key={sprint.id} className="mb-4">
                         <h4 className="mb-3 d-flex align-items-center">
                              <div className="form-check me-2">
                                   <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`sprint-${sprint.id}`}
                                        onChange={(e) => handleToggleAllTasks(sprint.id, e.target.checked)}
                                   />
                              </div>
                              <span>
                                   {sprint.id} <small className="text-muted">({sprint.dateRange})</small>
                              </span>
                         </h4>

                         {sprint.tasks.map((task) => (
                              <div key={task.id} className="list-group">
                                   <div className="d-flex align-items-center py-2 border-bottom">
                                        <div className="form-check me-3">
                                             <input
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  checked={task.completed}
                                                  onChange={() => handleTaskCompletionToggle(sprint.id, task.id)}
                                             />
                                        </div>
                                        <div className="me-auto">
                                             <span className="me-2">{task.id}</span>
                                             <span>{task.name}</span>
                                        </div>
                                        <select
                                             className="form-select board-list form-select-sm me-4 select-status"
                                             value={task.status}
                                             onChange={(e) => handleStatusChange(sprint.id, task.id, e.target.value)}>
                                             <option value="TO DO">To Do</option>
                                             <option value="IN PROGRESS">In Progress</option>
                                             <option value="REVIEW">Review</option>
                                             <option value="DONE">Done</option>
                                        </select>
                                        <span className={`badge bg-${task.status === 'DONE' ? 'success' : 'primary'} me-3 status-badge`}>
                                             {task.status}
                                        </span>
                                        <span className="me-3">
                                             <span className="badge bg-secondary">{task.priority}</span>
                                        </span>
                                        <span className="me-3 user-id">
                                             <img src={task.assignee} className="w-50 rounded-circle" alt="User Avatar" />
                                        </span>
                                   </div>
                              </div>
                         ))}

                         <span className="text-muted cursor-pointer" onClick={() => toggleInputVisibility(sprint.id)}>
                              + Created
                         </span>

                         {isInputVisible[sprint.id] && (
                              <div className="input-group mt-2">
                                   <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Add a new task..."
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                   />
                                   <button className="btn btn-primary btn-sm" onClick={handleAddTask}>
                                        Add
                                   </button>
                              </div>
                         )}
                    </div>
               ))}
          </div>
     );
}