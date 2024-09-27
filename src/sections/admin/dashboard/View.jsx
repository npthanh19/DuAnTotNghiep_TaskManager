import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const View = () => {
     const data = {
          labels: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy'],
          datasets: [
               {
                    label: 'Lượt Xem Trang',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.1,
               },
          ],
     };

     const options = {
          responsive: true,
          plugins: {
               legend: {
                    position: 'top',
               },
               tooltip: {
                    callbacks: {
                         label: (context) => {
                              return `${context.dataset.label}: ${context.raw}`;
                         },
                    },
               },
          },
     };
     return (
          <div className="dashboard">
               <h3 className="fw-bold py-3 mb-4 highlighted-text">
                    <span className="marquee">Thống kê phần mềm quản lí</span>
               </h3>
               <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                         <div className="card shadow-sm rounded">
                              <div className="card-body d-flex align-items-center">
                                   <div className="me-3">
                                        <i className="bi bi-person-circle fs-3 text-primary"></i>
                                   </div>
                                   <div>
                                        <h5 className="card-title mb-1">Tổng Số Người Dùng</h5>
                                        <p className="card-text mb-0 fs-4">1,234</p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                         <div className="card shadow-sm rounded">
                              <div className="card-body d-flex align-items-center">
                                   <div className="me-3">
                                        <i className="bi bi-currency-dollar fs-3 text-success"></i>
                                   </div>
                                   <div>
                                        <h5 className="card-title mb-1">Tổng Doanh Thu</h5>
                                        <p className="card-text mb-0 fs-4">$56,789</p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                         <div className="card shadow-sm rounded">
                              <div className="card-body d-flex align-items-center">
                                   <div className="me-3">
                                        <i className="bi bi-bar-chart-line fs-3 text-warning"></i>
                                   </div>
                                   <div>
                                        <h5 className="card-title mb-1">Phiên Hoạt Động</h5>
                                        <p className="card-text mb-0 fs-4">256</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               <div className="row mb-4">
                    <div className="col-lg-12">
                         <div className="card shadow-sm rounded">
                              <div className="card-body">
                                   <h5 className="card-title">Lượt Xem Trang Theo Thời Gian</h5>
                                   <Line data={data} options={options} />
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};
