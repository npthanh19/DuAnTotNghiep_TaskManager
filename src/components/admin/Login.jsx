import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { Link } from 'react-router-dom';
import { axiosi } from '../../config/axios';
import { login } from '../../services/authService';
import { auth, signInWithGooglePopup } from '../../utils/firebase-untils';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm();

     const onSubmit = async (data) => {
          try {
               const response = await login(data.email, data.password);
               if (response && response.access_token) {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('token', response.access_token);
                    axiosi.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
                    toast.success(`Chào mừng bạn, ${data.email}!`, { position: 'top-right' });

                    setTimeout(() => {
                         window.location.href = '/taskmaneger';
                    }, 1000);
               }
          } catch (error) {
               toast.error(error.response && error.response.status === 401 ? 'Email hoặc Mật khẩu đã sai' : 'Đăng nhập thất bại. Vui lòng thử lại.', {
                    position: 'top-right',
               });
          }
     };

     const logGoogleUser = async () => {
          const provider = new GoogleAuthProvider();
          try {
               const response = await signInWithPopup(auth, provider);
               const credential = GoogleAuthProvider.credentialFromResult(response);
               const token = credential.accessToken;

               const result = await axiosi.post('/api/google-login', { token });
               if (result && result.data.access_token) {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('token', result.data.access_token);
                    axiosi.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`;
                    window.location.href = '/taskmaneger';
               } else {
                    toast.error('Phản hồi đăng nhập không hợp lệ', { position: 'top-right' });
               }
          } catch (error) {
               if (error.code === 'auth/popup-closed-by-user') {
                    toast.error('Bạn đã đóng cửa sổ đăng nhập. Vui lòng thử lại.', { position: 'top-right' });
               } else {
                    toast.error('Đăng nhập thất bại. Vui lòng thử lại.', { position: 'top-right' });
               }
               console.error('Google login error:', error);
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
                                   alt="Sample image"
                              />
                         </div>
                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="email"
                                             id="form3Example3"
                                             className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                             placeholder="Nhập địa chỉ Email"
                                             {...register('email', {
                                                  required: 'Email không được để trống',
                                                  pattern: {
                                                       value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                       message: 'Định dạng email không hợp lệ',
                                                  },
                                             })}
                                        />
                                        <label className="form-label" htmlFor="form3Example3">
                                             Địa chỉ Email
                                        </label>
                                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                   </div>

                                   <div data-mdb-input-init className="form-outline mb-3">
                                        <input
                                             type="password"
                                             id="form3Example4"
                                             className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                             placeholder="Nhập mật khẩu"
                                             {...register('password', {
                                                  required: 'Mật khẩu không được để trống',
                                                  minLength: {
                                                       value: 6,
                                                       message: 'Mật khẩu không được dưới 6 kí tự',
                                                  },
                                             })}
                                        />
                                        <label className="form-label" htmlFor="form3Example4">
                                             Mật khẩu
                                        </label>
                                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                   </div>

                                   <div className="d-flex justify-content-between align-items-center">
                                        <Link
                                             to="/taskmaneger/reset-password"
                                             className="text-decoration-none text-primary fw-semibold d-flex align-items-center">
                                             <i className="bi bi-question-circle me-2"></i> Quên mật khẩu?
                                        </Link>
                                   </div>

                                   <div className="text-center text-lg-start mt-4 pt-2">
                                        <button
                                             type="submit"
                                             className="btn btn-primary btn-lg"
                                             style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                             Đăng nhập
                                        </button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">
                                             Bạn không có tài khoản?{' '}
                                             <Link to="/taskmaneger/register" className="link-danger">
                                                  Đăng ký
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
               <ToastContainer />
          </section>
     );
};

export default Login;
