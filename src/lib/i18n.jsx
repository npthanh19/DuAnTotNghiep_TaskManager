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
               'Cancel successfully': 'Huỷ thành công',
               'Are you sure you want to delete this category?': 'Bạn chắc chắn muốn xoá danh mục này?',
               'Delete a digital catalogue': 'Xoá danh mục số',
               'Cancel': 'Huỷ',
               'Loading...': 'Đang tải...',
               'Users': 'Quản lí người dùng',
               'Full Name': 'Họ tên',
               'Role': 'Vai trò',
               'Avatar': 'Ảnh đại diện',
               'Update User': 'Cập nhật người dùng',
               'Confirm': 'Xác nhận',
               'Updated successfully!': 'Cập nhật thành công!',
               'Update failed!': 'Cập nhật thất bại!',
               'Successfully deleted the user!': 'Xoá người dùng thành công!',
               'Delete a user': 'Xoá người dùng',
               'Are you sure you want to delete?': 'Bạn chắc chắn muốn xoá?',
               'Roles': 'Vai trò',
               'Role Name': 'Tên vai trò',
               'Add': 'Thêm',
               'Add New Role': 'Thêm mới vai trò',
               'Added successfully!': 'Thêm thành công',
               'Role name cannot be empty!': 'Tên vai trò không được để trống!',
               'Description cannot be empty!': 'Mô tả không được để trống!',
               'Added Failed!': 'Thất bại!',
               'Failed': 'Lỗi!',
               'Update Roles': 'Cập nhật vai trò',
               'Successfully deleted the role!': 'Xoá vai trò thành công!',
               'Delete a Role': 'Xoá danh mục',
               'Successfully deleted!': 'Xoá thành công!',
               'Activity Log': 'Lịch sử hoạt động',
               'Board': 'Bảng',
               'Board List': 'Danh sách bảng',
               'Projects': 'Dự án',
               'Tasks': 'Nhiệm vụ',
               'Assignment': 'Phân công',
               'Departments': 'Phòng ban',
               'trash': 'Thùng rác',
               "Add User": 'Thêm người',
               'User ID is required': 'Người dùng bắt buộc',
               'Add new departments': 'Thêm mới phòng ban',
               'Department name cannot be empty!': 'Tên phòng ban không được để trống!',
               'Please select at least one user to add!': 'Vui lòng chọn ít nhất 1 người dùng!',
               'Users have been successfully added to the department!': 'Thêm người dùng vào phòng ban thành công!',
               'User has been removed from the department!': 'Xoá người dùng ra khỏi phòng ban thành công!',
               'Department Name': 'Tên phòng ban',
               'Select Available Users': 'Chọn người dùng',
               'Added Users To Departments': 'Người dùng ở phòng ban',
               'No users are currently in this department.': 'Không có người dùng ở phòng ban',
               'Remove': 'Xoá',
               'Add Users to Department': 'Thêm người dùng vào phòng ban',
               'Update Department': 'Cập nhật phòng ban',
               'User Name': 'Tên người dùng',
               'Task Name': 'Tên nhiệm vụ',
               'To Do': 'Gửi',
               'In Progress': 'Đang thực hiện',
               'Preview': 'Xem xét',
               'Done': 'Hoàn thành',
               'Assignments': 'Phân công',
               'Add new assignment': 'Thêm phân công',
               'Task is required': 'Nhiệm vụ bắt buộc chọn',
               'Department is required': 'Phòng ban bắt buộc chọn',
               'Status is required!': 'Trạng thái bắt buộc chọn!',
               'User is required': 'Người dùng bắt buộc chọn',
               'Select Task': 'Chọn nhiệm vụ',
               'Select Department': 'Chọn phòng ban',
               'Select User': 'Chọn người dùng',
               'Select Status': 'Chọn trạng thái',
               'Project Name': 'Tên dự án',
               'Start Date': 'Ngày bắt đầu',
               'End Date': 'Ngày kết thúc',
               'Name User': 'Tên người dùng',
               'Room': 'Phòng ban',
               'Project Manager': 'Người quản lý dự án',
               'Project name is required': 'Tên dự án không được để trống',
               'Start date is required!': 'Ngày bắt đầu không được để trống',
               'Start date must be today': 'Ngày bắt đầu phải là ngày hiện tại',
               'End date is required!': 'Ngày kết thúc không được để trống',
               'End date cannot be earlier than start date': 'Ngày kết thúc không sớm hơn ngày hiện tại',
               'Project Manager is required!': 'Người quản lý dự án không được để trống',
               'Select Project Manager': 'Chọn dự án',
               'Add new project': 'Thêm mới dự án',
               'Update Projects': 'Cập nhật dự án',
               'Delete Project': 'Xóa dự án',
               'Are you sure you want to delete this project?': 'Bạn chắc chắn muốn xoá dự án này?',
               'Role has been deleted!': ' Role has been deleted!!',
               'Delete Roles': 'Xoá vai trò',
               'Are you sure you want to delete this role?': 'Bạn chắc chắn muốn xoá vai trò này?',
               'Delete': 'Xóa',
               'Cancel': 'Hủy',
               'Canceled successfully': 'Đã hủy thành công',
               'Failed to delete the project!': 'Không thể xóa dự án',
               'Successfully deleted the project!': 'Đã xóa dự án thành công',
               'Add Departments to Project': 'Thêm Phòng Ban cho Dự Án',
               'Select Available Departments': 'Chọn Phòng Ban Có Sẵn',
               'Add': 'Thêm',
               'Add Departments': 'Phòng ban đã thêm',
               'Department removed successfully!': 'Đã xóa phòng ban thành công!',
               'Departments added successfully!': 'Đã thêm phòng ban thành công',
               'At least one department must be selected!': 'Phải chọn ít nhất một phòng ban có sẵn',
               'Add new task': 'Thêm mới nhiệm vụ',
               'Task name is required!': 'Tên nhiệm vụ không được để trống!',
               'Project is required!': 'Dự án bắt buộc chọn!',
               'Select Project': 'Chọn dự án',
               'Comment': 'Bình luận',
               'See File': 'Xem tập tin',
               'Update Task': 'Cập nhật nhiệm vụ',
               'Task name is required!': 'Tên nhiện vụ không được để trống',
               'Delete a task': 'Xóa nhiệm vụ',
               'Are you sure you want to delete this task?': 'Bạn có chắc muốn xóa nhiệm vụ này? ',
               'Recently Deleted': 'Đã xóa gần đây',
               'Restore': 'Khôi phục',
               'User name is required!': 'Tên người dùng không được để trống!',
               'Email is required!': 'Email không được để trống!',
               'Invalid email': 'Email không hợp lệ',
               'Delete User:': 'Xóa người dùng:',
               'Are you sure you want to delete this user?': 'Bạn có chắc muốn xóa người dùng này không?',
               'Restore user': 'Khôi phục người dùng', 
               'Are you sure you want to restore this user?': 'Bạn có chắc chắn muốn khôi phục người dùng này?',
               'Delete User': 'Xóa người dùng',
               'Are you sure you want to permanently delete this user?': 'Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này?',
               'View Permissions': 'Xem quyền',
               'Permission Name': 'Tên phân quyền',
               'Add Permission': 'Thêm phân quyền',
               'Add Children': 'Thêm quyền con',
               'View Children': 'Xem quyền',
               'Enter permission name': 'Nhập tên quyền',
               'Permission name cannot be empty!': 'Tên quyền không được để trống!',
               'Add New Child Permission': 'Thêm quyền con mới',
               'Permission has been deleted!': 'Quyền đã bị xóa',
               'An error occurred while deleting the permission': 'Đã xảy ra lỗi khi xóa quyền',
               'Delete Permission': 'Xóa quyền',
               'Are you sure you want to delete this permission?': 'Bạn chắc chắn muốn xóa quyền này?',
               'Permission has been updated!': 'Quyền đã được cập nhật!',
               'An error occurred while updating the permission': 'Đã xảy ra lỗi khi cập nhật quyền',
               'Permission has been added!': 'Quyền đã được thêm mới',
               'An error occurred while adding the permission': 'Đã xảy ra lỗi khi thêm quyền',
               'An error occurred while fetching child permissions': 'Đã xảy ra lỗi khi tìm kiếm quyền con',
               'Child Permission has been deleted!': 'Quyền con đã được xóa',
               'An error occurred while deleting the child permission': 'Đã xảy ra lỗi khi xóa quyền con',
               'Child Permission has been added!': 'Quyền con đã được thêm mới!',
               'An error occurred while adding the child permission': 'Đã xảy ra lỗi khi thêm quyền con',
               'Child Permissions of:': 'Xem quyền con của:',
               'Update Permission': 'Cập nhật quyền',
               'Recently Deleted Permissions': 'Quyền đã xóa gần đây',
               'Restore permission': 'Khôi phục quyền',
               'Are you sure you want to restore this permission?': 'Bạn có chắc chắn khôi phục quyền này?',
               'Permissions have been restored successfully!': 'Quyền đã được khôi phục thành công!',
               'An error occurred while restoring permissions.': 'Đã xảy ra lỗi khi khôi phục quyền',
               'Are you sure you want to permanently delete this permission?': 'Bạn có chắc muốn xóa vĩnh viễn quyền này?',
               'Permissions have been permanently removed.': 'Quyền đã được xóa vĩnh viễn.',
               'An error occurred while removing permissions.': 'Đã xảy ra lỗi khi xóa quyền.',
               'No recently deleted permissions found.': 'Không tìm thấy quyền đã xóa gần đây.'
          },
     },
};

i18n.use(initReactI18next).init({
     resources,
     lng: 'vi',
     fallbackLng: 'en',
     interpolation: {
          escapeValue: false,
     },
});

export default i18n;
