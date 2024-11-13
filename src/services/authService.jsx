import { axiosi } from '../config/axios';

// Đăng nhập
export const login = async (email, password) => {
     try {
          const response = await axiosi.post('/api/login', { email, password });
          if (response.data) {
               localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Đăng ký
export const register = async (userData) => {
     try {
          const response = await axiosi.post('/api/register', userData);
          return response.data;
     } catch (error) {
          console.error('Registration error:', error.response ? error.response.data : 'Network error');
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Đăng xuất
export const logout = async () => {
     try {
          const response = await axiosi.post('/api/logout');
          localStorage.removeItem('user');
          return response.data;
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Xác minh email
export const verifyEmail = async (userId, hash) => {
     try {
          const response = await axiosi.get(`/api/verify-email/${userId}/${hash}`);
          return response.data;
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Gửi lại mã xác nhận email
export const resendVerificationCode = async (email) => {
     try {
          const response = await axiosi.post('/api/resend-verification-code', { email });
          return response.data;
     } catch (error) {
          throw error.response ? error.response.data : new Error('Network error');
     }
};

// Yêu cầu đặt lại mật khẩu
export const requestPasswordReset = async (data, resetMethod) => {
     try {
          let response;

          if (resetMethod === 'email') {
               response = await axiosi.post(`/api/forgot-password/request`, { email: data });
          } else if (resetMethod === 'phone_number') {
               response = await axiosi.post(`/api/forgot-password/request`, { phone_number: data });
          }

          return response.data;
     } catch (error) {
          console.error('API Error:', error);
     }
};

// Xác minh mã đặt lại mật khẩu
export const verifyResetCode = async (otp, contact, resetMethod) => {
     try {
          const data = {
               code: otp,
               resetMethod: resetMethod,
          };

          if (resetMethod === 'email') {
               data.email = contact;
          } else if (resetMethod === 'phone_number') {
               data.phone_number = contact;
          }

          const response = await axiosi.post('/api/forgot-password/verify', data);
          return response.data;
     } catch (error) {
          console.error('Error verifying OTP:', error.response ? error.response.data : error);
          throw error;
     }
};

// Đặt lại mật khẩu
export const resetPassword = async (passwordData) => {
     try {
          const response = await axiosi.post('/api/forgot-password/reset', passwordData);
          return response;
     } catch (error) {
          throw error;
     }
};

// Lấy ID người dùng đăng nhập
export const getLoggedUserId = () => {
     const user = JSON.parse(localStorage.getItem('user'));
     return user && user.id ? user.id : null;
};

// Lấy tên người dùng đăng nhập
export const getLoggedUserName = () => {
     const user = JSON.parse(localStorage.getItem('user'));
     return user && user.email ? user.email : null;
};
