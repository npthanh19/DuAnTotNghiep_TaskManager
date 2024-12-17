import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWorktimeWithTasks } from '../../../services/dashboardService';
import { FaClock } from 'react-icons/fa';

// Các styled-components
const StatsContainer = styled.div`
     max-width: 100%;
     margin: 20px auto;
     padding: 30px;
`;

const StatsHeader = styled.header`
     text-align: center;
     margin-bottom: 50px;
`;

const HeaderTitle = styled.h1`
     font-size: 2.5rem;
     font-weight: bold;
     color: #3498db;
`;

const HeaderSubtitle = styled.p`
     font-size: 1.1rem;
     color: #7f8c8d;
`;

const WorktimeStats = styled.div`
     display: flex;
     flex-wrap: wrap;
     gap: 20px;
`;

const WorktimeCard = styled.div`
     background: #fff;
     border-radius: 12px;
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
     width: calc(33.33% - 20px);
     transition: transform 0.3s ease;
     &:hover {
          transform: translateY(-5px);
     }
`;

const CardBody = styled.div`
     padding: 25px;
`;

const CardHeader = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 20px;
`;

const CardTitle = styled.h5`
     font-size: 1.25rem;
     font-weight: 600;
`;

const Badge = styled.span`
     padding: 0.5em 0.8em;
     font-size: 0.8rem;
     border-radius: 12px;
     background-color: ${(props) => (props.status === 'completed' ? '#2ecc71' : props.status === 'inProgress' ? '#f1c40f' : '#7f8c8d')};
     color: white;
`;

const TotalHours = styled.div`
     display: flex;
     align-items: center;
     margin-bottom: 20px;
`;

const ClockIcon = styled(FaClock)`
     color: #3498db;
     margin-right: 10px;
`;

const TotalHoursText = styled.span`
     font-size: 1rem;
     color: #7f8c8d;
`;

const TaskList = styled.div`
     margin-top: 15px;
`;

const TaskItem = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 10px;
     border-bottom: 1px solid #eee;
`;

const TaskName = styled.span`
     font-size: 1rem;
`;

const TaskDuration = styled.span`
     font-size: 1rem;
     background-color: #3498db;
     color: white;
     padding: 0.5em 1em;
     border-radius: 8px;
`;

const LoadingText = styled.p`
     text-align: center;
     font-size: 18px;
     color: #888;
`;

const ErrorText = styled.p`
     text-align: center;
     font-size: 18px;
     color: red;
`;

const WorktimesDashboardComponent = () => {
     const [worktimes, setWorktimes] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const data = await getWorktimeWithTasks();
                    setWorktimes(data.data || []);
               } catch (error) {
                    setError('Không thể tải dữ liệu. Vui lòng thử lại.');
               } finally {
                    setLoading(false);
               }
          };

          fetchData();
     }, []);

     return (
          <StatsContainer>
               <StatsHeader>
                    <HeaderTitle>Thống kê thời gian làm việc</HeaderTitle>
                    <HeaderSubtitle>Theo dõi và phân tích số liệu</HeaderSubtitle>
               </StatsHeader>
               <WorktimeStats>
                    {loading && <LoadingText>Đang tải dữ liệu...</LoadingText>}
                    {error && <ErrorText>{error}</ErrorText>}
                    {worktimes.length > 0 && !loading && !error
                         ? worktimes.map((worktime) => (
                                <WorktimeCard key={worktime.id_worktime}>
                                     <CardBody>
                                          <CardHeader>
                                               <CardTitle>{worktime.name}</CardTitle>
                                               <Badge status={worktime.status}>
                                                    {worktime.status === 'runing'
                                                         ? 'Đang chạy'
                                                         : worktime.status === 'not start'
                                                         ? 'Chưa bắt đầu'
                                                         : worktime.status === 'conplete'
                                                         ? 'Hoàn thành'
                                                         : 'Không xác định'}
                                               </Badge>
                                          </CardHeader>
                                          <TotalHours>
                                               <ClockIcon />
                                               <TotalHoursText>Tổng giờ: {worktime.total_task_time}h</TotalHoursText>
                                          </TotalHours>
                                          <TaskList>
                                               {worktime.tasks.map((task) => (
                                                    <TaskItem key={task.id}>
                                                         <TaskName>{task.task_name}</TaskName>
                                                         <TaskDuration>{task.task_time}h</TaskDuration>
                                                    </TaskItem>
                                               ))}
                                          </TaskList>
                                     </CardBody>
                                </WorktimeCard>
                           ))
                         : !loading && !error && <p>Không có dữ liệu công việc.</p>}
               </WorktimeStats>
          </StatsContainer>
     );
};

export default WorktimesDashboardComponent;
