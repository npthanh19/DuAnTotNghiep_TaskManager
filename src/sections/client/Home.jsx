import React from 'react';

export const Home = () => {
     return (
          <div>
               <main className="main">
                    <section id="content-section" className="bg-light text-center p-5">
                         <div className="container">
                              {/* Section 1: Welcome */}
                              <div id="home" style={{ backgroundColor: '#EEEEEE', padding: '80px', position: 'relative', width: '100%', margin: 0 }}>
                                   <h1 style={{ fontSize: '2.5rem' }}>Chào mừng đến với hệ thống quản lý công việc!</h1>
                                   <p className="lead">Hệ thống giúp bạn quản lý công việc hiệu quả và dễ dàng hơn.</p>
                                   <a className="btn btn-primary btn-lg" href="#" role="button">
                                        Tìm hiểu thêm
                                   </a>
                              </div>

                              {/* Section 2: Icons */}
                              <div className="row justify-content-center py-5">
                                   {[
                                        { src: '/assets/client/icon/150x150/01.png', label: 'Quản lý nhiệm vụ' },
                                        { src: '/assets/client/icon/150x150/02.png', label: 'Nhắc nhở công việc' },
                                        { src: '/assets/client/icon/150x150/03.png', label: 'Thống kê tiến độ' },
                                        { src: '/assets/client/icon/150x150/04.jpg', label: 'Làm việc nhóm' },
                                        { src: '/assets/client/icon/150x150/05.jpg', label: 'Chia sẻ công việc' },
                                        { src: '/assets/client/icon/150x150/06.jpg', label: 'Thống kê công việc' },
                                   ].map((icon, index) => (
                                        <div className="col-6 col-md-2 text-center" key={index}>
                                             <img
                                                  src={icon.src}
                                                  className="img-fluid logo-img"
                                                  alt={icon.label}
                                                  style={{ maxWidth: '70px', height: '70px' }}
                                             />
                                             <div>
                                                  <span>{icon.label}</span>
                                             </div>
                                        </div>
                                   ))}
                              </div>

                              {/* Section 3: Image Display */}
                              <div className="text-center my-4">
                                   <img
                                        src="/assets/client/img/01.jpg"
                                        className="img-fluid"
                                        style={{ width: '80%', height: '450px' }}
                                        alt="Đội ngũ NHĐT"
                                   />
                              </div>

                              {/* Section 4: Task Management */}
                              <div className="py-5 text-center" id="management">
                                   <div className="_1e0c1txw _19pkidpf _2hwxidpf _otyr19bv _18u0idpf">
                                        <img
                                             src="/assets/client/icon/150x150/07.jpg"
                                             alt="Task Management"
                                             width="32"
                                             height="32"
                                             style={{ maxWidth: '100%' }}
                                        />
                                        <h2 className="_19pkidpf _2hwxidpf _otyridpf _18u019bv">Quản lý công việc</h2>
                                   </div>
                              </div>

                              {/* Section 5: Featured Features */}
                              <div className="row pt-4">
                                   <div className="col-md-6">
                                        <div className="half text-section" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                             <h3>
                                                  <img
                                                       src="/assets/client/icon/860x900/02.png"
                                                       alt="icon"
                                                       style={{ width: '32px', marginRight: '8px' }}
                                                  />
                                                  Tính năng nổi bật
                                             </h3>
                                             <div className="body-lg">
                                                  <h5>Công cụ hỗ trợ quản lý công việc toàn diện và hiệu quả.</h5>
                                                  <p>
                                                       Hệ thống quản lý công việc của chúng tôi không chỉ giúp bạn theo dõi tiến độ dự án một cách
                                                       chính xác và minh bạch mà còn cung cấp công cụ mạnh mẽ để phân công nhiệm vụ cho từng thành
                                                       viên trong nhóm. Nhờ tính năng theo dõi thời gian thực, bạn có thể dễ dàng điều chỉnh kế hoạch
                                                       làm việc khi cần thiết để đảm bảo tiến độ không bị gián đoạn.
                                                  </p>
                                                  <p>
                                                       Ngoài ra, hệ thống tự động gửi các thông báo nhắc nhở về các công việc quan trọng và các thời
                                                       hạn sắp đến, đảm bảo rằng không có nhiệm vụ nào bị bỏ lỡ. Báo cáo chi tiết về tình hình công
                                                       việc, từ hiệu quả làm việc của từng thành viên đến các dự án đang triển khai, giúp bạn luôn nắm
                                                       rõ mọi thông tin và dễ dàng ra quyết định quản lý.
                                                  </p>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="col-md-6 pt-3">
                                        <img
                                             src="/assets/client/img/02.png"
                                             style={{ maxWidth: '100%', aspectRatio: '16 / 9', objectFit: 'cover', marginBottom: '15px' }}
                                             alt="Hình ảnh mô tả"
                                        />
                                        <div className="pt-3 text-center">
                                             <a href="#" className="btn btn-primary" style={{ color: '#fff' }}>
                                                  Bắt đầu ngay
                                             </a>
                                        </div>
                                   </div>
                              </div>

                              {/* Section 6: Task System */}
                              <div className="row mt-4 pt-4" id="task-management">
                                   <div className="col-md-11" style={{ margin: '0 auto' }}>
                                        <h2 className="text-center font-weight-bold">Hệ thống Quản lý Công việc</h2>
                                        <div className="text-center pt-3">
                                             {['Tạo nhiệm vụ', 'Xem tiến độ', 'Thêm nhóm', 'Báo cáo hàng tuần', 'Lịch sử hoạt động'].map(
                                                  (buttonText, index) => (
                                                       <button key={index} className="btn btn-outline-dark custom-button mx-4 m-2">
                                                            {buttonText}
                                                       </button>
                                                  ),
                                             )}
                                        </div>
                                        <div className="row mt-4 pt-2">
                                             <div className="col-md-6">
                                                  <h3 style={{ textAlign: 'center' }}>
                                                       <img
                                                            src="/assets/client/icon/512x512/01.png"
                                                            alt="icon"
                                                            style={{ width: '32px', marginRight: '8px' }}
                                                       />
                                                       Quản lý hiệu quả
                                                  </h3>
                                                  <h5 style={{ textAlign: 'center' }}>Tăng cường sự minh bạch và kiểm soát tiến độ dự án</h5>
                                                  <div className="container">
                                                       <div className="body-lg overflow-auto" style={{ maxHeight: '200px' }}>
                                                            <p className="text-center body-sm">
                                                                 Hệ thống quản lý công việc cung cấp cho bạn một cái nhìn tổng thể về tất cả các nhiệm
                                                                 vụ và tiến độ thực hiện trong dự án. Từ việc theo dõi các công việc hàng ngày đến
                                                                 việc phân công nhiệm vụ chi tiết cho từng thành viên, bạn có thể quản lý hiệu quả mọi
                                                                 khía cạnh của dự án.
                                                            </p>
                                                            <p className="text-center body-sm">
                                                                 Hệ thống còn hỗ trợ đánh giá hiệu suất làm việc của từng thành viên dựa trên các chỉ
                                                                 số như thời gian hoàn thành, chất lượng công việc và sự hợp tác trong nhóm. Đây là
                                                                 công cụ lý tưởng giúp bạn tối ưu hóa hiệu suất làm việc của nhóm và đưa ra các quyết
                                                                 định cải tiến kịp thời.
                                                            </p>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="col-md-6 pt-3">
                                                  <img
                                                       src="/assets/client/img/03.png"
                                                       alt="Quản lý công việc"
                                                       style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
                                                  />
                                             </div>
                                        </div>
                                        <div className="row mt-4 pt-4">
                                             <div className="col-md-6 pt-3">
                                                  <img
                                                       src="/assets/client/img/04.png"
                                                       alt="Nhắc nhở công việc"
                                                       style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
                                                  />
                                             </div>
                                             <div className="col-md-6">
                                                  <h3 style={{ textAlign: 'center' }}>
                                                       <img
                                                            src="/assets/client/icon/600x600/02.jpg"
                                                            alt="icon"
                                                            style={{ width: '32px', marginRight: '8px' }}
                                                       />
                                                       Tự động nhắc nhở
                                                  </h3>
                                                  <h5 style={{ textAlign: 'center' }}>Nhắc nhở kịp thời về công việc quan trọng</h5>
                                                  <div className="container">
                                                       <div className="body-lg overflow-auto" style={{ maxHeight: '200px' }}>
                                                            <p className="text-center body-sm">
                                                                 Với hệ thống nhắc nhở tự động, bạn sẽ không còn lo lắng về việc bỏ lỡ thời hạn hoặc
                                                                 nhiệm vụ quan trọng. Hệ thống sẽ tự động gửi thông báo đến bạn về các nhiệm vụ sắp
                                                                 đến hạn và nhắc nhở bạn thực hiện công việc cần thiết. Điều này giúp bạn duy trì tiến
                                                                 độ công việc và tránh những sai sót không đáng có.
                                                            </p>
                                                            <p className="text-center body-sm">
                                                                 Ngoài ra, bạn cũng có thể tùy chỉnh các thông báo nhắc nhở để phù hợp với phong cách
                                                                 làm việc của mình, từ đó nâng cao hiệu suất làm việc cá nhân và của cả nhóm.
                                                            </p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="icon-container pt-3" style={{ textAlign: 'center', marginTop: '10px' }}>
                                             <img src="/assets/client/icon/600x600/01.png" style={{ width: '25px', marginRight: '8px' }} />
                                             <img src="/assets/client/icon/600x600/01.png" style={{ width: '35px', marginRight: '8px' }} />
                                             <img src="/assets/client/icon/600x600/01.png" style={{ width: '45px', marginRight: '8px' }} />
                                        </div>
                                   </div>
                              </div>
                              <div className="row mt-4">
                                   <div className="col-md-4 d-flex align-items-stretch pt-4">
                                        <div className="card">
                                             <img
                                                  src="/assets/client/img/4096x2304/01.png"
                                                  className="rounded mx-auto d-block"
                                                  style={{ maxWidth: '100%' }}
                                             />
                                             <div className="card-body d-flex flex-column">
                                                  <h5 className="card-title">Lập kế hoạch công việc</h5>
                                                  <p className="card-text">
                                                       Công cụ giúp bạn tạo, phân chia nhiệm vụ một cách khoa học và theo dõi tiến độ hoàn thành.
                                                  </p>
                                                  <a href="#" className="btn btn-outline-dark mt-auto" style={{ borderRadius: '80px' }}>
                                                       Tìm hiểu thêm
                                                  </a>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col-md-4 d-flex align-items-stretch pt-4">
                                        <div className="card">
                                             <img
                                                  src="/assets/client/img/4096x2304/02.png"
                                                  className="rounded mx-auto d-block"
                                                  style={{ maxWidth: '100%' }}
                                             />
                                             <div className="card-body d-flex flex-column">
                                                  <h5 className="card-title">Quản lý thời gian</h5>
                                                  <p className="card-text">
                                                       Theo dõi thời gian thực hiện nhiệm vụ để đảm bảo đúng tiến độ và tăng hiệu quả làm việc.
                                                  </p>
                                                  <a href="#" className="btn btn-outline-dark mt-auto" style={{ borderRadius: '80px' }}>
                                                       Tìm hiểu thêm
                                                  </a>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="col-md-4 d-flex align-items-stretch pt-4">
                                        <div className="card">
                                             <img
                                                  src="/assets/client/img/4096x2304/03.png"
                                                  className="rounded mx-auto d-block"
                                                  style={{ maxWidth: '100%' }}
                                             />
                                             <div className="card-body d-flex flex-column">
                                                  <h5 className="card-title">Đánh giá hiệu suất</h5>
                                                  <p className="card-text">
                                                       Đánh giá công việc theo tiêu chí chất lượng, hiệu quả và năng lực của mỗi thành viên.
                                                  </p>
                                                  <a href="#" className="btn btn-outline-dark mt-auto" style={{ borderRadius: '80px' }}>
                                                       Tìm hiểu thêm
                                                  </a>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              <div id="banner" className="text-center bg-light py-5">
                                   <div style={{ backgroundColor: '#EEEEEE', padding: '80px', position: 'relative' }}>
                                        <img
                                             src="https://wac-cdn.atlassian.com/misc-assets/webp-images/colored-shapes-left-desktop2.svg"
                                             alt="Small Star Icon"
                                             style={{ position: 'absolute', top: '0px', left: '0px', width: '200px' }}
                                        />
                                        <h2 className="font-weight-bold">Nâng Cao Hiệu Quả Quản Lý Công Việc</h2>
                                        <p className="lead">
                                             Khám phá các công cụ mạnh mẽ giúp bạn theo dõi, quản lý và tối ưu hóa mọi nhiệm vụ trong công việc hàng
                                             ngày của bạn.
                                        </p>
                                        <a href="#" className="btn btn-primary mt-3" style={{ borderRadius: '80px' }}>
                                             Tìm Hiểu Thêm
                                        </a>
                                        <img
                                             src="https://wac-cdn.atlassian.com/misc-assets/webp-images/big-star.svg"
                                             alt="Icon"
                                             style={{ position: 'absolute', bottom: '20px', right: '20px', width: '100px' }}
                                        />
                                   </div>
                              </div>
                         </div>
                    </section>
               </main>
          </div>
     );
};

export default Home;
