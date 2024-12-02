import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axiosi } from '../../../config/axios';
import Swal from 'sweetalert2';

const ConfirmDepartment = () => {
     const { departmentId, token } = useParams();
     const navigate = useNavigate();
     const [status, setStatus] = useState('loading'); 

     useEffect(() => {
          const confirmJoin = async () => {
               try {
                    const response = await axiosi.get(`/api/departments/${departmentId}/confirm/${token}`);
                    setStatus('success');
                    Swal.fire({
                         icon: 'success',
                         title: 'Thành công!',
                         text: response.data.message,
                    });
               } catch (error) {
                    setStatus('error');
                    Swal.fire({
                         icon: 'error',
                         title: 'Lỗi!',
                         text: error.response?.data?.error || 'Liên kết xác nhận không hợp lệ.',
                    });
               }
          };

          confirmJoin();
     }, [departmentId, token]);

     const handleRedirect = () => {
          navigate('/taskmaneger/departments');
     };

     return (
          <div className="confirm-department-page">
               {status === 'loading' && <p>Đang xử lý xác nhận...</p>}
               {status === 'success' && (
                    <div>
                         <h2>Xác nhận thành công!</h2>
                         <p>Bạn đã tham gia phòng ban thành công.</p>
                         <button onClick={handleRedirect}>Quay lại danh sách phòng ban</button>
                    </div>
               )}
               {status === 'error' && (
                    <div>
                         <h2>Xác nhận thất bại!</h2>
                         <p>Liên kết xác nhận không hợp lệ hoặc đã hết hạn.</p>
                         <button onClick={handleRedirect}>Quay lại danh sách phòng ban</button>
                    </div>
               )}
          </div>
     );
};

export default ConfirmDepartment;
