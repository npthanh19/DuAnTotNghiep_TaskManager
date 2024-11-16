import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { resendVerificationCode } from '../../services/authService';

function ConfirmEmail() {
     const navigate = useNavigate();

     useEffect(() => {
          const email = sessionStorage.getItem('user_email');
          if (!email) {
               Swal.fire({
                    icon: 'error',
                    title: 'Không tìm thấy thông tin người dùng',
                    text: 'Vui lòng đăng ký lại.',
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
               navigate('/taskmaneger/register');
          }
     }, [navigate]);

     const handleResendEmail = async () => {
          const email = sessionStorage.getItem('user_email');

          if (!email) {
               Swal.fire({
                    icon: 'error',
                    title: 'Không tìm thấy email',
                    text: 'Vui lòng thử lại.',
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
               return;
          }

          try {
               const response = await resendVerificationCode(email);

               if (response.status === 'warning') {
                    Swal.fire({
                         icon: 'warning',
                         text: response.message,
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               } else {
                    Swal.fire({
                         icon: 'success',
                         text: response.message,
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    text: error.message || 'Không thể gửi lại email xác nhận.',
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          }
     };

     return (
          <section className="vh-100">
               <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                         <div className="col-md-9 col-lg-6 col-xl-5">
                              <img
                                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                   className="img-fluid"
                                   alt="Ảnh minh họa"
                              />
                         </div>
                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 border rounded-4 shadow-lg bg-white p-4">
                              <div className="text-center">
                                   <h2>Hãy kiểm tra Email của bạn!</h2>
                                   <p>
                                        Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn. Vui lòng mở email và làm theo hướng dẫn để xác
                                        nhận tài khoản.
                                   </p>
                                   <p>Nếu bạn không nhận được email, vui lòng kiểm tra hộp thư rác.</p>
                                   <div className="text-center pt-2">
                                        <Link to="#" className="link-danger" onClick={handleResendEmail}>
                                             Gửi lại email xác nhận
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default ConfirmEmail;
