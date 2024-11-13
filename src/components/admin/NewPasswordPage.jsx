import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '../../services/authService';
import Swal from 'sweetalert2';

const NewPasswordPage = () => {
     const navigate = useNavigate();

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm();

     const onSubmit = async (data) => {
          try {
               const emailOrPhone = sessionStorage.getItem('email_or_phone');

               if (!emailOrPhone) {
                    Swal.fire({
                         icon: 'error',
                         title: 'Thông tin xác minh không hợp lệ hoặc đã hết hạn!',
                         position: 'top-end',
                         toast: true,
                         timer: 2000,
                         showConfirmButton: false,
                    });
                    return;
               }

               const passwordData = {
                    new_password: data.newPassword,
                    ...(emailOrPhone.includes('@') ? { email: emailOrPhone } : { phone_number: emailOrPhone }),
               };

               const response = await resetPassword(passwordData);

               if (response && response.status === 200) {
                    Swal.fire({
                         icon: 'success',
                         title: response.data?.message || 'Mật khẩu đã được thay đổi thành công!',
                         position: 'top-end',
                         toast: true,
                         timer: 2000,
                         showConfirmButton: false,
                    });

                    navigate('/taskmaneger/login');
               } else {
                    console.log('Unexpected response:', response);
                    Swal.fire({
                         icon: 'error',
                         title: response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!',
                         position: 'top-end',
                         toast: true,
                         timer: 2000,
                         showConfirmButton: false,
                    });
               }
          } catch (error) {
               console.error('API call error:', error); 
               Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra, vui lòng thử lại!',
                    position: 'top-end',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               });
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
                              <h2 className="text-center mb-4">Nhập Mật Khẩu Mới</h2>

                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <div className="mb-3">
                                        <label className="form-label">Mật khẩu mới</label>
                                        <input
                                             type="password"
                                             className={`form-control form-control-sm ${errors.newPassword ? 'is-invalid' : ''}`}
                                             placeholder="Nhập mật khẩu mới"
                                             {...register('newPassword', {
                                                  required: 'Mật khẩu không được để trống',
                                                  minLength: {
                                                       value: 6,
                                                       message: 'Mật khẩu phải có ít nhất 6 ký tự',
                                                  },
                                             })}
                                        />
                                        {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
                                   </div>

                                   <div className="text-center mt-4 pt-2">
                                        <button type="submit" className="btn btn-primary btn-sm">
                                             Cập nhật mật khẩu
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

export default NewPasswordPage;
