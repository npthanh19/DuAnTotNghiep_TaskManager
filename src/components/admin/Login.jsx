import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
     const navigate = useNavigate();

     const handleLogin = (e) => {
          e.preventDefault();
          navigate('/admin');
     };

     return (
          <div className="container-fluid vh-100 d-flex">
               <div className="row w-100 m-0">
                    <div className="col-md-6 p-0 d-none d-md-flex justify-content-center align-items-center bg-light">
                         <img src="/assets/admin/img/illustrations/misc-under-maintenance.png" className="img-fluid" alt="Maintenance" />
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center p-4">
                         <div className="card w-100 p-4 p-md-5">
                              <div className="app-brand justify-content-center mb-4">
                                   <Link to="/admin" className="app-brand-link d-flex align-items-center gap-3">
                                        <span className="app-brand-logo demo" style={{ color: '#9055fd' }}>
                                             <svg width={30} height={24} viewBox="0 0 250 196" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M12.3002 1.25469L56.655 28.6432C59.0349 30.1128 60.4839 32.711 60.4839 35.5089V160.63C60.4839 163.468 58.9941 166.097 56.5603 167.553L12.2055 194.107C8.3836 196.395 3.43136 195.15 1.14435 191.327C0.395485 190.075 0 188.643 0 187.184V8.12039C0 3.66447 3.61061 0.0522461 8.06452 0.0522461C9.56056 0.0522461 11.0271 0.468577 12.3002 1.25469Z"
                                                       fill="currentColor"
                                                  />
                                                  <path
                                                       opacity="0.077704"
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M0 65.2656L60.4839 99.9629V133.979L0 65.2656Z"
                                                       fill="black"
                                                  />
                                                  <path
                                                       opacity="0.077704"
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M0 65.2656L60.4839 99.0795V119.859L0 65.2656Z"
                                                       fill="black"
                                                  />
                                                  <path
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M237.71 1.22393L193.355 28.5207C190.97 29.9889 189.516 32.5905 189.516 35.3927V160.631C189.516 163.469 191.006 166.098 193.44 167.555L237.794 194.108C241.616 196.396 246.569 195.151 248.856 191.328C249.605 190.076 250 188.644 250 187.185V8.09597C250 3.64006 246.389 0.027832 241.935 0.027832C240.444 0.027832 238.981 0.441882 237.71 1.22393Z"
                                                       fill="currentColor"
                                                  />
                                                  <path
                                                       opacity="0.077704"
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M250 65.2656L189.516 99.8897V135.006L250 65.2656Z"
                                                       fill="black"
                                                  />
                                                  <path
                                                       opacity="0.077704"
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M250 65.2656L189.516 99.0497V120.886L250 65.2656Z"
                                                       fill="black"
                                                  />
                                                  <path
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M12.2787 1.18923L125 70.3075V136.87L0 65.2465V8.06814C0 3.61223 3.61061 0 8.06452 0C9.552 0 11.0105 0.411583 12.2787 1.18923Z"
                                                       fill="currentColor"
                                                  />
                                                  <path
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M12.2787 1.18923L125 70.3075V136.87L0 65.2465V8.06814C0 3.61223 3.61061 0 8.06452 0C9.552 0 11.0105 0.411583 12.2787 1.18923Z"
                                                       fill="white"
                                                       fillOpacity="0.15"
                                                  />
                                                  <path
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M237.721 1.18923L125 70.3075V136.87L250 65.2465V8.06814C250 3.61223 246.389 0 241.935 0C240.448 0 238.99 0.411583 237.721 1.18923Z"
                                                       fill="currentColor"
                                                  />
                                                  <path
                                                       fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       d="M237.721 1.18923L125 70.3075V136.87L250 65.2465V8.06814C250 3.61223 246.389 0 241.935 0C240.448 0 238.99 0.411583 237.721 1.18923Z"
                                                       fill="white"
                                                       fillOpacity="0.3"
                                                  />
                                             </svg>
                                        </span>
                                        <span className="app-brand-text demo text-heading fw-semibold">NHĐT</span>
                                   </Link>
                              </div>
                              <div className="card-body">
                                   <h4 className="mb-3">Chào mừng đến với trang quản trị 👋🏻</h4>
                                   <p className="mb-4">Vui lòng đăng nhập thông tin tài khoản của bạn</p>
                                   <form id="formAuthentication" className="mb-4" onSubmit={handleLogin}>
                                        <div className="form-floating mb-4">
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  id="email"
                                                  name="email-username"
                                                  placeholder="Vui lòng nhập Email của bạn"
                                                  autoFocus
                                             />
                                             <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                             <input
                                                  type="password"
                                                  id="password"
                                                  className="form-control"
                                                  name="password"
                                                  placeholder="············"
                                                  aria-describedby="password"
                                             />
                                             <label htmlFor="password">Mật khẩu</label>
                                        </div>
                                        <div className="mb-4 d-flex justify-content-between align-items-center">
                                             <div className="form-check mb-0">
                                                  <input className="form-check-input" type="checkbox" id="remember-me" />
                                                  <label className="form-check-label" htmlFor="remember-me">
                                                       {' '}
                                                       Ghi nhớ đăng nhập{' '}
                                                  </label>
                                             </div>
                                             <Link to="/forgot-password" className="float-end">
                                                  <span>Quên mật khẩu?</span>
                                             </Link>
                                        </div>
                                        <div className="mb-4 d-flex justify-content-center align-items-center">
                                             <button className="btn btn-primary w-75" type="submit">
                                                  Đăng nhập
                                             </button>
                                        </div>
                                   </form>
                                   <div className="row">
                                        <div className="col-12">
                                             <p className="mt-5 mb-5">Tiếp tục với</p>
                                             <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                                                  <a href="#!" className="btn btn-lg btn-outline-danger p-3 lh-1">
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={28}
                                                            height={28}
                                                            fill="currentColor"
                                                            className="bi bi-google"
                                                            viewBox="0 0 16 16">
                                                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                       </svg>
                                                  </a>
                                                  <a href="#!" className="btn btn-lg btn-outline-primary p-3 lh-1">
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={28}
                                                            height={28}
                                                            fill="currentColor"
                                                            className="bi bi-facebook"
                                                            viewBox="0 0 16 16">
                                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                       </svg>
                                                  </a>
                                                  <a href="#!" className="btn btn-lg btn-outline-dark p-3 lh-1">
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={28}
                                                            height={28}
                                                            fill="currentColor"
                                                            className="bi bi-apple"
                                                            viewBox="0 0 16 16">
                                                            <path d="M11.318 1.278c-.943.111-1.984.688-2.631 1.507-.568.725-1.013 1.779-.833 2.82 1.036.053 2.11-.566 2.747-1.376.576-.74.992-1.788.717-2.951zm1.593 8.545c-.044-2.278 1.785-3.38 1.87-3.434-.997-1.457-2.541-1.659-3.085-1.682-1.3-.132-2.534.756-3.195.756-.662 0-1.676-.738-2.758-.717-1.417.021-2.736.823-3.466 2.092-1.475 2.557-.378 6.334 1.058 8.4.704 1.02 1.543 2.161 2.64 2.12 1.048-.041 1.444-.686 2.709-.686 1.264 0 1.631.686 2.758.664 1.14-.021 1.859-1.041 2.563-2.061.812-1.174 1.148-2.307 1.169-2.365-.026-.012-2.248-.865-2.294-3.439z" />
                                                       </svg>
                                                  </a>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
