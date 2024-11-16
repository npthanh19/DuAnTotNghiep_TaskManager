import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { verifyEmail } from '../../services/authService';
import Swal from 'sweetalert2'; // Import SweetAlert2

function VerifyEmail() {
     const { userId, hash } = useParams();
     const [loading, setLoading] = useState(true);
     const [verified, setVerified] = useState(false);
     const [error, setError] = useState(null);
     const [tokenExpired, setTokenExpired] = useState(false);
     const navigate = useNavigate();

     useEffect(() => {
          const verifyUserEmail = async () => {
               try {
                    const response = await verifyEmail(userId, hash);

                    console.log(response);

                    setLoading(false);

                    if (response.message === 'Email verified and subscription updated successfully!') {
                         setVerified(true);
                         Swal.fire({
                              icon: 'success',
                              title: 'Xác minh thành công!',
                              text: 'Tài khoản của bạn đã được xác minh thành công!',
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } else if (response.message === 'Email already verified.') {
                         setVerified(true);
                         Swal.fire({
                              icon: 'info',
                              title: 'Email đã được xác minh.',
                              text: 'Tài khoản của bạn đã được xác minh trước đó.',
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } else if (response.message === 'Token has expired') {
                         setError('Token hết hạn. Vui lòng yêu cầu một liên kết xác minh mới.');
                         setTokenExpired(true);
                         Swal.fire({
                              icon: 'error',
                              title: 'Token hết hạn!',
                              text: 'Token đã hết hạn. Vui lòng yêu cầu một liên kết xác minh mới.',
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } else {
                         setError('Xác minh email thất bại. Vui lòng thử lại sau.');
                         Swal.fire({
                              icon: 'error',
                              title: 'Xác minh thất bại!',
                              text: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    }
               } catch (err) {
                    setLoading(false);
                    setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
                    setTokenExpired(true);
                    Swal.fire({
                         icon: 'error',
                         title: 'Đã có lỗi xảy ra!',
                         text: 'Vui lòng thử lại sau.',
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          };

          verifyUserEmail();
     }, [userId, hash]);

     const handleLoginRedirect = () => {
          navigate('/taskmaneger/login');
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
                              <div className="text-center">
                                   <h2>Xác minh tài khoản</h2>
                                   {loading ? (
                                        <p>Đang xác minh tài khoản của bạn...</p>
                                   ) : (
                                        <div>
                                             {verified ? (
                                                  <div>
                                                       <p>Tài khoản của bạn đã được xác minh thành công!</p>
                                                       <button onClick={handleLoginRedirect} className="btn btn-primary">
                                                            Đăng nhập ngay
                                                       </button>
                                                  </div>
                                             ) : (
                                                  <div>
                                                       <p className="text-danger">{error}</p>
                                                       <p>Vui lòng kiểm tra lại đường dẫn hoặc yêu cầu một liên kết mới nếu token đã hết hạn.</p>
                                                       {(tokenExpired || error) && (
                                                            <div className="text-center pt-2">
                                                                 <Link to="#" className="link-danger">
                                                                      Gửi lại email xác nhận
                                                                 </Link>
                                                            </div>
                                                       )}
                                                  </div>
                                             )}
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default VerifyEmail;
