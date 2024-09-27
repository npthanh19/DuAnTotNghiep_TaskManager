import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
     en: {
          translation: {
               Dashboard: 'Dashboard',
               Categories: 'Categories',
               Admin: 'Admin',
               Account: 'Account',
               Permissions: 'Permissions',
               'Search...': 'Search...',
               VIE: 'VIE',
               ENG: 'ENG',
               'User Avatar': 'User Avatar',
               'John Doe': 'John Doe',
               'Thông tin cá nhân': 'Profile',
               'Cài đặt': 'Settings',
               'Thông báo': 'Notifications',
               Logout: 'Logout',
               'Add new category': 'Add new category',
               Edit: 'Edit',
               Delete: 'Delete',
               Previous: 'Previous',
               Next: 'Next',
               Namecate: 'Category name',
               Actions: 'Actions',
               'Add new': 'Add new',
               'Task Manager': 'Task Manager',
          },
     },
     vi: {
          translation: {
               Dashboard: 'Thống kê',
               Categories: 'Danh mục',
               Admin: 'Quản trị viên',
               Account: 'Tài khoản',
               Permissions: 'Phân quyền',
               'Search...': 'Tìm kiếm...',
               VIE: 'VIỆT',
               ENG: 'ANH',
               'User Avatar': 'Ảnh đại diện',
               'John Doe': 'Nguyễn Văn A',
               'Thông tin cá nhân': 'Thông tin cá nhân',
               'Cài đặt': 'Cài đặt',
               'Thông báo': 'Thông báo',
               Logout: 'Đăng xuất',
               'Add new category': 'Thêm mới',
               Edit: 'Sửa',
               Delete: 'Xóa',
               Previous: 'Quay lại',
               Next: 'Tiếp',
               Namecate: 'Tên danh mục',
               Actions: 'Hành động',
               'Add new': 'Thêm mới',
               'Task Manager': 'Quản lý công việc',
               Name: 'Tên',
               Password: 'Mật khẩu',
               Description: 'Mô tả',
               Status: 'Trạng thái',
               'Created At': 'Ngày tạo',
               Image: 'Hình ảnh',
               'Name Category': 'Tên danh mục',
               'Update Category': 'Cập nhật danh mục',
               'Successfully deleting a category': 'Xoá danh mục thành công',
               'Cancel successfully': 'Huỷ thành công',
               'Are you sure you want to delete this category?': 'Bạn chắc chắn muốn xoá danh mục này?',
               'Delete a digital catalogue': 'Xoá danh mục số',
               'Cancel': 'Huỷ'
          },
     },
};

i18n.use(initReactI18next).init({
     resources,
     lng: 'vi', // Ngôn ngữ mặc định là tiếng Việt
     fallbackLng: 'en',
     interpolation: {
          escapeValue: false,
     },
});

export default i18n;
