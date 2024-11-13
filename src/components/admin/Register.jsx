import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithGooglePopup } from '../../utils/firebase-untils';

function Register() {
     const {
          register: formRegister,
          handleSubmit,
          formState: { errors },
          getValues,
     } = useForm();
     const [loading, setLoading] = useState(false);
     const [agreeToTerms, setAgreeToTerms] = useState(false);
     const navigate = useNavigate();
     const handleCheckboxChange = (e) => {
          setAgreeToTerms(e.target.checked);
     };

     const onSubmit = async (data) => {
          sessionStorage.setItem('user_email', data.email);

          if (!agreeToTerms) {
               toast.error('Bạn phải đồng ý với các điều khoản và điều kiện.');
               return;
          }

          if (data.password !== data.confirmPassword) {
               toast.error('Mật khẩu không khớp.');
               return;
          }

          try {
               setLoading(true);
               const response = await register({
                    fullname: data.fullname,
                    email: data.email,
                    password: data.password,
               });
               console.log('Đăng ký thành công:', response);
               toast.info('Vui lòng kiểm tra email của bạn để xác nhận tài khoản.');

               setTimeout(() => {
                    navigate('/taskmaneger/confirm-email');
               }, 1000);
          } catch (err) {
               toast.error(err.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại Email.');
               console.error('Lỗi đăng ký:', err);
          } finally {
               setLoading(false);
          }
     };

     const logGoogleUser = async () => {
          try {
               const response = await signInWithGooglePopup();
               console.log(response);
          } catch (error) {
               if (error.code === 'auth/popup-closed-by-user') {
                    toast.error('Bạn đã đóng cửa sổ đăng nhập. Vui lòng thử lại.', { position: 'top-right' });
               } else {
                    toast.error('Đăng nhập thất bại. Vui lòng thử lại.', { position: 'top-right' });
               }
               console.error('Lỗi đăng nhập Google:', error);
          }
     };

     return (
          <section className="vh-100">
               <ToastContainer position="top-right" autoClose={2000} />
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
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="text"
                                             {...formRegister('fullname', { required: 'Tên là bắt buộc' })}
                                             className="form-control form-control-sm"
                                             placeholder="Nhập tên của bạn"
                                        />
                                        <label className="form-label" htmlFor="form3ExampleName">
                                             Họ và tên
                                        </label>
                                        {errors.fullname && <p className="text-danger">{errors.fullname.message}</p>}
                                   </div>
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="email"
                                             {...formRegister('email', { required: 'Email là bắt buộc' })}
                                             className="form-control form-control-sm"
                                             placeholder="Nhập địa chỉ email hợp lệ"
                                        />
                                        <label className="form-label" htmlFor="form3Example2">
                                             Địa chỉ Email
                                        </label>
                                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                   </div>
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="password"
                                             {...formRegister('password', {
                                                  required: 'Mật khẩu là bắt buộc',
                                                  minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                                             })}
                                             className="form-control form-control-sm"
                                             placeholder="Nhập mật khẩu"
                                        />
                                        <label className="form-label" htmlFor="form3Example3">
                                             Mật khẩu
                                        </label>
                                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                   </div>
                                   <div data-mdb-input-init className="form-outline mb-3">
                                        <input
                                             type="password"
                                             {...formRegister('confirmPassword', {
                                                  required: 'Vui lòng xác nhận mật khẩu',
                                                  validate: (value) => value === getValues('password') || 'Mật khẩu không khớp',
                                             })}
                                             className="form-control form-control-sm"
                                             placeholder="Xác nhận mật khẩu"
                                        />
                                        <label className="form-label" htmlFor="form3Example4">
                                             Xác nhận mật khẩu
                                        </label>
                                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                                   </div>

                                   <div className="d-flex justify-content-between align-items-center">
                                        <div className="form-check mb-0">
                                             <input
                                                  className="form-check-input me-2"
                                                  type="checkbox"
                                                  id="form2Example3"
                                                  checked={agreeToTerms}
                                                  onChange={handleCheckboxChange}
                                             />
                                             <label className="form-check-label" htmlFor="form2Example3">
                                                  Tôi đồng ý với các điều khoản và điều kiện
                                             </label>
                                        </div>
                                   </div>
                                   <div className="text-center text-lg-start pt-2">
                                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                             {loading ? 'Đang đăng ký...' : 'Đăng ký '}
                                        </button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">
                                             Đã có tài khoản?{' '}
                                             <Link to="/taskmaneger/login" className="link-danger">
                                                  Đăng nhập
                                             </Link>
                                        </p>
                                   </div>
                              </form>
                              <div className="divider d-flex align-items-center my-4">
                                   <p className="text-center fw-bold mx-3 mb-0">Hoặc</p>
                              </div>
                              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                   <p className="lead fw-normal mb-0 me-3">Đăng nhập với</p>
                                   <button type="button" onClick={logGoogleUser} className="btn btn-lg btn-floating mx-1 social-btn google-btn">
                                        <i className="bi bi-google" />
                                   </button>
                                   <button type="button" className="btn btn-lg btn-floating mx-1 social-btn facebook-btn">
                                        <i className="bi bi-facebook" />
                                   </button>
                                   <button type="button" className="btn btn-lg btn-floating mx-1 social-btn linkedin-btn">
                                        <i className="bi bi-linkedin" />
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default Register;
