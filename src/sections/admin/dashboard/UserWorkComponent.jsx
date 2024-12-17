import React, { useEffect, useState } from 'react';
import { getUserTaskStatistics } from '../../../services/dashboardService';
import styled from 'styled-components'; // Import styled-components

// Styled-components
const StatsContainer = styled.div`
     max-width: 100%;
     margin: 20px auto;
     background: #fff;
     padding: 20px;
     border-radius: 8px;
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatsHeader = styled.h2`
     text-align: center;
     font-size: 2.5rem;
     font-weight: bold;
     color: #3498db;
     padding-bottom: 20px;
`;

const UserStats = styled.div`
     display: flex;
     flex-wrap: wrap;
     gap: 20px;
`;

const UserCard = styled.div`
     flex: 1 1 calc(33.333% - 20px);
     background: #f1f4f9;
     padding: 15px;
     border-radius: 8px;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
     transition: transform 0.2s ease-in-out;

     &:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2);
     }
`;

const UserInfo = styled.div`
     text-align: center;
`;

const UserFullname = styled.h3`
     font-size: 18px;
     font-weight: 600;
     margin-bottom: 10px;
`;

const UserTasks = styled.p`
     font-size: 14px;
     color: #555;
`;

const UserTotalTime = styled.p`
     font-size: 14px;
     color: #555;
`;

const HighlightText = styled.span`
     font-weight: bold;
     color: #007bff;
`;

const UserStatistics = () => {
     const [users, setUsers] = useState([]); // Luôn là mảng

     // Fetch data từ API
     useEffect(() => {
          const fetchData = async () => {
               try {
                    const data = await getUserTaskStatistics();
                    console.log('Dữ liệu thống kê người dùng:', data); // Log ra dữ liệu

                    // Kiểm tra nếu mảng users có dữ liệu và set state
                    if (data && Array.isArray(data.users)) {
                         setUsers(data.users);
                    } else {
                         console.error('Dữ liệu người dùng không đúng định dạng');
                    }
               } catch (error) {
                    console.error('Lỗi khi lấy thống kê người dùng:', error);
               }
          };

          fetchData();
     }, []);

     return (
          <StatsContainer>
               <StatsHeader>Thống kê người dùng</StatsHeader>
               <UserStats>
                    {users.length > 0 ? (
                         users.map((user, index) => (
                              <UserCard key={index}>
                                   <UserInfo>
                                        <UserFullname>{user.fullname}</UserFullname>
                                        <UserTasks>
                                             Số nhiệm vụ: <HighlightText>{user.task_count}</HighlightText>
                                        </UserTasks>
                                        <UserTotalTime>
                                             Tổng thời gian: <HighlightText>{user.total_task_time} giờ</HighlightText>
                                        </UserTotalTime>
                                   </UserInfo>
                              </UserCard>
                         ))
                    ) : (
                         <p>Đang tải dữ liệu...</p>
                    )}
               </UserStats>
          </StatsContainer>
     );
};

export default UserStatistics;
