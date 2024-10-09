import React from 'react';
import '../../sections/client/Style.css';

export default function Footer() {
     return (
          <div>
               <footer className="landing-footer">
                    <div className="footer-top position-relative overflow-hidden">
                         <img src="/assets/client/image/img-footer/footer-bg.png" alt="footer bg" className="footer-bg banner-bg-img" />
                         <div className="container position-relative">
                              <div className="row gx-0 gy-7 gx-sm-6 gx-lg-12">
                                   <div className="col-lg-5">
                                        <a href="/" className="app-brand-link mb-6">
                                        <h1 class="app-brand-text demo fw-semibold ms-1">NHĐT</h1>
                                        </a>
                                        <p className="footer-text footer-logo-description mb-6 h5 footer-text-limited">
                                             Giải pháp quản lý công việc mạnh mẽ và toàn diện 🤩 với thiết kế hiện đại và bố cục độc đáo.
                                        </p>

                                        <form>
                                             <div className="d-flex mt-2 gap-4">
                                                  <div className="form-floating form-floating-outline w-px-250">
                                                       <input
                                                            type="text"
                                                            id="newsletter-1"
                                                            className="form-control bg-transparent"
                                                            placeholder="Email của bạn"
                                                            required
                                                       />
                                                       <label htmlFor="newsletter-1" className='btn-register'>Đăng ký nhận bản tin</label>
                                                  </div>
                                                  <button type="submit" className="btn btn-primary waves-effect waves-light btn-small">
                                                       Đăng ký
                                                  </button>
                                             </div>
                                        </form>
                                   </div>

                                   <div className="col-lg-2 col-md-4 col-sm-6">
                                        <h6 className="footer-title mb-4 mb-lg-6 h4">Chức năng</h6>
                                        <ul className="list-unstyled mb-0">
                                             <li className="mb-2">
                                                  <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link h6">
                                                       Quản lý dự án
                                                  </a>
                                             </li>
                                             <li className="mb-2">
                                                  <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link h6">
                                                       Theo dõi thời gian
                                                  </a>
                                             </li>
                                             <li className="mb-2">
                                                  <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link h6">
                                                       Tạo báo cáo
                                                  </a>
                                             </li>
                                             <li className="mb-2">
                                                  <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link h6">
                                                       Quản lý nhiệm vụ
                                                  </a>
                                             </li>
                                             <li className="mb-2">
                                                  <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link h6">
                                                       Thống kê hiệu suất
                                                  </a>
                                             </li>
                                        </ul>
                                   </div>

                                   <div className="col-lg-2 col-md-4 col-sm-6">
                                        <h6 className="footer-title mb-4 mb-lg-6 h4">Trang</h6>
                                        <ul className="list-unstyled mb-0">
                                             <li className="mb-2">
                                                  <a href="#" className="footer-link h6">
                                                       Giá cả
                                                  </a>
                                             </li>
                                             <li className="mb-2">
                                                  <a href="#" className="footer-link h6">
                                                       Thanh toán <span className="badge rounded-pill bg-primary ms-2">Mới</span>
                                                  </a>
                                             </li>
                                             <li className="mb-2">
                                                  <a href="#" className="footer-link h6">
                                                       Kiểm tra
                                                  </a>
                                             </li>
                                             <li className="mb-2">
                                                  <a href="#" className="footer-link h6">
                                                       Trung tâm hỗ trợ
                                                  </a>
                                             </li>
                                             <li className="mb-5">
                                                  <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link h6">
                                                       Đăng nhập/Đăng ký
                                                  </a>
                                             </li>
                                        </ul>
                                   </div>

                                   <div className="col-lg-3 col-md-4">
                                        <h6 className="footer-title mb-4 mb-lg-6 h4">Tải ứng dụng của chúng tôi</h6>
                                        <a href="#" className="d-block footer-link mb-4 footer-app-icon">
                                             <img src="/assets/client/image/img-footer/apple-icon.png" alt="apple icon" className="mb-3" />
                                        </a>
                                        <a href="#" className="d-block footer-link footer-app-icon">
                                             <img src="/assets/client/image/img-footer/google-play-icon.png" alt="google play icon" />
                                        </a>
                                   </div>
                              </div>
                         </div>
                    </div>
               </footer>
          </div>
     );
}
