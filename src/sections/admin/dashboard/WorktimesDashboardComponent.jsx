import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWorktimeWithTasks } from '../../../services/dashboardService';
import { FaClock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import { BiExport } from 'react-icons/bi';

const StatsContainer = styled.div`
     max-width: 100%;
     margin: 20px auto;
     padding: 30px;
     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const WorktimeStats = styled.div`
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     gap: 20px;
     max-height: 600px;
     overflow-y: auto;
     padding-right: 10px;
`;

const WorktimeCard = styled.div`
     background: #fff;
     border-radius: 12px;
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

const StatsHeader = styled.header`
     text-align: center;
     margin-bottom: 30px;
     padding: 20px 0;
     border-radius: 8px;
`;

const HeaderTitle = styled.h1`
     font-size: 2.5rem;
     font-weight: bold;
     color: #3498db;
     margin-bottom: 8px;
`;

const HeaderSubtitle = styled.p`
     font-size: 1.1rem;
     color: #7f8c8d;
     margin-bottom: 20px;
`;

const HeaderContent = styled.div`
     display: flex;
     justify-content: flex-end;
     align-items: center;
     gap: 15px;
     margin-top: 20px;
     padding: 0 10px;
`;

const SearchInput = styled.input`
     padding: 12px 20px;
     font-size: 16px;
     border-radius: 8px;
     border: 1px solid #ddd;
     width: 250px;
     transition: border-color 0.3s ease;

     &:focus {
          outline: none;
          border-color: #3498db;
     }
`;

const StatusSelect = styled.select`
     padding: 12px 20px;
     font-size: 16px;
     border-radius: 8px;
     border: 1px solid #ddd;
     width: 180px;
     background-color: white;
     transition: border-color 0.3s ease;

     &:focus {
          outline: none;
          border-color: #3498db;
     }
`;

const ExportButton = styled.button`
     background-color: #0d6efd;
     color: white;
     border: none;
     padding: 15px 17px;
     border-radius: 8px;
     cursor: pointer;
     margin-left: auto;
     font-size: 14px;

     &:hover {
          background-color: #0b5ed7;
     }
`;

const WorktimesDashboardComponent = () => {
     const [worktimes, setWorktimes] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [searchTerm, setSearchTerm] = useState('');
     const [selectedStatus, setSelectedStatus] = useState('all');
     const { t } = useTranslation();

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

     const filteredWorktimes = worktimes
          .filter((worktime) => worktime.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .filter((worktime) => {
               if (selectedStatus === 'all') return true;
               return worktime.status === selectedStatus;
          });

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
     };

     const handleStatusChange = (e) => {
          setSelectedStatus(e.target.value);
     };

     const handleExport = () => {
          const ws = XLSX.utils.json_to_sheet(
               filteredWorktimes.map((worktime, index) => ({
                    STT: index + 1,
                    'Tên công việc': worktime.name,
                    'Tên dự án': worktime.tasks.map((task) => task.project_name || 'Không xác định').join(', '),
                    'Tên nhiệm vụ': worktime.tasks.map((task) => task.task_name).join(', '),
                    'Trạng thái':
                         worktime.status === 'runing'
                              ? 'Đang chạy'
                              : worktime.status === 'not start'
                              ? 'Chưa bắt đầu'
                              : worktime.status === 'conplete'
                              ? 'Hoàn thành'
                              : 'Không xác định',
                    'Tổng giờ': `${worktime.total_task_time}h`,
                    'Số nhiệm vụ': worktime.tasks.length,
               })),
          );

          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Worktime Stats');

          XLSX.writeFile(wb, 'thongkecongviec.xlsx');
     };

     return (
          <StatsContainer>
               <StatsHeader>
                    <div className="card-header d-flex justify-content-between align-items-center py-3">
                         <div>
                              <HeaderTitle>Thống kê thời gian làm việc</HeaderTitle>
                              <HeaderSubtitle>Theo dõi và phân tích số liệu</HeaderSubtitle>
                         </div>

                         <HeaderContent>
                              <SearchInput type="text" placeholder={t('Search...')} value={searchTerm} onChange={handleSearchChange} />
                              <StatusSelect onChange={handleStatusChange} value={selectedStatus}>
                                   <option value="all">{t('All Statuses')}</option>
                                   <option value="conplete">{t('Completed')}</option>
                                   <option value="running">{t('In Progress')}</option>
                                   <option value="not start">{t('Not Started')}</option>
                              </StatusSelect>
                              <ExportButton onClick={handleExport}>
                                   <BiExport />
                              </ExportButton>
                         </HeaderContent>
                    </div>
               </StatsHeader>

               <WorktimeStats>
                    {loading && <LoadingText>Đang tải dữ liệu...</LoadingText>}
                    {error && <ErrorText>{error}</ErrorText>}
                    {filteredWorktimes.length > 0 && !loading && !error
                         ? filteredWorktimes.map((worktime) => (
                                <WorktimeCard key={worktime.id_worktime}>
                                     <CardBody>
                                          <CardHeader>
                                               <CardTitle>{worktime.name.length > 30 ? `${worktime.name.slice(0, 30)}...` : worktime.name}</CardTitle>
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
                                                         <TaskName>
                                                              {task.task_name.length > 30 ? `${task.task_name.slice(0, 30)}...` : task.task_name}
                                                         </TaskName>
                                                         <TaskDuration>{task.task_time}h</TaskDuration>
                                                    </TaskItem>
                                               ))}
                                          </TaskList>
                                     </CardBody>
                                </WorktimeCard>
                           ))
                         : !loading && !error && <p>{t('No matching data found.')}</p>}
               </WorktimeStats>
          </StatsContainer>
     );
};

export default WorktimesDashboardComponent;
