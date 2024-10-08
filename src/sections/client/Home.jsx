import React from 'react';
import '../client/Style.css';

export const Home = () => {
     return (
          <div>
                    {/* Section 1 */}
                    <section id="landingHero" className="landing-hero position-relative">
                         <div className="img-wrapper position-absolute top-0 start-0 w-100 h-100 z-n1">
                              <img
                                   src="/assets/client/image/img-hero/hero-bg-light.png"
                                   alt="hero background"
                                   className="w-100 h-100"
                                   data-speed="1"
                                   data-app-light-img="front-pages/backgrounds/hero-bg-light.png"
                                   data-app-dark-img="front-pages/backgrounds/hero-bg-dark.png"
                              />
                         </div>
                         <div className="container">
                              <div className="hero-text-box text-center">
                                   <h2 className="text-primary hero-title mb-4 h1">Quản lý Công việc Dễ Dàng</h2>
                                   <h3 className="h5 mb-8 lh-md">
                                        Tối ưu hóa quy trình làm việc của bạn
                                        <br />
                                        Theo dõi và hoàn thành công việc hiệu quả
                                   </h3>
                                   <a href="#" className="btn btn-lg btn-primary waves-effect waves-light">
                                        Tham gia ngay
                                   </a>
                              </div>

                              <div className="position-relative hero-animation-img">
                                   <a href="#" target="_blank" rel="noopener noreferrer" className="hero-image-container">
                                        <div className="hero-dashboard-img text-center">
                                             <img
                                                  src="/assets/client/image/img-hero/hero-dashboard-light.png"
                                                  alt="hero dashboard"
                                                  className="animation-img hero-img"
                                                  data-speed="2"
                                                  data-app-light-img="front-pages/landing-page/hero-dashboard-light.png"
                                                  data-app-dark-img="front-pages/landing-page/hero-dashboard-dark.png"
                                             />
                                        </div>
                                        <div className="hero-elements-img text-center">
                                             <img
                                                  src="/assets/client/image/img-hero/hero-elements-light.png"
                                                  alt="hero elements"
                                                  className="animation-img hero-img"
                                                  data-speed="4"
                                                  data-app-light-img="front-pages/landing-page/hero-elements-light.png"
                                                  data-app-dark-img="front-pages/landing-page/hero-elements-dark.png"
                                             />
                                        </div>
                                   </a>
                              </div>
                         </div>
                    </section>

                    {/* Section 2 */}
                    <section id="landingFeatures" className="section-py landing-features">
                         <div className="container">
                              <div className="text-center">
                                   <h6 className="d-flex justify-content-center align-items-center custom-margin">
                                        <img src="/assets/client/icon/section-tilte-icon.png" alt="section title icon" className="me-2" height="19" />
                                        <span className="text-uppercase h5">Tính năng hữu ích</span>
                                   </h6>
                                   <h5 className="custom-h5-margin">
                                        <span className="h4 fw-bold">Mọi thứ bạn cần</span> để quản lý công việc hiệu quả
                                   </h5>
                                   <p className="text-center fw-medium mb-4 mb-md-12">
                                        Các tính năng tối ưu giúp bạn dễ dàng quản lý, theo dõi và hoàn thành công việc.
                                   </p>
                                   <div className="features-icon-wrapper row gx-0 gy-12 gx-sm-6">
                                        {/* Feature 1 */}
                                        <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                             <div className="features-icon mb-4">
                                                  <img src="/assets/client/icon/laptop-charging.png" alt="Theo dõi công việc" />
                                             </div>
                                             <h5 className="mb-2">Theo dõi công việc</h5>
                                             <p className="features-icon-description">
                                                  Theo dõi tiến độ công việc của bạn theo thời gian thực và đảm bảo deadline.
                                             </p>
                                        </div>
                                        {/* Feature 2 */}
                                        <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                             <div className="features-icon mb-4">
                                                  <img src="/assets/client/icon/transition-up.png" alt="Hợp tác nhóm" />
                                             </div>
                                             <h5 className="mb-2">Hợp tác nhóm</h5>
                                             <p className="features-icon-description">
                                                  Làm việc dễ dàng với các thành viên trong nhóm, phân công nhiệm vụ và chia sẻ thông tin.
                                             </p>
                                        </div>
                                        {/* Feature 3 */}
                                        <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                             <div className="features-icon mb-4">
                                                  <img src="/assets/client/icon/edit.png" alt="Báo cáo chi tiết" />
                                             </div>
                                             <h5 className="mb-2">Báo cáo chi tiết</h5>
                                             <p className="features-icon-description">
                                                  Tạo báo cáo chi tiết về tiến độ, kết quả và hiệu suất công việc một cách dễ dàng.
                                             </p>
                                        </div>
                                        {/* Feature 4 */}
                                        <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                             <div className="features-icon mb-4">
                                                  <img src="/assets/client/icon/3d-select-solid.png" alt="Quản lý thời gian" />
                                             </div>
                                             <h5 className="mb-2">Quản lý thời gian</h5>
                                             <p className="features-icon-description">
                                                  Quản lý thời gian hiệu quả với lịch biểu và thông báo nhắc nhở.
                                             </p>
                                        </div>
                                        {/* Feature 5 */}
                                        <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                             <div className="features-icon mb-4">
                                                  <img src="/assets/client/icon/lifebelt.png" alt="Quản lý dự án" />
                                             </div>
                                             <h5 className="mb-2">Quản lý dự án</h5>
                                             <p className="features-icon-description">
                                                  Quản lý và phân bổ công việc cho từng dự án để đảm bảo tiến độ hoàn thành.
                                             </p>
                                        </div>
                                        {/* Feature 6 */}
                                        <div className="col-lg-4 col-sm-6 text-center features-icon-box">
                                             <div className="features-icon mb-4">
                                                  <img src="/assets/client/icon/google-docs.png" alt="Bảo mật dữ liệu" />
                                             </div>
                                             <h5 className="mb-2">Bảo mật dữ liệu</h5>
                                             <p className="features-icon-description">
                                                  Đảm bảo an toàn cho dữ liệu công việc của bạn với hệ thống bảo mật cao cấp.
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Section 3 */}
                    <section id="landingReviews" className="bg-body landing-reviews">
                         <div className="container">
                              <h6 className="text-center d-flex justify-content-center align-items-center mb-2">
                                   <img src="/assets/client/icon/section-tilte-icon.png" alt="section title icon" className="me-2" height="19" />
                                   <span className="text-uppercase h5">Đánh giá từ khách hàng</span>
                              </h6>
                              <h5 className="text-center mb-2">
                                   <span className="h4 fw-bold">Câu chuyện thành công</span> từ khách hàng
                              </h5>
                              <p className="text-center fw-medium mb-4 mb-md-2">
                                   Xem khách hàng của chúng tôi chia sẻ về trải nghiệm quản lý công việc của họ.
                              </p>
                         </div>

                         <div className="swiper-reviews-carousel overflow-hidden mb-12 pt-4">
                              <div className="swiper" id="swiper-reviews">
                                   <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                             <div className="card h-100">
                                                  <div className="card-body text-body d-flex flex-column justify-content-between text-center p-lg-8">
                                                       <div className="mb-2">
                                                            <img
                                                                 src="/assets/client/icon/logo-5.png"
                                                                 alt="client logo"
                                                                 className="client-logo img-fluid"
                                                            />
                                                       </div>
                                                       <p className="text-heading">
                                                            Phần mềm quản lý công việc giúp tôi theo dõi tiến độ và giao tiếp với đội ngũ dễ dàng hơn
                                                            bao giờ hết!
                                                       </p>
                                                       <div className="text-warning mb-4">
                                                            {[...Array(5)].map((_, starIndex) => (
                                                                 <i key={starIndex} className="tf-icons ri-star-fill ri-24px"></i>
                                                            ))}
                                                       </div>
                                                       <div>
                                                            <h6 className="mb-1">Anna Nguyen</h6>
                                                            <p className="mb-0 small">Giám đốc dự án tại Tech Solutions</p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="swiper-slide">
                                             <div className="card h-100">
                                                  <div className="card-body text-body d-flex flex-column justify-content-between text-center p-lg-8">
                                                       <div className="mb-2">
                                                            <img
                                                                 src="/assets/client/icon/logo-2.png"
                                                                 alt="client logo"
                                                                 className="client-logo img-fluid"
                                                            />
                                                       </div>
                                                       <p className="text-heading">
                                                            Từ khi sử dụng phần mềm này, công việc của tôi trở nên có tổ chức hơn và hiệu quả hơn.
                                                       </p>
                                                       <div className="text-warning mb-4">
                                                            {[...Array(5)].map((_, starIndex) => (
                                                                 <i key={starIndex} className="tf-icons ri-star-fill ri-24px"></i>
                                                            ))}
                                                       </div>
                                                       <div>
                                                            <h6 className="mb-1">John Doe</h6>
                                                            <p className="mb-0 small">Giám đốc điều hành tại Business Corp</p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="swiper-slide">
                                             <div className="card h-100">
                                                  <div className="card-body text-body d-flex flex-column justify-content-between text-center p-lg-8">
                                                       <div className="mb-2">
                                                            <img
                                                                 src="/assets/client/icon/logo-3.png"
                                                                 alt="client logo"
                                                                 className="client-logo img-fluid"
                                                            />
                                                       </div>
                                                       <p className="text-heading">
                                                            Tôi đã cải thiện đáng kể sự giao tiếp giữa các thành viên trong nhóm nhờ vào công cụ này.
                                                       </p>
                                                       <div className="text-warning mb-4">
                                                            {[...Array(5)].map((_, starIndex) => (
                                                                 <i key={starIndex} className="tf-icons ri-star-fill ri-24px"></i>
                                                            ))}
                                                       </div>
                                                       <div>
                                                            <h6 className="mb-1">Lisa Tran</h6>
                                                            <p className="mb-0 small">Quản lý tại Creative Agency</p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="swiper-slide">
                                             <div className="card h-100">
                                                  <div className="card-body text-body d-flex flex-column justify-content-between text-center p-lg-8">
                                                       <div className="mb-2">
                                                            <img
                                                                 src="/assets/client/icon/logo-4.png"
                                                                 alt="client logo"
                                                                 className="client-logo img-fluid"
                                                            />
                                                       </div>
                                                       <p className="text-heading">
                                                            Phần mềm giúp tôi quản lý thời gian và công việc hiệu quả, tăng cường năng suất làm việc.
                                                       </p>
                                                       <div className="text-warning mb-4">
                                                            {[...Array(5)].map((_, starIndex) => (
                                                                 <i key={starIndex} className="tf-icons ri-star-fill ri-24px"></i>
                                                            ))}
                                                       </div>
                                                       <div>
                                                            <h6 className="mb-1">David Kim</h6>
                                                            <p className="mb-0 small">Chủ tịch tại StartUp Inc</p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="container">
                                        <div className="swiper-logo-carousel pt-lg-5 mt-xxl-5">
                                             <div className="swiper" id="swiper-clients-logos">
                                                  <div className="swiper-wrapper">
                                                       <div className="swiper-slide">
                                                            <img
                                                                 src="/assets/client/icon/icon-light/logo-1-light.png"
                                                                 alt="client logo"
                                                                 className="client-logo"
                                                                 data-app-light-img="front-pages/branding/logo-1-light.png"
                                                                 data-app-dark-img="front-pages/branding/logo-1-dark.png"
                                                            />
                                                       </div>
                                                       <div className="swiper-slide">
                                                            <img
                                                                 src="/assets/client/icon/icon-light/logo-2-light.png"
                                                                 alt="client logo"
                                                                 className="client-logo"
                                                                 data-app-light-img="front-pages/branding/logo-2-light.png"
                                                                 data-app-dark-img="front-pages/branding/logo-2-dark.png"
                                                            />
                                                       </div>
                                                       <div className="swiper-slide">
                                                            <img
                                                                 src="/assets/client/icon/icon-light/logo-3-light.png"
                                                                 alt="client logo"
                                                                 className="client-logo"
                                                                 data-app-light-img="front-pages/branding/logo-3-light.png"
                                                                 data-app-dark-img="front-pages/branding/logo-3-dark.png"
                                                            />
                                                       </div>
                                                       <div className="swiper-slide">
                                                            <img
                                                                 src="/assets/client/icon/icon-light/logo-4-light.png"
                                                                 alt="client logo"
                                                                 className="client-logo"
                                                                 data-app-light-img="front-pages/branding/logo-4-light.png"
                                                                 data-app-dark-img="front-pages/branding/logo-4-dark.png"
                                                            />
                                                       </div>
                                                       <div className="swiper-slide">
                                                            <img
                                                                 src="/assets/client/icon/icon-light/logo-5-light.png"
                                                                 alt="client logo"
                                                                 className="client-logo"
                                                                 data-app-light-img="front-pages/branding/logo-5-light.png"
                                                                 data-app-dark-img="front-pages/branding/logo-5-dark.png"
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Section 4 */}
                    <section id="landingTeam" className="section-py landing-team">
                         <div className="container bg-icon-right position-relative">
                              <img
                                   src="/assets/client/icon/bg-right-icon-light.png"
                                   alt="section icon"
                                   className="position-absolute top-0 end-0"
                                   data-speed="1"
                                   data-app-light-img="front-pages/icons/bg-right-icon-light.png"
                                   data-app-dark-img="front-pages/icons/bg-right-icon-dark.png"
                              />
                              <h6 className="text-center d-flex justify-content-center align-items-center mb-6">
                                   <img src="/assets/client/icon/section-tilte-icon.png" alt="section title icon" className="me-2" height="19" />
                                   <span className="text-uppercase h5">đội ngũ xuất sắc của chúng tôi</span>
                              </h6>
                              <h5 className="text-center mb-2">
                                   <span className="h4 fw-bold">Hỗ trợ</span> bởi những người thực
                              </h5>
                              <p className="text-center fw-medium mb-4 mb-md-12 pb-7">
                                   Ai là những người đứng sau các giải pháp quản lý công việc tuyệt vời này?
                              </p>
                              <div className="row gy-lg-5 gy-12 mt-2">
                                   <div className="col-lg-3 col-sm-6">
                                        <div className="card card-hover-border-primary mt-4 mt-lg-0 shadow-none">
                                             <div className="card-body text-center">
                                                  <div className="bg-label-primary position-relative team-image-box">
                                                       <img
                                                            src="/assets/client/image/img-team/team-member-1.png"
                                                            alt="human image"
                                                            className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                                                       />
                                                  </div>
                                                  <h5 className="card-title mb-0 mt-3">Sophie Gilbert</h5>
                                                  <p className="card-text mb-3">Giám đốc Dự án</p>
                                                  <div className="text-center team-media-icons">
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-facebook-circle-line ri-22px me-2"></i>
                                                       </a>
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-twitter-line ri-22px me-2"></i>
                                                       </a>
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-linkedin-box-line ri-22px"></i>
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="col-lg-3 col-sm-6">
                                        <div className="card card-hover-border-primary mt-4 mt-lg-0 shadow-none">
                                             <div className="card-body text-center">
                                                  <div className="bg-label-danger position-relative team-image-box">
                                                       <img
                                                            src="/assets/client/image/img-team/team-member-2.png"
                                                            alt="human image"
                                                            className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                                                       />
                                                  </div>
                                                  <h5 className="card-title mb-0 mt-3">David Tran</h5>
                                                  <p className="card-text mb-3">Chuyên gia Tư vấn Quản lý</p>
                                                  <div className="text-center team-media-icons">
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-facebook-circle-line ri-22px me-2"></i>
                                                       </a>
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-twitter-line ri-22px me-2"></i>
                                                       </a>
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-linkedin-box-line ri-22px"></i>
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="col-lg-3 col-sm-6">
                                        <div className="card card-hover-border-primary mt-4 mt-lg-0 shadow-none">
                                             <div className="card-body text-center">
                                                  <div className="bg-label-success position-relative team-image-box">
                                                       <img
                                                            src="/assets/client/image/img-team/team-member-3.png"
                                                            alt="human image"
                                                            className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                                                       />
                                                  </div>
                                                  <h5 className="card-title mb-0 mt-3">Lisa Nguyen</h5>
                                                  <p className="card-text mb-3">Quản lý Sản phẩm</p>
                                                  <div className="text-center team-media-icons">
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-facebook-circle-line ri-22px me-2"></i>
                                                       </a>
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-twitter-line ri-22px me-2"></i>
                                                       </a>
                                                       <a
                                                            href="https://www.linkedin.com/in/lisa-nguyen"
                                                            className="text-heading"
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            <i className="tf-icons ri-linkedin-box-line ri-22px"></i>
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="col-lg-3 col-sm-6">
                                        <div className="card card-hover-border-primary mt-4 mt-lg-0 shadow-none">
                                             <div className="card-body text-center">
                                                  <div className="bg-label-info position-relative team-image-box">
                                                       <img
                                                            src="/assets/client/image/img-team/team-member-4.png"
                                                            alt="human image"
                                                            className="position-absolute card-img-position bottom-0 start-50 scaleX-n1-rtl"
                                                       />
                                                  </div>
                                                  <h5 className="card-title mb-0 mt-3">John Doe</h5>
                                                  <p className="card-text mb-3">Chuyên gia Tối ưu hóa Quy trình</p>
                                                  <div className="text-center team-media-icons">
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-facebook-circle-line ri-22px me-2"></i>
                                                       </a>
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-twitter-line ri-22px me-2"></i>
                                                       </a>
                                                       <a href="#" className="text-heading" target="_blank" rel="noopener noreferrer">
                                                            <i className="tf-icons ri-linkedin-box-line ri-22px"></i>
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Section 5 */}
                    <section id="landingPricing" className="section-py bg-body landing-pricing">
                         <div className="container bg-icon-left position-relative">
                              <img
                                   src="/assets/client/icon/bg-left-icon-light.png"
                                   alt="section icon"
                                   className="position-absolute top-0 start-0"
                                   data-speed="1"
                                   data-app-light-img="front-pages/icons/bg-left-icon-light.png"
                                   data-app-dark-img="front-pages/icons/bg-left-icon-dark.png"
                              />
                              <h6 className="text-center d-flex justify-content-center align-items-center mb-6">
                                   <img src="/assets/client/icon/section-tilte-icon.png" alt="section title icon" className="me-2" height="19" />
                                   <span className="text-uppercase h5">Các gói giá</span>
                              </h6>
                              <h5 className="text-center mb-2">
                                   <span className="h4 fw-bold">Gói giá tùy chỉnh</span> thiết kế cho bạn
                              </h5>
                              <p className="text-center fw-medium mb-10 mb-md-12 pb-lg-4">
                                   Tất cả các gói đều bao gồm 40+ công cụ và tính năng nâng cao để tối ưu hóa công việc của bạn.
                                   <br />
                                   Gói tốt nhất để đáp ứng nhu cầu của bạn.
                              </p>
                              <div className="row gy-4 pt-lg-4">
                                   {/* Gói Cơ Bản: Bắt đầu */}
                                   <div className="col-xl-4 col-lg-6">
                                        <div className="card shadow-none">
                                             <div className="xuong-hang card-header border-0">
                                                  <h4 className="mb-3 text-center">Gói Cơ Bản</h4>
                                                  <div className=" d-flex align-items-center">
                                                  <div className=" xuong-hang d-flex align-items-center">
                                                       <h5 className="d-flex mb-0">
                                                            <sup className="h5 mt-4 fw-bold">$</sup>
                                                            <span className="display-3 fw-bold">51</span>
                                                       </h5>
                                                       <img src="/assets/client/icon/smiling-icon.png" alt="smiling icon" />
                                                       </div>
                                                       <div className="ms-2 ps-1">
                                                            <h6 className="mb-1">Theo tháng</h6>
                                                            <p className="small mb-0 text-body">Giảm 10% cho đăng ký hàng năm</p>
                                                       </div>
                                                  </div>
                                                 
                                             </div>
                                             <div className="card-body">
                                                  <ul className="list-unstyled">
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Quản lý nhiệm vụ cơ bản
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Thời gian biểu đơn giản
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Thông báo qua email
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Biểu mẫu tùy chỉnh
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Phân tích hiệu suất
                                                            </h5>
                                                       </li>
                                                  </ul>
                                                  <hr />
                                                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                       <div className="me-1">
                                                            <h6 className="mb-1">Hỗ trợ Cơ Bản</h6>
                                                            <p className="small mb-0 text-body">Chỉ Email</p>
                                                       </div>
                                                  </div>
                                                  <div className="text-center mt-6 pt-2">
                                                       <a href="#" className="btn btn-custom w-100 waves-effect">
                                                            Bắt đầu ngay
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Gói Phổ Biến: Bắt đầu */}
                                   <div className="col-xl-4 col-lg-6">
                                        <div className="card border-primary border-2 shadow-none">
                                             <div className="xuong-hang card-header border-0">
                                                  <h4 className="mb-3 text-center">Gói Phổ Biến</h4>
                                                  <div className=" d-flex align-items-center">
                                                  <div className=" xuong-hang d-flex align-items-center">
                                                       <h5 className="d-flex mb-0">
                                                            <sup className="h5 mt-4 fw-bold">$</sup>
                                                            <span className="display-3 fw-bold">51</span>
                                                       </h5>
                                                       <img src="/assets/client/icon/smiling-icon.png" alt="smiling icon" />
                                                       </div>
                                                       <div className="ms-2 ps-1">
                                                            <h6 className="mb-1">Theo tháng</h6>
                                                            <p className="small mb-0 text-body">Giảm 10% cho đăng ký hàng năm</p>
                                                       </div>
                                                  </div>
                                                 
                                             </div>
                                             <div className="card-body">
                                                  <ul className="list-unstyled">
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Tất cả trong Gói Cơ Bản
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Thời gian biểu nâng cao
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Tự động hóa công việc
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Quản lý dự án
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Thông báo theo thời gian thực
                                                            </h5>
                                                       </li>
                                                  </ul>
                                                  <hr />
                                                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                       <div className="me-1">
                                                            <h6 className="mb-1">Hỗ trợ Tiêu chuẩn</h6>
                                                            <p className="small mb-0 text-body">Email & Chat</p>
                                                       </div>
                                                  </div>
                                                  <div className="text-center mt-6 pt-2">
                                                       <a href="#" className="btn btn-primary w-100 waves-effect waves-light">
                                                            Bắt đầu ngay
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Gói Tiêu Chuẩn: Bắt đầu */}
                                   <div className="col-xl-4 col-lg-6">
                                        <div className="card shadow-none">
                                             <div className="xuong-hang card-header border-0">
                                                  <h4 className="mb-3 text-center">Gói Tiêu Chuẩn</h4>
                                                  <div className=" d-flex align-items-center">
                                                  <div className=" xuong-hang d-flex align-items-center">
                                                       <h5 className="d-flex mb-0">
                                                            <sup className="h5 mt-4 fw-bold">$</sup>
                                                            <span className="display-3 fw-bold">51</span>
                                                       </h5>
                                                       <img src="/assets/client/icon/smiling-icon.png" alt="smiling icon" />
                                                       </div>
                                                       <div className="ms-2 ps-1">
                                                            <h6 className="mb-1">Theo tháng</h6>
                                                            <p className="small mb-0 text-body">Giảm 10% cho đăng ký hàng năm</p>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="card-body">
                                                  <ul className="list-unstyled">
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Tất cả trong Gói Phổ Biến
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Hỗ trợ ưu tiên
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Các công cụ nâng cao
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Hợp tác nhóm
                                                            </h5>
                                                       </li>
                                                       <li>
                                                            <h5 className="mb-3">
                                                                 <img
                                                                      src="/assets/client/icon/list-arrow-icon.png"
                                                                      alt="list arrow icon"
                                                                      className="me-2 pe-1 scaleX-n1-rtl"
                                                                 />
                                                                 Phân tích dữ liệu
                                                            </h5>
                                                       </li>
                                                  </ul>
                                                  <hr />
                                                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                       <div className="me-1">
                                                            <h6 className="mb-1">Hỗ trợ hàng đầu</h6>
                                                            <p className="small mb-0 text-body">Email, Chat & Gọi</p>
                                                       </div>
                                                  </div>
                                                  <div className="text-center mt-6 pt-2">
                                                       <a href="#" className="btn btn-custom w-100 waves-effect">
                                                            Bắt đầu ngay
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Section 6 */}
                    <section id="landingFunFacts" className="section-py landing-fun-facts py-12 my-4">
                         <div className="container">
                              <div className="row gx-0 gy-5 gx-sm-6">
                                   <div className="col-md-3 col-sm-6 text-center">
                                        <span className="badge rounded-pill bg-label-hover-primary fun-facts-icon mb-6 p-5">
                                             <i className="tf-icons ri-task-line ri-42px"></i>
                                        </span>
                                        <h2 className="fw-bold mb-0 fun-facts-text">300+</h2>
                                        <h6 className="mb-0 text-body">Dự án Hoàn Thành</h6>
                                   </div>

                                   <div className="col-md-3 col-sm-6 text-center">
                                        <span className="badge rounded-pill bg-label-hover-success fun-facts-icon mb-6 p-5">
                                             <i className="tf-icons ri-time-line ri-42px"></i>
                                        </span>
                                        <h2 className="fw-bold mb-0 fun-facts-text">5,000+</h2>
                                        <h6 className="mb-0 text-body">Giờ Làm Việc</h6>
                                   </div>

                                   <div className="col-md-3 col-sm-6 text-center">
                                        <span className="badge rounded-pill bg-label-hover-warning fun-facts-icon mb-6 p-5">
                                             <i className="tf-icons ri-user-smile-line ri-42px"></i>
                                        </span>
                                        <h2 className="fw-bold mb-0 fun-facts-text">250+</h2>
                                        <h6 className="mb-0 text-body">Khách Hàng Hài Lòng</h6>
                                   </div>

                                   <div className="col-md-3 col-sm-6 text-center">
                                        <span className="badge rounded-pill bg-label-hover-info fun-facts-icon mb-6 p-5">
                                             <i className="tf-icons ri-award-line ri-42px"></i>
                                        </span>
                                        <h2 className="fw-bold mb-0 fun-facts-text">15+</h2>
                                        <h6 className="mb-0 text-body">Giải Thưởng Đạt Được</h6>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Section 7 */}
                    <section id="landingCTA" className="section-py landing-cta p-lg-0 pb-0 position-relative">
                         <img
                              src="/assets/client/image/img-langdingCTA/cta-bg.png"
                              alt="cta image"
                              className="position-absolute bottom-0 end-0 scaleX-n1-rtl h-100 w-100 z-n1"
                         />
                         <div className="container">
                              <div className="row align-items-center gy-5 gy-lg-0">
                                   <div className="col-lg-6 text-center text-lg-start">
                                        <h2 className="display-5 text-primary fw-bold mb-0">Sẵn Sàng Bắt Đầu Quản Lý Công Việc?</h2>
                                        <p className="fw-medium mb-6 mb-md-8">Bắt đầu dự án của bạn với bản dùng thử miễn phí 14 ngày</p>
                                        <a href="#" className="btn btn-primary waves-effect waves-light">
                                             Bắt Đầu Ngay
                                             <i className="ri-arrow-right-line ri-16px ms-2 scaleX-n1-rtl"></i>
                                        </a>
                                   </div>
                                   <div className="col-lg-6 pt-lg-12">
                                        <img src="/assets/client/image/img-langdingCTA/cta-dashboard.png" alt="cta dashboard" className="img-fluid" />
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Section 8 */}

                    <section id="landingContact" className="section-py bg-body landing-contact">
                         <div className="container bg-icon-left position-relative">
                              <img
                                   src="/assets/client/icon/bg-left-icon-light.png"
                                   alt="Background icon on left"
                                   className="position-absolute top-0 start-0"
                                   data-speed="1"
                                   data-app-light-img="front-pages/icons/bg-left-icon-light.png"
                                   data-app-dark-img="front-pages/icons/bg-left-icon-dark.png"
                              />
                              <h6 className="text-center d-flex justify-content-center align-items-center mb-6">
                                   <img src="/assets/client/icon/section-tilte-icon.png" alt="Section title icon" className="me-2" height="19" />
                                   <span className="text-uppercase h5">Liên hệ với chúng tôi</span>
                              </h6>
                              <h5 className="text-center mb-2">
                                   <span className="h4 fw-bold">Hãy cùng</span> hợp tác
                              </h5>
                              <p className="text-center fw-medium mb-4 mb-md-12 pb-3">
                                   Bạn có câu hỏi hoặc yêu cầu nào? Hãy gửi cho chúng tôi một tin nhắn
                              </p>
                              <div className="row gy-4">
                                   <div className="col-lg-5">
                                        <div className="card h-100">
                                             <div className="bg-primary rounded text-white card-body p-lg-8">
                                                  <p className="fw-medium mb-2 tagline">Liên hệ với chúng tôi</p>
                                                  <p className="title h6">
                                                       Chia sẻ ý tưởng hoặc yêu cầu của bạn với đội ngũ chuyên gia của chúng tôi.
                                                  </p>
                                                  <img
                                                       src="/assets/client/image/let’s-contact.png"
                                                       alt="Let’s contact illustration"
                                                       className="w-100 mb-4 pb-1"
                                                  />
                                                  <p className="mb-0 description">
                                                       Bạn đang tìm kiếm các giải pháp tùy chỉnh, nhiều tính năng hơn và bất kỳ điều gì khác? Đừng lo
                                                       lắng, chúng tôi sẽ cung cấp cho bạn một đội ngũ chuyên gia dày dạn kinh nghiệm.
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col-lg-7">
                                        <div className="card">
                                             <div className="card-body">
                                                  <h5 className="mb-1">Chia sẻ ý tưởng của bạn</h5>
                                                  <form action="/submit" method="POST">
                                                       {' '}
                                                       {/* Update action */}
                                                       <div className="row g-5">
                                                            <div className="col-md-6">
                                                                 <div className="form-floating form-floating-outline">
                                                                      <input
                                                                           type="text"
                                                                           className="form-control name"
                                                                           id="basic-default-fullname"
                                                                           placeholder="Nguyễn Văn A"
                                                                           required
                                                                           aria-label="Full Name"
                                                                      />
                                                                      <label htmlFor="basic-default-fullname">Họ và tên</label>
                                                                 </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                 <div className="form-floating form-floating-outline">
                                                                      <input
                                                                           type="email"
                                                                           className="form-control address"
                                                                           id="basic-default-email"
                                                                           placeholder="nguyenvana@gmail.com"
                                                                           required
                                                                           aria-label="Email Address"
                                                                      />
                                                                      <label htmlFor="basic-default-email">Địa chỉ email</label>
                                                                 </div>
                                                            </div>
                                                            <div className="col-12">
                                                                 <div className="form-floating form-floating-outline">
                                                                      <textarea
                                                                           id="basic-default-message"
                                                                           className="form-control message"
                                                                           placeholder="Tin nhắn"
                                                                           aria-label="Message"
                                                                           style={{ height: '150px' }}
                                                                           required></textarea>
                                                                      <label htmlFor="basic-default-message">Tin nhắn</label>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <button type="submit" className="btn btn-primary mt-4 waves-effect waves-light">
                                                            Gửi
                                                       </button>
                                                  </form>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </section>
          </div>
     );
};

export default Home;
