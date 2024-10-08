import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../index.css';
export default function Update_profile() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

     const toggleSidebar = () => {
          console.log('Sidebar toggle clicked');
          console.log('Sidebar open state:', !isSidebarOpen);
          setIsSidebarOpen(!isSidebarOpen);
     };
     return (
          <div className="layout-wrapper layout-content-navbar">
               <div className="layout-container">
                    <Sidebar isOpen={isSidebarOpen} />

                    <div className={`layout-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                         <Navbar onToggleSidebar={toggleSidebar} />
                         <div className="content-wrapper">
                              <div className="container-xxl flex-grow-1 container-p-y">
                                   <div className="row">
                                        <div className="col-md-12">
                                             <div className="nav-align-top">
                                                  <ul className="nav nav-pills flex-column flex-md-row mb-6 gap-2 gap-lg-0">
                                                       <li className="nav-item">
                                                            <button className="nav-link active" type="button">
                                                                 <i className="ri-group-line me-1_5" />
                                                                 Account
                                                            </button>
                                                       </li>
                                                       <li className="nav-item">
                                                            <a className="nav-link" href="pages-account-settings-notifications.html">
                                                                 <i className="ri-notification-4-line me-1_5" />
                                                                 Notifications
                                                            </a>
                                                       </li>
                                                       <li className="nav-item">
                                                            <a className="nav-link" href="pages-account-settings-connections.html">
                                                                 <i className="ri-link-m me-1_5" />
                                                                 Connections
                                                            </a>
                                                       </li>
                                                  </ul>
                                             </div>
                                             <div className="card mb-6">
                                                  {/* Account */}
                                                  <div className="card-body">
                                                       <div className="d-flex align-items-start align-items-sm-center gap-6">
                                                            <img
                                                                 src="/assets/admin/img/avatars/1.png"
                                                                 alt="user-avatar"
                                                                 className="d-block w-px-100 h-px-100 rounded"
                                                                 id="uploadedAvatar"
                                                            />
                                                            <div className="button-wrapper">
                                                                 <label htmlFor="upload" className="btn btn-sm btn-primary me-3 mb-4" tabIndex={0}>
                                                                      <span className="d-none d-sm-block">Upload new photo</span>
                                                                      <i className="ri-upload-2-line d-block d-sm-none" />
                                                                      <input
                                                                           type="file"
                                                                           id="upload"
                                                                           className="account-file-input"
                                                                           hidden
                                                                           accept="image/png, image/jpeg"
                                                                      />
                                                                 </label>
                                                                 <button
                                                                      type="button"
                                                                      className="btn btn-sm btn-outline-danger account-image-reset mb-4">
                                                                      <i className="ri-refresh-line d-block d-sm-none" />
                                                                      <span className="d-none d-sm-block">Reset</span>
                                                                 </button>
                                                                 <div>Allowed JPG, GIF or PNG. Max size of 800K</div>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div className="card-body pt-0">
                                                       <form
                                                            id="formAccountSettings"
                                                            method="POST"
                                                            onSubmit={(e) => {
                                                                 e.preventDefault();
                                                            }}>
                                                            <div className="row mt-1 g-5">
                                                                 <div className="col-md-6">
                                                                      <div className="form-floating form-floating-outline">
                                                                           <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                name="name"
                                                                                id="name"
                                                                                defaultValue="Doe Nguyexn"
                                                                           />
                                                                           <label htmlFor="name">Full Name</label>
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="form-floating form-floating-outline">
                                                                           <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                id="email"
                                                                                name="email"
                                                                                defaultValue="john.doe@example.com"
                                                                                placeholder="john.doe@example.com"
                                                                           />
                                                                           <label htmlFor="email">E-mail</label>
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="input-group input-group-merge">
                                                                           <div className="form-floating form-floating-outline">
                                                                                <input
                                                                                     type="text"
                                                                                     id="phoneNumber"
                                                                                     name="phoneNumber"
                                                                                     className="form-control"
                                                                                     placeholder="374 253 758"
                                                                                />
                                                                                <label htmlFor="phoneNumber">Phone Number</label>
                                                                           </div>
                                                                           <span className="input-group-text">VN (+84)</span>
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="form-floating form-floating-outline">
                                                                           <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="address"
                                                                                name="address"
                                                                                placeholder="Cần Thơ"
                                                                           />
                                                                           <label htmlFor="address">Address</label>
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="form-floating form-floating-outline">
                                                                           <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                id="state"
                                                                                name="state"
                                                                                placeholder="Việt nam"
                                                                           />
                                                                           <label htmlFor="state">State</label>
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-6">
                                                                      <div className="form-floating form-floating-outline">
                                                                           <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="zipCode"
                                                                                name="zipCode"
                                                                                placeholder={231465}
                                                                                maxLength={6}
                                                                                disabled
                                                                           />
                                                                           <label htmlFor="zipCode">Zip Code</label>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <button type="submit" className="btn btn-primary mt-4">
                                                                 Save changes
                                                            </button>
                                                       </form>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <Footer />
                         </div>
                    </div>
               </div>
          </div>
     );
}
