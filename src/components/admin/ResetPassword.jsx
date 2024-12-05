import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../../services/authService';

const ResetPassword = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
          setValue,
     } = useForm();
     const [resetMethod, setResetMethod] = useState('email');
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);

     const onSubmit = async (data) => {
          setLoading(true);
          const value = resetMethod === 'email' ? data.email : data.phone_number;
          try {
               const response = await requestPasswordReset(value, resetMethod);

               if (response.status === 404) {
                    Swal.fire({
                         icon: 'error',
                         title: 'Không tìm thấy người dùng với thông tin này!',
                         position: 'top-right',
                         toast: true,
                         timer: 2000,
                         showConfirmButton: false,
                    });
                    return;
               }

               Swal.fire({
                    icon: 'success',
                    title: `Mã OTP đã được gửi đến ${resetMethod === 'email' ? 'email' : 'số điện thoại'} của bạn!`,
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });

               navigate('/taskmaneger/otp', { state: { resetMethod, contact: value } });
          } catch (error) {
               console.error('API error:', error);
               Swal.fire({
                    icon: 'error',
                    title: error?.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại!',
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
          } finally {
               setLoading(false);
          }
     };

     const handleResetMethodChange = (e) => {
          const selectedMethod = e.target.value;
          setResetMethod(selectedMethod);

          if (selectedMethod === 'email') {
               setValue('phone_number', '');
          } else {
               setValue('email', '');
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
                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 border rounded-4 shadow-lg bg-white p-4">
                              <h2 className="text-center mb-4">Reset Password</h2>

                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <div className="mb-3">
                                        <label className="form-label">Chọn Phương thức:</label>
                                        <select className="form-select form-select-sm" onChange={handleResetMethodChange} value={resetMethod}>
                                             <option value="email">Email</option>
                                             <option value="phone_number">Số điện thoại</option>
                                        </select>
                                   </div>

                                   {resetMethod === 'email' ? (
                                        <div className="form-outline mb-4">
                                             <input
                                                  type="email"
                                                  id="resetEmail"
                                                  className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                                                  placeholder="Nhập địa chỉ email của bạn"
                                                  {...register('email', {
                                                       required: 'Email là bắt buộc',
                                                       pattern: {
                                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                            message: 'Định dạng email không hợp lệ',
                                                       },
                                                  })}
                                             />
                                             <label className="form-label" htmlFor="resetEmail">
                                                  Địa chỉ Email
                                             </label>
                                             {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                        </div>
                                   ) : (
                                        <div className="form-outline mb-4">
                                             <input
                                                  type="tel"
                                                  id="resetPhone"
                                                  className={`form-control form-control-sm ${errors.phone_number ? 'is-invalid' : ''}`}
                                                  placeholder="Nhập số điện thoại của bạn"
                                                  {...register('phone_number', {
                                                       required: 'Số điện thoại là bắt buộc',
                                                       minLength: {
                                                            value: 10,
                                                            message: 'Số điện thoại phải có ít nhất 10 chữ số',
                                                       },
                                                       maxLength: {
                                                            value: 13,
                                                            message: 'Số điện thoại không được quá 13 chữ số',
                                                       },
                                                       pattern: {
                                                            value: /^[0-9]+$/,
                                                            message: 'Số điện thoại chỉ chứa chữ số',
                                                       },
                                                  })}
                                             />
                                             <label className="form-label" htmlFor="resetPhone">
                                                  Số điện thoại
                                             </label>
                                             {errors.phone_number && <div className="invalid-feedback">{errors.phone_number.message}</div>}

                                             <div className=" text-center">
                                                  <p>
                                                       <strong>
                                                            Bạn cần quét mã QR hoặc tham gia vào đường link Telegram dưới đây để nhận mã OTP:
                                                       </strong>
                                                  </p>
                                                  <div className="d-flex justify-content-center align-items-center mt-4">
                                                       {/* Telegram Button */}
                                                       <a
                                                            href="https://t.me/nhdtTotNghiep2025"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-secondary btn-sm me-3">
                                                            Tham gia Telegram
                                                       </a>

                                                       {/* OR Text */}
                                                       <p className="my-auto mx-3">OR</p>

                                                       {/* QR Code */}
                                                       <img
                                                            src="/assets/admin/img/NHDT_TEAM.jpg"
                                                            alt="QR Code"
                                                            className="qr-image ms-4"
                                                            width="150"
                                                       />
                                                  </div>

                                                  <p className="note my-3 text-danger">
                                                       <strong>Lưu ý:</strong> Người dùng nhấp chọn vào Link bắt buộc phải đăng nhập TELEGRAM.
                                                  </p>
                                             </div>
                                        </div>
                                   )}
                                   <div className="text-center pt-2">
                                        <button
                                             type="submit"
                                             className="btn btn-primary btn-sm"
                                             style={{ paddingLeft: '5rem', paddingRight: '5rem' }}
                                             disabled={loading}>
                                             {loading ? 'Đang xử lý...' : 'Lấy lại mật khẩu'}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default ResetPassword;
