import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import styled from 'styled-components';
import BarChartComponent from './BarChartComponent';
import WorktimesDashboardComponent from './WorktimesDashboardComponent';
import UserStatistics from './UserWorkComponent';
import { getAllUsers } from '../../../services/usersService';
import { getAllRoles } from '../../../services/rolesService';
import { getProjects } from '../../../services/dashboardService';
import { getUserAssignedTasks } from '../../../services/dashboardService';
import { getAllWorktimes } from '../../../services/worktimeService';
import { getDepartments } from '../../../services/dashboardService';
import { useTranslation } from 'react-i18next';
import { getTaskCountsByStatusGrouped, getTotalTaskTime } from '../../../services/dashboardService';
const role = localStorage.getItem('role');

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
     const { t } = useTranslation();
     const [openProjects, setOpenProjects] = useState({});
     const [openDepartments, setOpenDepartments] = useState({});
     const chartRef = useRef(null);
     const [chartData, setChartData] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          async function fetchDataTotalTaskTime() {
               try {
                    const response = await getTotalTaskTime();
                    setChartData(response.projects_task_time);
                    setLoading(false);
               } catch (error) {
                    console.error('Lỗi khi fetch dữ liệu:', error);
                    setLoading(false);
               }
          }
          fetchDataTotalTaskTime();
     }, []);

     useEffect(() => {
          if (!chartData.length || !chartRef.current) return;

          const ctx = chartRef.current.getContext('2d');

          const myChart = new Chart(ctx, {
               type: 'bar',
               data: {
                    labels: chartData.map((project) => project.project_name),
                    datasets: [
                         {
                              label: 'Tổng Giờ Thực Hiện',
                              data: chartData.map((project) => project.total_task_time),
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
     }, [chartData]);

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

     const role = localStorage.getItem('role');
     const isAdminOrManager = role === 'Admin' || role === 'Manager';
     const isStaff = role === 'Staff';

     const [showUserInfo, setShowUserInfo] = useState({ admin: false });
     const [users, setUsers] = useState([]);
     const [roles, setRoles] = useState([]);
     const [projects, setProjects] = useState([]);
     const [projectsCount, setProjectsCount] = useState(0);
     const [tasks, setTasks] = useState([]);
     const [tasksCount, setTasksCount] = useState(0);
     const [worktimes, setWorktimes] = useState([]);
     const [departments, setDepartments] = useState([]);
     const [departmentsCount, setDepartmentsCount] = useState(0);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    // Chỉ gọi API getAllUsers và getAllRoles nếu không phải role Staff
                    if (isAdminOrManager) {
                         const usersData = await getAllUsers();
                         const rolesData = await getAllRoles();
                         setUsers(usersData);
                         setRoles(rolesData);
                    }

                    const projectsData = await getProjects();
                    const tasksData = await getUserAssignedTasks();
                    const worktimesData = await getAllWorktimes();
                    const departmentsData = await getDepartments();

                    setProjects(projectsData.projects);
                    setProjectsCount(projectsData.total_projects);
                    setTasks(tasksData.tasks);
                    setTasksCount(tasksData.total_assigned_tasks);
                    setWorktimes(worktimesData);
                    setDepartments(departmentsData.departments);
                    setDepartmentsCount(departmentsData.total_departments);
               } catch (error) {
                    console.error('Failed to fetch data:', error);
               }
          };

          fetchData();
     }, [isAdminOrManager]);

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

     const role1Count = users.filter((user) => user.role_id === 1).length;
     const otherRolesCount = users.filter((user) => user.role_id !== 1).length;

     const statusTranslation = {
          'to do': t('Not yet implemented'),
          'in progress': t('Ongoing'),
          preview: t('Complete'),
          done: t('Destroy'),
     };

     if (loading) {
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', marginTop: '-70px' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">{t('Loading...')}</span>
                    </div>
               </div>
          );
     }
     return (
          <MainContainer>
               <Header>
                    <Title>{t('Dashboard')}</Title>
               </Header>
               <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                    {/* Card 1 - Website Administration */}
                    {isAdminOrManager && (
                         <div className="col-12 col-md-6 col-lg-4">
                              <Card>
                                   <CardHeader>
                                        <div>
                                             <Number>{role1Count}</Number>
                                             <Label>{t('Website administration')}</Label>
                                        </div>
                                        <div>
                                             <Icon className="bi bi-house-door text-success" />
                                        </div>
                                   </CardHeader>
                                   <CardBody>
                                        <ShowInfoLink href="#" onClick={() => handleShowInfoClick('admin')}>
                                             {showUserInfo['admin'] ? t('Hide Info') : t('Show info')}
                                        </ShowInfoLink>
                                   </CardBody>
                              </Card>
                         </div>
                    )}

                    {/* Card 2 - User */}
                    {isAdminOrManager && (
                         <div className="col-12 col-md-6 col-lg-4">
                              <Card>
                                   <CardHeader>
                                        <div>
                                             <Number>{otherRolesCount}</Number>
                                             <Label>{t('User')}</Label>
                                        </div>
                                        <div>
                                             <Icon className="bi bi-person text-warning" />
                                        </div>
                                   </CardHeader>
                                   <CardBody>
                                        <ShowInfoLink href="#" onClick={() => handleShowInfoClick('others')}>
                                             {showUserInfo['others'] ? t('Hide Info') : t('Show info')}
                                        </ShowInfoLink>
                                   </CardBody>
                              </Card>
                         </div>
                    )}

                    {/* Card 3 - Projects */}
                    {(isAdminOrManager || isStaff) && (
                         <div className="col-12 col-md-6 col-lg-4">
                              <Card>
                                   <CardHeader>
                                        <div>
                                             <Number>{projectsCount}</Number>
                                             <Label>{t('Projects')}</Label>
                                        </div>
                                        <div>
                                             <Icon className="bi bi-briefcase text-info" />
                                        </div>
                                   </CardHeader>
                                   <CardBody>
                                        <ShowInfoLink href="#" onClick={() => handleShowInfoClick('projects')}>
                                             {showUserInfo['projects'] ? t('Hide Info') : t('Show info')}
                                        </ShowInfoLink>
                                   </CardBody>
                              </Card>
                         </div>
                    )}

                    {/* Card 4 - Tasks */}
                    {(isAdminOrManager || isStaff) && (
                         <div className="col-12 col-md-6 col-lg-4">
                              <Card>
                                   <CardHeader>
                                        <div>
                                             <Number>{tasksCount}</Number>
                                             <Label>{t('Tasks')}</Label>
                                        </div>
                                        <div>
                                             <Icon className="bi bi-list-check text-danger" />
                                        </div>
                                   </CardHeader>
                                   <CardBody>
                                        <ShowInfoLink href="#" onClick={() => handleShowInfoClick('tasks')}>
                                             {showUserInfo['tasks'] ? t('Hide Info') : t('Show info')}
                                        </ShowInfoLink>
                                   </CardBody>
                              </Card>
                         </div>
                    )}

                    {/* Card 5 - Departments */}
                    {(isAdminOrManager || isStaff) && (
                         <div className="col-12 col-md-6 col-lg-4">
                              <Card>
                                   <CardHeader>
                                        <div>
                                             <Number>{departmentsCount}</Number>
                                             <Label>{t('Departments')}</Label>
                                        </div>
                                        <div>
                                             <Icon className="bi bi-building text-primary" />
                                        </div>
                                   </CardHeader>
                                   <CardBody>
                                        <ShowInfoLink href="#" onClick={() => handleShowInfoClick('departments')}>
                                             {showUserInfo['departments'] ? t('Hide Info') : t('Show info')}
                                        </ShowInfoLink>
                                   </CardBody>
                              </Card>
                         </div>
                    )}
               </div>
               {/* admin */}
               {showUserInfo['admin'] && role1Count > 0 && (
                    <div className="table-responsive mt-3">
                         <table className="table table-bordered table-hover table-striped">
                              <thead className="table-light">
                                   <tr>
                                        <th>STT</th>
                                        <th>{t('Full Name')}</th>
                                        <th>{t('Email')}</th>
                                        <th>{t('Role')}</th>
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
                                        <th>{t('Full Name')}</th>
                                        <th>{t('Email')}</th>
                                        <th>{t('Role')}</th>
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
                                        <th>{t('Project Name')}</th>
                                        <th>{t('Status')}</th>
                                        <th>{t('User ID')}</th>
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
                                                       {statusTranslation[project.status]}
                                                  </span>
                                             </td>
                                             <td>{project.user}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}
               {/* Tasks Table */}
               {showUserInfo['tasks'] && (
                    <div className="table-responsive mt-3" style={{ maxHeight: '300px', overflowY: 'auto', display: 'block', height: '300px' }}>
                         <table className="table table-bordered table-hover table-striped">
                              <thead className="table-light">
                                   <tr>
                                        <th>STT</th>
                                        <th>{t('Task Name')}</th>
                                        <th>{t('Status')}</th>
                                        <th>{t('Worktimes')}</th>
                                        <th>{t('Projects')}</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {tasks.map((task, index) => (
                                        <tr key={task.id}>
                                             <td>{index + 1}</td>
                                             <td title={task.task_name}>
                                                  {task.task_name.length > 30 ? `${task.task_name.slice(0, 30)}...` : task.task_name}
                                             </td>
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
                                                       {t(`${task.status.replace(' ', '_')}`)}
                                                  </span>
                                             </td>
                                             <td title={task.worktime_name}>
                                                  {task.worktime_name.length > 30 ? `${task.worktime_name.slice(0, 30)}...` : task.worktime_name}
                                             </td>
                                             <td title={task.project_name}>
                                                  {task.project_name.length > 30 ? `${task.project_name.slice(0, 30)}...` : task.project_name}
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}
               {/* Departments Table */}
               {showUserInfo['departments'] && (
                    <div className="table-responsive mt-3">
                         <table className="table table-bordered table-hover table-striped">
                              <thead className="table-light">
                                   <tr>
                                        <th>STT</th>
                                        <th>{t('Department Name')}</th>
                                        <th>{t('Description')}</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {departments.map((department, index) => (
                                        <tr key={department.id}>
                                             <td>{index + 1}</td>
                                             <td>{department.department_name}</td>
                                             <td>{department.description}</td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}
               <div className="mt-4">
                    <Title>{t('Statistics Total Hours Executed')}</Title>
                    <Row>
                         <div className="col-md-6">
                              <BarChartComponent />
                         </div>
                         <div className="col-md-6">
                              <canvas ref={chartRef} className="ms-10" />
                         </div>
                    </Row>
               </div>
               <div className="mt-4">
                    <UserStatistics />
               </div>
               <div className="mt-4">
                    <WorktimesDashboardComponent />
               </div>
          </MainContainer>
     );
};
// 1
