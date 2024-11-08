import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
          setValue,
     } = useForm();
     const [resetMethod, setResetMethod] = useState('email');
     const navigate = useNavigate();

     const onSubmit = () => {
          toast.success(`Mã OTP đặt lại mật khẩu đã được gửi đến ${resetMethod === 'email' ? 'email' : 'số điện thoại'} của bạn!`, {
               position: 'top-right',
          });

          navigate('/taskmaneger/otp', { state: { resetMethod } });
     };

     const handleResetMethodChange = (e) => {
          const selectedMethod = e.target.value;
          setResetMethod(selectedMethod);

          if (selectedMethod === 'email') {
               setValue('phone', '');
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
                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                              <h2 className="text-center mb-4">Reset Password</h2>

                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <div className="mb-3">
                                        <label className="form-label">Chọn Phương thức:</label>
                                        <select className="form-select form-select-sm" onChange={handleResetMethodChange} value={resetMethod}>
                                             <option value="email">Email</option>
                                             <option value="phone">Số điện thoại</option>
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
                                                  className={`form-control form-control-sm ${errors.phone ? 'is-invalid' : ''}`}
                                                  placeholder="Nhập số điện thoại của bạn"
                                                  {...register('phone', {
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
                                             {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                        </div>
                                   )}

                                   <div className="text-center mt-4 pt-2">
                                        <button
                                             type="submit"
                                             className="btn btn-primary btn-sm"
                                             style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                             Lấy lại mật khẩu
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

export default ResetPassword;
