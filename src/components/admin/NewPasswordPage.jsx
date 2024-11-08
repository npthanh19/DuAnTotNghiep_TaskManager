import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const NewPasswordPage = () => {
     const navigate = useNavigate();

     const {
          register,
          handleSubmit,
          formState: { errors },
     } = useForm();

     const onSubmit = (data) => {
          if (data.newPassword !== data.confirmPassword) {
               toast.error('Mật khẩu và xác nhận mật khẩu không khớp!', {
                    position: 'top-right',
               });
               return;
          }

          toast.success('Mật khẩu đã được thay đổi thành công!', {
               position: 'top-right',
          });

          setTimeout(() => {
               navigate('/taskmaneger/login');
          }, 1500);
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

                                   <div className="mb-3">
                                        <label className="form-label">Xác nhận mật khẩu</label>
                                        <input
                                             type="password"
                                             className={`form-control form-control-sm ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                             placeholder="Xác nhận mật khẩu"
                                             {...register('confirmPassword', {
                                                  required: 'Xác nhận mật khẩu không được để trống',
                                                  minLength: {
                                                       value: 6,
                                                       message: 'Mật khẩu xác nhận phải có ít nhất 6 ký tự',
                                                  },
                                             })}
                                        />
                                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
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
