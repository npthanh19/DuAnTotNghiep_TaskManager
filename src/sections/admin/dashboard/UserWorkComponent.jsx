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

const UserDepartments = styled.p`
     font-size: 14px;
     color: #555;
     font-weight: bold;
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
     const [selectedUser, setSelectedUser] = useState(null);

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
                    'Phòng ban': user.departments || 'N/A',
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
                                        <UserTasks>
                                             Số phòng ban: <HighlightText>{user.department_count || 0}</HighlightText>
                                        </UserTasks>
                                        <UserDepartments>
                                             Phòng ban: <HighlightText>{user.departments || '-'}</HighlightText>
                                        </UserDepartments>
                                        <ExportButton onClick={() => setSelectedUser(user)}>Xem thêm</ExportButton>
                                   </UserInfo>
                              </UserCard>
                         ))
                    ) : (
                         <p>Không tìm thấy người dùng phù hợp.</p>
                    )}
               </UserStats>

               {/* Hiển thị chi tiết người dùng */}
               {selectedUser && (
                    <div
                         className="modal fade show"
                         tabIndex="-1"
                         role="dialog"
                         style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                         onClick={() => setSelectedUser(null)}>
                         <div
                              className="modal-dialog modal-dialog-centered"
                              role="document"
                              onClick={(e) => e.stopPropagation()} 
                         >
                              <div className="modal-content">
                                   <div className="modal-header">
                                        <h5 className="modal-title">Thông tin chi tiết</h5>
                                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedUser(null)}></button>
                                   </div>
                                   <div className="modal-body">
                                        <p>Họ và tên: {selectedUser.fullname}</p>
                                        <p>Số nhiệm vụ: {selectedUser.task_count}</p>
                                        <p>Tổng thời gian: {selectedUser.total_task_time} giờ</p>
                                        <p>Phòng ban: {selectedUser.departments || '-'}</p>
                                        <p>Số phòng ban: {selectedUser.department_count || 0}</p>
                                   </div>
                                   <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
                                             Đóng
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </StatsContainer>
     );
};

export default UserStatistics;
