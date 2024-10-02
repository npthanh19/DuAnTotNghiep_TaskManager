import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
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
                              <form>
                                   {/* Name input */}
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="text"
                                             id="form3Example1"
                                             className="form-control form-control-lg"
                                             placeholder="Enter your name"
                                        />
                                        <label className="form-label" htmlFor="form3Example1">
                                             Full Name
                                        </label>
                                   </div>
                                   {/* Email input */}
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="email"
                                             id="form3Example2"
                                             className="form-control form-control-lg"
                                             placeholder="Enter a valid email address"
                                        />
                                        <label className="form-label" htmlFor="form3Example2">
                                             Email address
                                        </label>
                                   </div>
                                   {/* Password input */}
                                   <div data-mdb-input-init className="form-outline mb-4">
                                        <input
                                             type="password"
                                             id="form3Example3"
                                             className="form-control form-control-lg"
                                             placeholder="Enter password"
                                        />
                                        <label className="form-label" htmlFor="form3Example3">
                                             Password
                                        </label>
                                   </div>
                                   {/* Confirm Password input */}
                                   <div data-mdb-input-init className="form-outline mb-3">
                                        <input
                                             type="password"
                                             id="form3Example4"
                                             className="form-control form-control-lg"
                                             placeholder="Confirm password"
                                        />
                                        <label className="form-label" htmlFor="form3Example4">
                                             Confirm Password
                                        </label>
                                   </div>
                                   <div className="d-flex justify-content-between align-items-center">
                                        {/* Checkbox */}
                                        <div className="form-check mb-0">
                                             <input className="form-check-input me-2" type="checkbox" id="form2Example3" />
                                             <label className="form-check-label" htmlFor="form2Example3">
                                                  I agree to the terms and conditions
                                             </label>
                                        </div>
                                   </div>
                                   <div className="text-center text-lg-start mt-4 pt-2">
                                        <Link to="#" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                                             Register
                                        </Link>
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
                                   <button type="button" className="btn btn-lg btn-floating mx-1 social-btn google-btn">
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
