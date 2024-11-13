import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 

import { verifyResetCode } from '../../services/authService';

const OtpPage = () => {
     const navigate = useNavigate();
     const location = useLocation();
     const [resetMethod, setResetMethod] = useState('');
     const [contact, setContact] = useState('');
     const [otp, setOtp] = useState('');

     const handleOtpChange = (e) => {
          const value = e.target.value;

          if (/^\d{0,6}$/.test(value)) {
               setOtp(value);
          }
     };

     useEffect(() => {
          if (location.state?.resetMethod) {
               setResetMethod(location.state.resetMethod);
               setContact(location.state.contact);
          }
     }, [location]);

     const handleVerifyOtp = async (e) => {
          e.preventDefault();

          try {
               const response = await verifyResetCode(otp, contact, resetMethod);

               if (response?.message === 'Code verified, proceed to reset password') {
                    Swal.fire({
                         icon: 'success',
                         title: 'Mã OTP hợp lệ! Bạn có thể đặt lại mật khẩu của mình.',
                         position: 'top-end',
                         toast: true,
                         timer: 2000,
                         showConfirmButton: false,
                    });

                    sessionStorage.setItem('email_or_phone', contact);
                    setTimeout(() => {
                         navigate('/taskmaneger/new-password');
                    }, 1500);
               } else {
                    Swal.fire({
                         icon: 'error',
                         title: response?.message || 'Mã OTP không hợp lệ. Vui lòng thử lại.',
                         position: 'top-end',
                         toast: true,
                         timer: 2000,
                         showConfirmButton: false,
                    });
               }
          } catch (error) {
               console.error(error);
               Swal.fire({
                    icon: 'error',
                    title: error?.response?.data?.message || 'Mã OTP không hợp lệ hoặc có lỗi trong quá trình xử lý. Vui lòng thử lại.',
                    position: 'top-end',
                    toast: true,
                    timer: 2000,
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
                                   alt="Sample"
                              />
                         </div>
                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                              <h2 className="text-center mb-4">Nhập mã OTP</h2>
                              <form onSubmit={handleVerifyOtp}>
                                   <div className="form-outline mb-4">
                                        <input
                                             type="text"
                                             id="otp"
                                             value={otp}
                                             onChange={handleOtpChange}
                                             className="form-control form-control-sm"
                                             placeholder="Nhập mã OTP"
                                             required
                                        />
                                        <label className="form-label" htmlFor="otp">
                                             Mã OTP đã được gửi đến {resetMethod === 'email' ? 'email' : 'số điện thoại'} của bạn: {contact}
                                        </label>
                                   </div>

                                   <div className="text-center mt-4 pt-2">
                                        <button
                                             type="submit"
                                             className="btn btn-primary btn-sm"
                                             style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                             Xác thực OTP
                                        </button>
                                   </div>

                                   <div className="text-center mt-3">
                                        <a type="text" className="text-danger" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                             Chưa nhận được mã? Gửi lại OTP
                                        </a>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default OtpPage;
