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
          <div className="confirm-department-page container text-center py-5">
               {status === 'loading' && (
                    <div className="alert alert-info" role="alert">
                         <p className="mb-0">Đang xử lý xác nhận...</p>
                    </div>
               )}
               {status === 'success' && (
                    <div className="alert alert-success" role="alert">
                         <h2 className="alert-heading">Xác nhận thành công!</h2>
                         <p>Bạn đã tham gia phòng ban thành công.</p>
                         <button className="btn btn-primary mt-3" onClick={handleRedirect}>
                              Quay lại
                         </button>
                    </div>
               )}
               {status === 'error' && (
                    <div className="alert alert-danger" role="alert">
                         <h2 className="alert-heading">Xác nhận thất bại!</h2>
                         <p>Liên kết xác nhận không hợp lệ hoặc đã hết hạn.</p>
                         <button className="btn btn-secondary mt-3" onClick={handleRedirect}>
                              Quay lại
                         </button>
                    </div>
               )}
          </div>
     );
};

export default ConfirmDepartment;
