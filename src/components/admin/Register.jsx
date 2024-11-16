import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

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
               Swal.fire({
                    icon: 'warning',
                    text: 'Bạn phải đồng ý với các điều khoản và điều kiện.',
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
               return;
          }

          if (data.password !== data.confirmPassword) {
               Swal.fire({
                    icon: 'error',
                    text: 'Mật khẩu không khớp.',
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
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
               Swal.fire({
                    icon: 'info',
                    title: 'Thông báo',
                    text: 'Vui lòng kiểm tra email của bạn để xác nhận tài khoản.',
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });

               setTimeout(() => {
                    navigate('/taskmaneger/confirm-email');
               }, 1000);
          } catch (err) {
               Swal.fire({
                    icon: 'error',
                    text: err.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại Email.',
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
               console.error('Lỗi đăng ký:', err);
          } finally {
               setLoading(false);
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
                                   alt="Ảnh minh họa"
                              />
                         </div>
                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 border rounded-4 shadow-lg bg-white p-4">
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <div data-mdb-input-init className="form-outline">
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
                                   <div data-mdb-input-init className="form-outline ">
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
                                   <div data-mdb-input-init className="form-outline ">
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
                                   <div data-mdb-input-init className="form-outline">
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
                                   <div className="text-center text-lg-start pt-2 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-secondary btn-sm w-100 " disabled={loading}>
                                             {loading ? 'Đang đăng ký...' : 'Đăng ký '}
                                        </button>
                                   </div>
                                   <div className="text-center text-lg-start pt-2">
                                        {' '}
                                        <p className="small fw-bold pt-1 mb-0">
                                             Đã có tài khoản?{' '}
                                             <Link to="/taskmaneger/login" className="link-danger">
                                                  Đăng nhập
                                             </Link>
                                        </p>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default Register;
