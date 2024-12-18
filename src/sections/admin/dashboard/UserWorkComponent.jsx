import React, { useEffect, useState } from 'react';
import { getUserTaskStatistics } from '../../../services/dashboardService';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import { BiExport } from 'react-icons/bi';

const StatsContainer = styled.div`
     max-width: 100%;
     margin: 20px auto;
     background: #fff;
     padding: 20px;
     border-radius: 8px;
     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
     max-height: 80vh;
     overflow: hidden; /* Ẩn cuộn cho toàn bộ container */
`;

const HeaderContainer = styled.div`
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding-bottom: 20px;
`;

const StatsHeader = styled.h2`
     flex: 8;
     text-align: left;
     font-size: 2.5rem;
     font-weight: bold;
     color: #3498db;
     padding-bottom: 20px;
`;

const SearchInput = styled.input`
     flex: 2;
     padding: 6px;
     border: 1px solid #ccc;
     border-radius: 8px;
     font-size: 14px;

     &:focus {
          outline: none;
          border-color: #3498db;
     }
`;

const UserStats = styled.div`
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     gap: 20px;
     overflow-y: auto;
     max-height: calc(80vh - 120px);
     padding-right: 15px;
`;

const UserCard = styled.div`
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

const ExportButton = styled.button`
     background-color: #0d6efd;
     color: white;
     border: none;
     padding: 9px 17px;
     border-radius: 8px;
     cursor: pointer;
     margin-left: auto;
     font-size: 14px;
     margin-left: 5px;

     &:hover {
          background-color: #0b5ed7;
     }
`;

const UserStatistics = () => {
     const [users, setUsers] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');
     const [filteredUsers, setFilteredUsers] = useState([]);
     const { t } = useTranslation();

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const data = await getUserTaskStatistics();

                    if (data && Array.isArray(data.users)) {
                         setUsers(data.users);
                         setFilteredUsers(data.users);
                    } else {
                         console.error('Invalid user data format');
                    }
               } catch (error) {
                    console.error('Error fetching user statistics:', error);
               }
          };

          fetchData();
     }, [t]);

     const handleSearch = (e) => {
          const value = e.target.value.toLowerCase();
          setSearchTerm(value);

          const filtered = users.filter((user) => user.fullname.toLowerCase().includes(value));
          setFilteredUsers(filtered);
     };

     const handleExport = () => {
          const ws = XLSX.utils.json_to_sheet(
               filteredUsers.map((user) => ({
                    'Họ và tên': user.fullname,
                    'Số nhiệm vụ': user.task_count,
                    'Tổng thời gian': `${user.total_task_time} giờ`,
               })),
          );

          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'User Stats');

          XLSX.writeFile(wb, 'thongkenguoidung.xlsx');
     };

     return (
          <StatsContainer>
               <HeaderContainer>
                    <StatsHeader>Thống kê người dùng</StatsHeader>
                    <SearchInput type="text" placeholder={t('Search...')} value={searchTerm} onChange={handleSearch} />
                    <ExportButton onClick={handleExport}>
                         <BiExport />
                    </ExportButton>
               </HeaderContainer>

               <UserStats>
                    {filteredUsers.length > 0 ? (
                         filteredUsers.map((user, index) => (
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
                         <p>Không tìm thấy người dùng phù hợp.</p>
                    )}
               </UserStats>
          </StatsContainer>
     );
};

export default UserStatistics;
