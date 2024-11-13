import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resendVerificationCode } from '../../services/authService';

function ConfirmEmail() {
     const navigate = useNavigate();

     useEffect(() => {
          const email = sessionStorage.getItem('user_email');
          if (!email) {
               toast.error('Không tìm thấy thông tin người dùng. Vui lòng đăng ký lại.', { position: 'top-right' });
               navigate('/taskmaneger/register');
          }
     }, [navigate]);

     const handleResendEmail = async () => {
          const email = sessionStorage.getItem('user_email');

          if (!email) {
               toast.error('Không tìm thấy email. Vui lòng thử lại.', { position: 'top-right' });
               return;
          }

          try {
               const response = await resendVerificationCode(email);

               if (response.status === 'warning') {
                    toast.warning(response.message, { position: 'top-right' });
               } else {
                    toast.success(response.message, { position: 'top-right' });
               }
          } catch (error) {
               toast.error(error.message || 'Không thể gửi lại email xác nhận.', { position: 'top-right' });
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
                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
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
               <ToastContainer />
          </section>
     );
}

export default ConfirmEmail;
