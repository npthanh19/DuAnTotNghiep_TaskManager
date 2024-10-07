import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { Link } from 'react-router-dom';
import { axiosi } from '../../config/axios';
import { login } from '../../services/authService';
import { auth, signInWithGooglePopup } from '../../utils/firebase.utils';
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
                    console.log('Token retrieved:', response.access_token);
                    axiosi.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;
                    toast.success(`Welcome back, ${data.email}!`, { position: 'top-right' });
                    setTimeout(() => {
                         window.location.href = '/taskmaneger';
                    }, 1000);
               } else {
                    toast.error('Invalid login response', { position: 'top-right' });
               }
          } catch (error) {
               toast.error(error.message || 'Login failed. Please try again.', { position: 'top-right' });
          }
     };

     const logGoogleUser = async () => {
          const provider = new GoogleAuthProvider(); // Tạo provider
          try {
              const response = await signInWithPopup(auth, provider); // Sử dụng signInWithPopup
              const credential = GoogleAuthProvider.credentialFromResult(response);
              const token = credential.accessToken;
      
              // Gửi token đến backend để xác thực
              const result = await axiosi.post('/api/google-login', { token });
              if (result && result.data.access_token) {
                  localStorage.setItem('isAuthenticated', 'true');
                  localStorage.setItem('token', result.data.access_token);
                  axiosi.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`;
                  window.location.href = '/taskmaneger'; // Chuyển hướng đến trang admin
              } else {
                  toast.error('Invalid login response', { position: 'top-right' });
              }
          } catch (error) {
              if (error.code === 'auth/popup-closed-by-user') {
                  toast.error('You closed the login popup. Please try again.', { position: 'top-right' });
              } else {
                  toast.error('Login failed. Please try again.', { position: 'top-right' });
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
                                             placeholder="Enter a valid email address"
                                             {...register('email', { required: 'Email is required' })}
                                        />
                                        <label className="form-label" htmlFor="form3Example3">
                                             Email address
                                        </label>
                                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                   </div>

                                   <div data-mdb-input-init className="form-outline mb-3">
                                        <input
                                             type="password"
                                             id="form3Example4"
                                             className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                             placeholder="Enter password"
                                             {...register('password', { required: 'Password is required' })}
                                        />
                                        <label className="form-label" htmlFor="form3Example4">
                                             Password
                                        </label>
                                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                   </div>

                                   <div className="d-flex justify-content-between align-items-center">
                                        <div className="form-check mb-0">
                                             <input className="form-check-input me-2" type="checkbox" id="form2Example3" />
                                             <label className="form-check-label" htmlFor="form2Example3">
                                                  Remember me
                                             </label>
                                        </div>
                                        <a href="#!" className="text-body">
                                             Forgot password?
                                        </a>
                                   </div>

                                   <div className="text-center text-lg-start mt-4 pt-2">
                                        <button
                                             type="submit"
                                             className="btn btn-primary btn-lg"
                                             style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                             Login
                                        </button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">
                                             Don't have an account?{' '}
                                             <Link to="/taskmaneger/register" className="link-danger">
                                                  Register
                                             </Link>
                                        </p>
                                   </div>
                              </form>

                              <div className="divider d-flex align-items-center my-4">
                                   <p className="text-center fw-bold mx-3 mb-0">Or</p>
                              </div>

                              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                   <p className="lead fw-normal mb-0 me-3">Sign in with</p>
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
