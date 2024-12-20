import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { axiosi } from '../../config/axios';
import { login } from '../../services/authService';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const Login = () => {
     const [loading, setLoading] = useState(false);
     const { t } = useTranslation();

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm();

     const navigate = useNavigate();

     const onSubmit = async (data) => {
          setLoading(true);
          try {
               const response = await login(data.email, data.password);
               if (response && response.access_token) {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('token', response.access_token);
                    localStorage.setItem('role', response.role);
                    localStorage.setItem('user_id', response.user_id);
                    localStorage.setItem('user_name', response.fullname);
                    axiosi.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;

                    Swal.fire({
                         icon: 'success',
                         title: `Chào mừng bạn, ${data.email}!`,
                         position: 'top-right',
                         toast: true,
                         timer: 1000,
                         showConfirmButton: false,
                    });

                    setTimeout(() => {
                         if (response.role === 'Admin' || response.role === 'Manager') {
                              navigate('/taskmaneger');
                         } else {
                              navigate('/taskmaneger');
                         }
                    }, 1000);
               }
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    title: error.response && error.response.status === 401 ? t('Email or Password is wrong') : t('Login failed. Please try again.'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
          } finally {
               setLoading(false);
          }
     };

     const handleGGLogin = async (credentialResponse) => {
          setLoading(true);
          try {
               const token = credentialResponse.credential;
               const decoded = jwtDecode(token);
               console.log(decoded);
               console.log('Google Response:', credentialResponse);

               const userEmail = decoded.email;

               const response = await axiosi.post('/api/auth/google', {
                    credential: token,
               });

               if (response.data.status === 'verification_required') {
                    sessionStorage.setItem('user_email', userEmail);

                    Swal.fire({
                         icon: 'info',
                         title: t('Please check your email to verify your account.'),
                         position: 'top-right',
                         toast: true,
                         timer: 2000,
                         showConfirmButton: false,
                    });

                    setTimeout(() => {
                         navigate('/taskmaneger/confirm-email');
                    }, 2000);
               } else if (response.data.status === 'verified') {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem('role', response.data.role);
                    localStorage.setItem('user_id', response.data.user_id);
                    localStorage.setItem('email', decoded.email);
                    localStorage.setItem('user_name', response.data.user_name);
                    axiosi.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

                    Swal.fire({
                         icon: 'success',
                         title: t('Log in successfully!'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    }).then(() => {
                         if (response.data.role === 'Admin' || response.data.role === 'Manager') {
                              navigate('/taskmaneger');
                         } else {
                              navigate('/taskmaneger');
                         }
                    });
               }
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    title: t('Google login failed. Please try again.'),
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
          } finally {
               setLoading(false);
          }
     };

     const handleGGError = () => {
          Swal.fire({
               icon: 'error',
               title: t('Google login failed.'),
               position: 'top-right',
               toast: true,
               timer: 2000,
               showConfirmButton: false,
          });
     };

     return (
          <section className="vh-100 bg-light">
               <div className="container-fluid h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                         <div className="col-md-7 col-lg-6 col-xl-5">
                              <img
                                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                   className="img-fluid rounded-3"
                                   alt="Sample image"
                              />
                         </div>
                         <div className="col-md-7 col-lg-6 col-xl-4 offset-xl-1 border rounded-4 shadow-lg bg-white p-4">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   {/* Email Input */}
                                   <div className="form-outline mb-4 mt-3">
                                        <label className="form-label" htmlFor="form3Example3">
                                             {t('Email Address')}
                                        </label>
                                        <input
                                             type="email"
                                             id="form3Example3"
                                             className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                             placeholder={t('Email Address')}
                                             {...register('email', {
                                                  required: t('Email cannot be blank'),
                                                  pattern: {
                                                       value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                       message: t('Invalid email format'),
                                                  },
                                             })}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                   </div>

                                   {/* Password Input */}
                                   <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form3Example4">
                                             {t('Password')}
                                        </label>
                                        <input
                                             type="password"
                                             id="form3Example4"
                                             className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                             placeholder={t('Enter password')}
                                             {...register('password', {
                                                  required: t('Password cannot be blank'),
                                                  minLength: {
                                                       value: 6,
                                                       message: t('Password must not be less than 6 characters'),
                                                  },
                                             })}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                   </div>

                                   <div className="d-flex justify-content-between">
                                        <Link
                                             to="/taskmaneger/reset-password"
                                             className="text-decoration-none text-primary fw-semibold d-flex align-items-center">
                                             <i className="bi bi-question-circle me-2"></i>
                                             <span>{t('Forgot password?')}</span>
                                        </Link>
                                   </div>

                                   <div className="text-center text-lg-start pt-2 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
                                             {loading ? t('Signing in...') : t('Login')}
                                        </button>
                                   </div>

                                   <div className="text-center mt-2">
                                        <p className="small fw-bold mb-0">
                                             {t('Dont have an account yet?')}{' '}
                                             <Link to="/taskmaneger/register" className="link-danger">
                                                  {t('Register')}
                                             </Link>
                                        </p>
                                   </div>
                              </form>

                              <div className="divider d-flex align-items-center my-4">
                                   <p className="text-center fw-bold mx-3 mb-0">{t('Or')}</p>
                              </div>

                              <div className="d-flex justify-content-center my-4">
                                   <GoogleLogin
                                        onSuccess={handleGGLogin}
                                        onError={handleGGError}
                                        render={(renderProps) => (
                                             <button
                                                  type="button"
                                                  className="btn btn-lg btn-outline-danger social-btn google-btn w-100 d-flex align-items-center justify-content-center"
                                                  onClick={renderProps.onClick}
                                                  disabled={renderProps.disabled || loading}>
                                                  <i className="bi bi-google me-2"></i>
                                                  {t('Sign in with Google')}
                                             </button>
                                        )}
                                   />
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Login;
