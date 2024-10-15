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
     } = useForm();
     const [loading, setLoading] = useState(false);
     const [agreeToTerms, setAgreeToTerms] = useState(false);
     const navigate = useNavigate();

     const handleCheckboxChange = (e) => {
          setAgreeToTerms(e.target.checked);
     };

     const onSubmit = async (data) => {
          if (!agreeToTerms) {
               toast.error('You must agree to the terms and conditions.');
               return;
          }

          if (data.password !== data.confirmPassword) {
               toast.error('Passwords do not match.');
               return;
          }

          try {
               setLoading(true);
               const response = await register({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.confirmPassword,
               });
               console.log('Registration successful:', response);
               toast.success('Registration successful!');

               setTimeout(() => {
                    navigate('/taskmaneger/login');
               }, 1000);
          } catch (err) {
               toast.error(err.message || 'Registration failed.');
               console.error('Registration error:', err);
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
                    toast.error('You closed the login popup. Please try again.', { position: 'top-right' });
               } else {
                    toast.error('Login failed. Please try again.', { position: 'top-right' });
               }
               console.error('Google login error:', error);
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
                                   alt="Sample image"
                              />
                         </div>
                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="text"
                                             {...formRegister('name', { required: 'Name is required' })} // Sử dụng formRegister
                                             className="form-control form-control-lg"
                                             placeholder="Enter your name"
                                        />
                                        <label className="form-label" htmlFor="form3ExampleName">
                                             Name
                                        </label>
                                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                                   </div>
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="email"
                                             {...formRegister('email', { required: 'Email is required' })}
                                             className="form-control form-control-lg"
                                             placeholder="Enter a valid email address"
                                        />
                                        <label className="form-label" htmlFor="form3Example2">
                                             Email address
                                        </label>
                                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                   </div>
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="password"
                                             {...formRegister('password', {
                                                  required: 'Password is required',
                                                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                             })}
                                             className="form-control form-control-lg"
                                             placeholder="Enter password"
                                        />
                                        <label className="form-label" htmlFor="form3Example3">
                                             Password
                                        </label>
                                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                   </div>
                                   <div data-mdb-input-init className="form-outline mb-3">
                                        <input
                                             type="password"
                                             {...formRegister('confirmPassword', {
                                                  required: 'Please confirm your password',
                                                  validate: (value) =>
                                                       value === document.querySelector('[name="password"]').value || 'Passwords do not match',
                                             })}
                                             className="form-control form-control-lg"
                                             placeholder="Confirm password"
                                        />
                                        <label className="form-label" htmlFor="form3Example4">
                                             Confirm Password
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
                                                  I agree to the terms and conditions
                                             </label>
                                        </div>
                                   </div>
                                   <div className="text-center text-lg-start mt-4 pt-2">
                                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                             {loading ? 'Registering...' : 'Register'}
                                        </button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">
                                             Already have an account?{' '}
                                             <Link to="/taskmaneger/login" className="link-danger">
                                                  Login
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
          </section>
     );
}

export default Register;
