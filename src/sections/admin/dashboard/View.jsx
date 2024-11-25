import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import styled from 'styled-components';
import BarChartComponent from './BarChartComponent';
import { getAllUsers } from '../../../services/usersService';
import { getAllRoles } from '../../../services/rolesService';
import { getAllProjects } from '../../../services/projectsService';
import { getAllTasks } from '../../../services/tasksService';
import { getAllWorktimes } from '../../../services/worktimeService';
import { getAllDepartments } from '../../../services/deparmentsService';
import { getAllActivityLogs } from '../../../services/activityService';

const MainContainer = styled.main`
     padding: 2rem;
`;

const Header = styled.div`
     display: flex;
     justify-content: space-between;
     flex-wrap: wrap;
     flex-direction: row;
     align-items: center;
     padding-top: 1rem;
     padding-bottom: 1rem;
     margin-bottom: 1rem;
     border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
     font-size: 1.5rem;
`;

const ButtonGroup = styled.div`
     display: flex;
     gap: 1rem;
`;

const Button = styled.button`
     background: #17a2b8;
     color: white;
     border: none;
     padding: 0.375rem 0.75rem;
     font-size: 0.875rem;
     cursor: pointer;
     &:hover {
          background: #138496;
     }
`;

const DropdownButton = styled.button`
     background: #28a745;
     color: white;
     border: none;
     padding: 0.375rem 0.75rem;
     font-size: 0.875rem;
     cursor: pointer;
     &:hover {
          background: #218838;
     }
     margin-left: 10px;
`;

const Card = styled.div`
     background-color: #e6f2fd;
     border-radius: 10px;
     padding: 20px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
`;

const CardHeader = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     width: 100%;
`;

const CardBody = styled.div`
     margin-top: 20px;
     text-align: center;
`;

const Icon = styled.i`
     font-size: 2rem;
`;

const Number = styled.h2`
     color: #007bff;
     font-size: 2rem;
`;

const Label = styled.span`
     color: #6c757d;
     font-size: 1rem;
`;

const ShowInfoLink = styled.a`
     text-decoration: none;
     color: #007bff;
     &:hover {
          text-decoration: underline;
     }
`;

const Row = styled.div`
     display: flex;
     justify-content: center;
     flex-wrap: wrap;
`;

const DateRangePicker = styled.div`
     .dropdown-menu {
          padding: 1rem;
     }

     .form-control {
          margin-bottom: 0.5rem;
     }
`;

export const View = () => {
     const taskData = [
          {
               name: 'Dự Án Alpha1',
               completed: 15,
               ongoing: 7,
               overdue: 2,
               tasks: [
                    { id: '001', title: 'Nhiệm vụ A', date: '01/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn A', status: 'Đang Thực Hiện' },
                    { id: '002', title: 'Nhiệm vụ B', date: '02/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn B', status: 'Hoàn Thành' },
               ],
          },
          {
               name: 'Dự Án Alpha2',
               completed: 15,
               ongoing: 7,
               overdue: 2,
               tasks: [
                    { id: '001', title: 'Nhiệm vụ A', date: '01/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn A', status: 'Đang Thực Hiện' },
                    { id: '002', title: 'Nhiệm vụ B', date: '02/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn B', status: 'Hoàn Thành' },
               ],
          },
          {
               name: 'Dự Án Alpha1',
               completed: 15,
               ongoing: 7,
               overdue: 2,
               tasks: [
                    { id: '001', title: 'Nhiệm vụ A', date: '01/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn A', status: 'Đang Thực Hiện' },
                    { id: '002', title: 'Nhiệm vụ B', date: '02/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn B', status: 'Hoàn Thành' },
               ],
          },
          {
               name: 'Dự Án Alpha2',
               completed: 15,
               ongoing: 7,
               overdue: 2,
               tasks: [
                    { id: '001', title: 'Nhiệm vụ A', date: '01/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn A', status: 'Đang Thực Hiện' },
                    { id: '002', title: 'Nhiệm vụ B', date: '02/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn B', status: 'Hoàn Thành' },
               ],
          },
          {
               name: 'Dự Án Alpha1',
               completed: 15,
               ongoing: 7,
               overdue: 2,
               tasks: [
                    { id: '001', title: 'Nhiệm vụ A', date: '01/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn A', status: 'Đang Thực Hiện' },
                    { id: '002', title: 'Nhiệm vụ B', date: '02/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn B', status: 'Hoàn Thành' },
               ],
          },
          {
               name: 'Dự Án Alpha2',
               completed: 15,
               ongoing: 7,
               overdue: 2,
               tasks: [
                    { id: '001', title: 'Nhiệm vụ A', date: '01/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn A', status: 'Đang Thực Hiện' },
                    { id: '002', title: 'Nhiệm vụ B', date: '02/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn B', status: 'Hoàn Thành' },
               ],
          },
     ];
     const [openProjects, setOpenProjects] = useState({});
     const [openDepartments, setOpenDepartments] = useState({});
     const chartRef = useRef(null);

     useEffect(() => {
          const ctx = chartRef.current.getContext('2d');
          const myChart = new Chart(ctx, {
               type: 'bar',
               data: {
                    labels: taskData.map((project) => project.name),
                    datasets: [
                         {
                              label: 'Giờ Thực Hiện',
                              data: taskData.map((project) => project.completed + project.ongoing + project.overdue),
                              backgroundColor: '#007bff',
                              borderColor: '#0056b3',
                              borderWidth: 1,
                         },
                    ],
               },
               options: {
                    responsive: true,
                    plugins: {
                         legend: { position: 'top' },
                         title: { display: true, text: 'Tổng Giờ Thực Hiện Theo Dự Án' },
                    },
               },
          });

          return () => {
               myChart.destroy();
          };
     }, [taskData]);

     const handleDateRangeApply = () => {
          const startDate = document.getElementById('startDate').value;
          const endDate = document.getElementById('endDate').value;
          console.log('Đã chọn khoảng thời gian từ ' + startDate + ' đến ' + endDate);
     };

     const toggleProject = (index) => {
          setOpenProjects((prev) => ({ ...prev, [index]: !prev[index] }));
     };

     const toggleDepartment = (index) => {
          setOpenDepartments((prev) => ({ ...prev, [index]: !prev[index] }));
     };

     const [showUserInfo, setShowUserInfo] = useState({ admin: false });
     const [users, setUsers] = useState([]);
     const [roles, setRoles] = useState([]);
     const [projects, setProjects] = useState([]);
     const [tasks, setTasks] = useState([]);
     const [worktimes, setWorktimes] = useState([]);
     const [departments, setDepartments] = useState([]);
     const [activitys, setActivitys] = useState([]);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const usersData = await getAllUsers();
                    const rolesData = await getAllRoles();
                    const projectsData = await getAllProjects();
                    const tasksData = await getAllTasks();
                    const worktimesData = await getAllWorktimes();
                    const departmentsData = await getAllDepartments();
                    const activityData = await getAllActivityLogs();

                    setUsers(usersData);
                    setRoles(rolesData);
                    setProjects(projectsData);
                    setTasks(tasksData);
                    setWorktimes(worktimesData);
                    setDepartments(departmentsData);
                    setActivitys(activityData);
               } catch (error) {
                    console.error('Failed to fetch data:', error);
               }
          };

          fetchData();
     }, []);

     const handleShowInfoClick = (id) => {
          setShowUserInfo((prevState) => ({
               ...prevState,
               [id]: !prevState[id],
          }));
     };

     const getRoleName = (roleId) => {
          const role = roles.find((role) => role.id === roleId);
          return role ? role.name : 'N/A';
     };

     // users
     const role1Count = users.filter((user) => user.role_id === 1).length;
     const otherRolesCount = users.filter((user) => user.role_id !== 1).length;

     // project
     const projectsCount = projects.length;

     //task
     const tasksCount = tasks.length;

     // Hàm lấy tên của worktime dựa trên worktime_id
     const getWorktimeName = (worktimeId) => {
          const worktime = worktimes.find((wt) => wt.id === worktimeId);
          return worktime ? worktime.name : 'N/A';
     };

     // Hàm lấy tên của project dựa trên project_id
     const getProjectName = (projectId) => {
          const project = projects.find((proj) => proj.id === projectId);
          return project ? project.project_name : 'N/A';
     };

     // department
     const departmentsCount = departments.length;

     //  activity
     const activityCount = activitys.length;

     return (
          <MainContainer>
               <Header>
                    <Title>Dashboard</Title>
                    <div className="btn-toolbar mb-2 mb-md-0">
                         <ButtonGroup>
                              <Button>Share</Button>
                              <Button>Export</Button>
                              <DropdownButton data-bs-toggle="dropdown" aria-expanded="false">
                                   <i className="bi bi-calendar"></i> Chọn khoảng thời gian
                              </DropdownButton>
                              <DateRangePicker>
                                   <div className="dropdown-menu" id="dateRangePicker">
                                        <label htmlFor="startDate">Từ ngày:</label>
                                        <input type="date" id="startDate" className="form-control mb-2" />
                                        <label htmlFor="endDate">Đến ngày:</label>
                                        <input type="date" id="endDate" className="form-control mb-2" />
                                        <button type="button" className="btn btn-primary" onClick={handleDateRangeApply}>
                                             Áp dụng
                                        </button>
                                   </div>
                              </DateRangePicker>
                         </ButtonGroup>
                    </div>
               </Header>
               <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                    {/* Card 1 */}
                    <div className="col-12 col-md-6 col-lg-4">
                         <Card>
                              <CardHeader>
                                   <div>
                                        <Number>{role1Count}</Number>
                                        <Label>Quản trị website</Label>
                                   </div>
                                   <div>
                                        <Icon className="bi bi-house-door text-success" />
                                   </div>
                              </CardHeader>
                              <CardBody>
                                   <ShowInfoLink href="#" onClick={() => handleShowInfoClick('admin')}>
                                        {showUserInfo['admin'] ? 'Ẩn thông tin' : 'Show info'}
                                   </ShowInfoLink>
                              </CardBody>
                         </Card>
                    </div>

                    {/* Card 2 */}
                    <div className="col-12 col-md-6 col-lg-4">
                         <Card>
                              <CardHeader>
                                   <div>
                                        <Number>{otherRolesCount}</Number>
                                        <Label>Người dùng</Label>
                                   </div>
                                   <div>
                                        <Icon className="bi bi-person text-warning" />
                                   </div>
                              </CardHeader>
                              <CardBody>
                                   <ShowInfoLink href="#" onClick={() => handleShowInfoClick('others')}>
                                        {showUserInfo['others'] ? 'Ẩn thông tin' : 'Show info'}
                                   </ShowInfoLink>
                              </CardBody>
                         </Card>
                    </div>
                    {/* Card 3 */}
                    <div className="col-12 col-md-6 col-lg-4">
                         <Card>
                              <CardHeader>
                                   <div>
                                        <Number>{projectsCount}</Number>
                                        <Label>Dự án</Label>
                                   </div>
                                   <div>
                                        <Icon className="bi bi-briefcase text-info" />
                                   </div>
                              </CardHeader>
                              <CardBody>
                                   <ShowInfoLink href="#" onClick={() => handleShowInfoClick('projects')}>
                                        {showUserInfo['projects'] ? 'Ẩn thông tin' : 'Show info'}
                                   </ShowInfoLink>
                              </CardBody>
                         </Card>
                    </div>
                    {/* Card 4 */}
                    <div className="col-12 col-md-6 col-lg-4">
                         <Card>
                              <CardHeader>
                                   <div>
                                        <Number>{tasksCount}</Number>
                                        <Label>Nhiệm vụ</Label>
                                   </div>
                                   <div>
                                        <Icon className="bi bi-list-check text-danger" />
                                   </div>
                              </CardHeader>
                              <CardBody>
                                   <ShowInfoLink href="#" onClick={() => handleShowInfoClick('tasks')}>
                                        {showUserInfo['tasks'] ? 'Ẩn thông tin' : 'Show info'}
                                   </ShowInfoLink>
                              </CardBody>
                         </Card>
                    </div>
                    {/* Card 5 */}
                    <div className="col-12 col-md-6 col-lg-4">
                         <Card>
                              <CardHeader>
                                   <div>
                                        <Number>{departmentsCount}</Number>
                                        <Label>Phòng ban</Label>
                                   </div>
                                   <div>
                                        <Icon className="bi bi-building text-primary" />
                                   </div>
                              </CardHeader>
                              <CardBody>
                                   <ShowInfoLink href="#" onClick={() => handleShowInfoClick('departments')}>
                                        {showUserInfo['departments'] ? 'Ẩn thông tin' : 'Show info'}
                                   </ShowInfoLink>
                              </CardBody>
                         </Card>
                    </div>
                    {/* Card 6 */}
                    <div className="col-12 col-md-6 col-lg-4">
                         <Card>
                              <CardHeader>
                                   <div>
                                        <Number>{activityCount}</Number>
                                        <Label>Lịch sử hoạt động</Label>
                                   </div>
                                   <div>
                                        <Icon className="bi bi-clock-history text-success" />
                                   </div>
                              </CardHeader>
                              <CardBody>
                                   <ShowInfoLink href="#" onClick={() => handleShowInfoClick('activitys')}>
                                        {showUserInfo['activitys'] ? 'Ẩn thông tin' : 'Show info'}
                                   </ShowInfoLink>
                              </CardBody>
                         </Card>
                    </div>
               </div>
               {/* admin */}
               {showUserInfo['admin'] && role1Count > 0 && (
                    <div className="table-responsive mt-3">
                         <table className="table table-bordered table-hover table-striped">
                              <thead className="table-light">
                                   <tr>
                                        <th>STT</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {users
                                        .filter((user) => user.role_id === 1)
                                        .map((user, index) => (
                                             <tr key={user.id}>
                                                  <td>{index + 1}</td>
                                                  <td>{user.fullname}</td>
                                                  <td>{user.email}</td>
                                                  <td>{getRoleName(user.role_id)}</td>
                                             </tr>
                                        ))}
                              </tbody>
                         </table>
                    </div>
               )}
               {/* orther users */}
               {showUserInfo['others'] && (
                    <div className="table-responsive mt-3">
                         <table className="table table-bordered table-hover table-striped">
                              <thead className="table-light">
                                   <tr>
                                        <th>STT</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {users
                                        .filter((user) => user.role_id !== 1)
                                        .map((user, index) => (
                                             <tr key={user.id}>
                                                  <td>{index + 1}</td>
                                                  <td>{user.fullname}</td>
                                                  <td>{user.email}</td>
                                                  <td>{getRoleName(user.role_id)}</td>
                                             </tr>
                                        ))}
                              </tbody>
                         </table>
                    </div>
               )}
               {/* project */}
               {showUserInfo['projects'] && (
                    <div className="table-responsive mt-3">
                         <table className="table table-bordered table-hover table-striped">
                              <thead className="table-light">
                                   <tr>
                                        <th>STT</th>
                                        <th>Project Name</th>
                                        <th>Status</th>
                                        <th>User ID</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {projects.map((project, index) => (
                                        <tr key={project.id}>
                                             <td>{index + 1}</td>
                                             <td>{project.project_name}</td>
                                             <td>
                                                  <span
                                                       className={`badge ${
                                                            {
                                                                 'to do': 'bg-secondary',
                                                                 'in progress': 'bg-warning text-dark',
                                                                 preview: 'bg-info text-dark',
                                                                 done: 'bg-success',
                                                            }[project.status]
                                                       } d-flex justify-content-center`}>
                                                       {project.status.replace(' ', '_')}
                                                  </span>
                                             </td>
                                             <td>{users.find((user) => user.id === project.user_id)?.fullname || 'N/A'}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}
               {/* Tassk */}
               {showUserInfo['tasks'] && (
                    <div className="table-responsive mt-3">
                         <table className="table table-bordered table-hover table-striped">
                              <thead className="table-light">
                                   <tr>
                                        <th>STT</th>
                                        <th>Task Name</th>
                                        <th>Status</th>
                                        <th>Worktime</th>
                                        <th>Project</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {tasks.map((task, index) => (
                                        <tr key={task.id}>
                                             <td>{index + 1}</td>
                                             <td>{task.task_name}</td>
                                             <td>
                                                  <span
                                                       className={`badge ${
                                                            {
                                                                 'to do': 'bg-secondary',
                                                                 'in progress': 'bg-warning text-dark',
                                                                 preview: 'bg-info text-dark',
                                                                 done: 'bg-success',
                                                            }[task.status]
                                                       } d-flex justify-content-center`}>
                                                       {task.status.replace(' ', '_')}
                                                  </span>
                                             </td>
                                             <td>{getWorktimeName(task.worktime_id)}</td>
                                             <td>{getProjectName(task.project_id)}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}
               {/* department */}
               {showUserInfo['departments'] && (
                    <div className="table-responsive mt-3">
                         <table className="table table-bordered table-hover table-striped">
                              <thead className="table-light">
                                   <tr>
                                        <th className="col-3">STT</th>
                                        <th>Department Name</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {departments.map((department, index) => (
                                        <tr key={department.id}>
                                             <td>{index + 1}</td>
                                             <td>{department.department_name}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}
               {/* activity */}
               {showUserInfo['activitys'] && (
                    <div className="table-responsive mt-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                         <table className="table table-bordered table-hover table-striped">
                              <thead className="table-light">
                                   <tr>
                                        <th className="col-1">STT</th>
                                        <th className="col-2">User ID</th>
                                        <th className="col-2">Action</th>
                                        <th className="col-2">Loggable ID</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {activitys.map((activity, index) => {
                                        const user = users.find((user) => user.id === activity.user_id);
                                        return (
                                             <tr key={activity.id}>
                                                  <td>{index + 1}</td>
                                                  <td>{user ? user.fullname : 'N/A'}</td> <td>{activity.action}</td>
                                                  <td>{activity.created_at}</td>
                                             </tr>
                                        );
                                   })}
                              </tbody>
                         </table>
                    </div>
               )}
               <div className="mt-4">
                    <h3 className="">Thống kê Tổng Giờ Thực Hiện</h3>
                    <Row>
                         <div className="col-md-6">
                              <BarChartComponent />
                         </div>
                         <div className="col-md-6">
                              <canvas ref={chartRef} className="ms-10" />
                         </div>
                    </Row>
               </div>
          </MainContainer>
     );
};
