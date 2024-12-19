import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getAllWorktimes } from '../../../services/worktimeService';
import { getTasksByWorktimeId } from '../../../services/tasksService';
import { useTranslation } from 'react-i18next';
import './calender.css';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

export const View = () => {
     const [events, setEvents] = useState([]);
     const [loading, setLoading] = useState(true);
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [searchTerm, setSearchTerm] = useState('');
     useEffect(() => {
          async function fetchWorktimesAndTasks() {
               try {
                    setLoading(true); // Bắt đầu loading
                    // Fetch all worktimes
                    const worktimes = await getAllWorktimes();
                    const allTasks = [];

                    // Fetch tasks for each worktime
                    for (const worktime of worktimes) {
                         const tasksData = await getTasksByWorktimeId(worktime.id);
                         const tasks = tasksData.tasks.map((task) => ({
                              title: task.task_name,
                              start: new Date(task.start_date),
                              end: new Date(task.end_date),
                              description: task.description,
                              status: task.status,
                              assigned_users: task.assigned_users,
                         }));
                         allTasks.push(...tasks);
                    }

                    // Update state with events
                    setEvents(allTasks);
               } catch (error) {
                    console.error('Error fetching worktimes or tasks:', error);
               } finally {
                    setLoading(false); // Kết thúc loading
               }
          }

          fetchWorktimesAndTasks();
     }, []);

     const eventStyleGetter = (event) => {
          let backgroundColor = '';

          switch (event.status) {
               case 'to do':
                    backgroundColor = '#D3D3D3';
                    break;
               case 'in progress':
                    backgroundColor = '#1E90FF';
                    break;
               case 'preview':
                    backgroundColor = '#FFD700';
                    break;
               case 'done':
                    backgroundColor = '#32CD32';
                    break;
               default:
                    backgroundColor = '#ffffff';
          }

          return {
               style: {
                    backgroundColor,
                    color: 'white',
                    borderRadius: '5px',
                    padding: '10px',
               },
          };
     };

     return (
          <div style={{ margin: '20px' }}>
               <h1>{t('Calendar')}</h1>
               {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                         <div className="spinner-border" role="status">
                              <span className="visually-hidden">{t('Loading...')}</span>
                         </div>
                    </div>
               ) : (
                    <Calendar
                         localizer={localizer}
                         events={events}
                         startAccessor="start"
                         endAccessor="end"
                         style={{ height: 500 }}
                         tooltipAccessor={(event) => event.description}
                         popup={true}
                         onSelectEvent={(event) => alert(event.title)}
                         eventPropGetter={eventStyleGetter}
                         views={['month']}
                    />
               )}
          </div>
     );
};
