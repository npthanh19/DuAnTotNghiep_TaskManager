import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpPage = () => {
     const navigate = useNavigate();
     const location = useLocation();
     const [resetMethod, setResetMethod] = useState('');
     const [otp, setOtp] = useState('');
     const [isVerified, setIsVerified] = useState(false);

     useEffect(() => {
          if (location.state?.resetMethod) {
               setResetMethod(location.state.resetMethod);
          }
     }, [location]);

     const handleOtpChange = (e) => {
          const value = e.target.value;

          if (/^\d{0,6}$/.test(value)) {
               setOtp(value);
          }
     };

     const handleVerifyOtp = (e) => {
          e.preventDefault();

          if (otp === '111111') {
               toast.success('Mã OTP hợp lệ! Bạn có thể đặt lại mật khẩu của mình.', {
                    position: 'top-right',
               });
               setIsVerified(true);

               setTimeout(() => {
                    navigate('/taskmaneger/new-password');
               }, 1500);
          } else {
               toast.error('Mã OTP không hợp lệ. Vui lòng thử lại.', {
                    position: 'top-right',
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
                              <h2 className="text-center mb-4">Nhập Mã OTP</h2>

                              <form onSubmit={handleVerifyOtp}>
                                   <div className="mb-3">
                                        <label className="form-label">
                                             Mã OTP đã được gửi đến {resetMethod === 'email' ? 'email' : 'số điện thoại'} của bạn.
                                        </label>
                                        <input
                                             type="text"
                                             className="form-control form-control-sm"
                                             placeholder="Nhập mã OTP"
                                             value={otp}
                                             onChange={handleOtpChange}
                                             maxLength={6}
                                             required
                                        />
                                   </div>

                                   <div className="text-center mt-4 pt-2">
                                        <button
                                             type="submit"
                                             className="btn btn-primary btn-sm"
                                             style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                                             disabled={isVerified || otp.length < 6}>
                                             Xác nhận OTP
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>

               <ToastContainer />
          </section>
     );
};

export default OtpPage;
