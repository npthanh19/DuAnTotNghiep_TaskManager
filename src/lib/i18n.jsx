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
               Cancel: 'Huỷ',
               'Loading...': 'Đang tải...',
               Users: 'Quản lí người dùng',
               'Full Name': 'Họ tên',
               Role: 'Vai trò',
               Avatar: 'Ảnh đại diện',
               'Update User': 'Cập nhật người dùng',
               Confirm: 'Xác nhận',
               'Updated successfully!': 'Cập nhật thành công!',
               'Update failed!': 'Cập nhật thất bại!',
               'Successfully deleted the user!': 'Xoá người dùng thành công!',
               'Delete a user': 'Xoá người dùng',
               'Are you sure you want to delete?': 'Bạn chắc chắn muốn xoá?',
               Roles: 'Vai trò',
               'Role Name': 'Tên vai trò',
               Add: 'Thêm',
               'Add New Role': 'Thêm mới vai trò',
               'Added successfully!': 'Thêm thành công',
               'Role name cannot be empty!': 'Tên vai trò không được để trống!',
               'Description cannot be empty!': 'Mô tả không được để trống!',
               'Added Failed!': 'Thất bại!',
               Failed: 'Lỗi!',
               'Update Roles': 'Cập nhật vai trò',
               'Successfully deleted the role!': 'Xoá vai trò thành công!',
               'Delete a Role': 'Xoá danh mục',
               'Successfully deleted!': 'Xoá thành công!',
               'Activity Log': 'Lịch sử hoạt động',
               Board: 'Bảng',
               'Board List': 'Danh sách bảng',
               Projects: 'Dự án',
               Tasks: 'Nhiệm vụ',
               Assignment: 'Phân công',
               Departments: 'Phòng ban',
               Trash: 'Thùng rác',
               'Add User': 'Thêm người',
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
               Remove: 'Xoá',
               'Add Users to Department': 'Thêm người dùng vào phòng ban',
               'Update Department': 'Cập nhật phòng ban',
               'User Name': 'Tên người dùng',
               'Task Name': 'Tên nhiệm vụ',
               'To Do': 'Gửi',
               'In Progress': 'Đang thực hiện',
               Preview: 'Xem xét',
               Done: 'Hoàn thành',
               Assignments: 'Phân công',
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
               'User Create': 'Người tạo',
               Room: 'Phòng ban',
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
               'Canceled successfully': 'Đã hủy thành công',
               'Failed to delete the project!': 'Không thể xóa dự án',
               'Successfully deleted the project!': 'Đã xóa dự án thành công',
               'Add Departments to Project': 'Thêm Phòng Ban cho Dự Án',
               'Select Available Departments': 'Chọn Phòng Ban Có Sẵn',
               'Add Departments': 'Phòng ban đã thêm',
               'Department removed successfully!': 'Đã xóa phòng ban thành công!',
               'Departments added successfully!': 'Đã thêm phòng ban thành công',
               'At least one department must be selected!': 'Phải chọn ít nhất một phòng ban có sẵn',
               'Add new task': 'Thêm mới nhiệm vụ',
               'Task name is required!': 'Tên nhiệm vụ không được để trống!',
               'Project is required!': 'Dự án bắt buộc chọn!',
               'Select Project': 'Chọn dự án',
               Comment: 'Bình luận',
               'See File': 'Xem tập tin',
               'Update Task': 'Cập nhật nhiệm vụ',
               'Delete a task': 'Xóa nhiệm vụ',
               'Are you sure you want to delete this task?': 'Bạn có chắc muốn xóa nhiệm vụ này? ',
               'Recently Deleted': 'Đã xóa gần đây',
               Restore: 'Khôi phục',
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
               'No recently deleted permissions found.': 'Không tìm thấy quyền đã xóa gần đây.',
               'Delete Activity': 'Xóa hoạt động',
               'Are you sure you want to delete this activity?': 'Bạn có chắc chắn muốn xóa hoạt động này?',
               'Delete Projects:': 'Xóa dự án:',
               'Are you sure you want to delete this projects?': 'Bạn có chắc chắn muốn xóa dự án này?',
               'Delete Worktime': 'Xóa thời gian làm việc',
               'Are you sure you want to delete this worktime?': 'Bạn có chắc chắn muốn xóa thời gian làm việc này?',
               'The worktime has been moved to the trash!': 'Thời gian làm việc đã được chuyển vào thùng rác!',
               'An error occurred while deleting the worktime.': 'Đã xảy ra lỗi khi xóa thời gian làm việc.',
               Worktimes: 'Thời gian làm việc',
               'Delete Tasks': 'Xóa nhiện vụ',
               'Are you sure you want to delete this tasks?': 'Bạn có chắc chắn muốn xóa nhiện vụ này?',
               'The task has been moved to the trash!': 'Nhiệm vụ đã được chuyển vào thùng rác!',
               'An error occurred while deleting the task.': 'Đã xảy ra lỗi khi xóa nhiệm vụ.',
               'Delete Assignments': 'Xóa phân công',
               'Are you sure you want to delete this assignments?': 'Bạn chắc chắn muốn xóa bảng phân công này?',
               'The assignments has been moved to the trash!': 'Bảng phân công đã được chuyển vào thùng rác!',
               'An error occurred while deleting the assignments.': 'Đã xảy ra lỗi khi xóa bảng phân công.',
               'Delete Departments': 'Xóa phòng ban',
               'Are you sure you want to delete this departments?': 'Bạn chắc chắn muốn xóa phòng ban này?',
               'The departments has been moved to the trash!': 'Phòng ban đã được chuyển vào thùng rác!',
               'An error occurred while deleting the departments.': 'Đã xảy ra lỗi khi xóa các phòng ban.',
               'The projects has been moved to the trash!': 'Dự án đã được chuyển vào thùng rác!',
               'An error occurred while deleting the project.': 'Đã xảy ra lỗi khi xóa dự án.',
               'Assignment updated successfully!': 'Sửa phân công thành công!',
               'Failed to update assignment.': 'Có lỗi khi sửa phân công.',
               Note: 'Nội dung',
               'Note is required': 'Nội dung không được để trống',
               'Status is required': 'trạng thái bắt buộc chọn',
               'Edit Assignment': 'Sửa phân công',
               Task: 'Nhiệm vụ',
               Department: 'Phòng ban',
               'No assignments found in the trash.': 'không có phân công nào ở thùng rác.',
               'Delete assignment': 'Xoá phân công',
               'Are you sure you want to permanently delete this assignment?': 'Bạn chắc chắn muốn xoá vĩnh viễn phân công này?',
               'Restore ': 'Khôi phục',
               'Are you sure you want to restore this assignment?': 'Bạn chắc chắn muốn khôi phục phân công này?',
               'Assignment restored successfully!': 'Phân công khôi phục thành công!',
               'Failed to restore assignment.': 'LỗI khôi phục vui lòng kiểm tra lại.',
               'Assignment permanently deleted!': 'Xoá vĩnh viễn phân công thành công!',
               'Failed to permanently delete assignment.': 'lỗi vui lòng kiểm tra lại',
               Share: 'Chia sẻ',
               Export: 'Xuất',
               'Choose a time period': 'Chọn khoảng thời gian',
               'From date:': 'Từ ngày:',
               'To date:': 'Đến ngày:',
               Apply: 'Áp dụng',
               'Website administration': 'Quản trị website',
               'Hide Info': 'Ẩn thông tin',
               'Show info': 'Hiển thị thông tin',
               User: 'Người dùng',
               'User ID': 'Người dùng',
               'Statistics Total Hours Executed': 'Thống kê Tổng Giờ Thực Hiện',
               'Edit successfully!': 'Sửa thành công',
               'Edit Failed!': 'Sửa thất bại',
               'Something went wrong': 'Đã xảy ra lỗi',
               'Recently Deleted Departments': 'Phòng ban đã xóa gần đây',
               'No recently deleted departments found.': 'Không tìm thấy phòng ban nào được xóa gần đây.',
               'Your trash is empty.': 'Thùng rác của bạn trống.',
               'Select all': 'Chọn tất cả',
               'Delete permanently': 'Xóa vĩnh viễn',
               Path: 'Đường dẫn',
               Date: 'Ngày',
               Close: 'Đóng',
               'Full name is required!': 'Họ tên không được để trống',
               'Invalid email format': 'Định dạnh email không hợp lệ',
               'Phone Number': 'Số điện thoại',
               'Select Role': 'Chọn vai trò',
               'The user has been restored successfully.': 'Người dùng đã được khôi phục thành công.',
               'User recovery failed!': 'Khôi phục người dùng không thành công!',
               'The user has been permanently deleted.': 'Người dùng đã bị xóa vĩnh viễn.',
               'An error occurred while deleting the user.': 'Đã xảy ra lỗi khi xóa người dùng.',
               'No recently deleted users found.': 'Không tìm thấy người dùng đã xóa gần đây.',
               'The role has been moved to the trash!': 'Vai trò đã được chuyển vào thùng rác!',
               'An error occurred while deleting the role.': 'Đã xảy ra lỗi khi xóa vai trò.',
               'An error occurred while fetching permissions': 'Đã xảy ra lỗi khi tìm phân quyền',
               'No permissions found': 'Không tìm thấy quyền',
               'Failed!': 'Thất bại!',
               'Select permissions': 'Chọn quyền',
               'Error fetching tasks or projects:': 'Lỗi khi tìm nạp nhiệm vụ hoặc dự án:',
               'Failed to fetch task, projects, or departments.': 'Không tìm thấy nhiệm vụ, dự án hoặc phòng ban.',
               'Failed to load departments.': 'Không thể tải các phòng ban.',
               'Failed to load projects.': 'Không thể tải dự án',
               'The selected status is invalid.': 'Trạng thái đã chọn không hợp lệ.',
               'Restore task': 'Khôi phục nhiện vụ',
               'Are you sure you want to restore this task?': 'Bạn có chắc chắn muốn khôi phục nhiệm vụ này?',
               'Task restored successfully.': 'Nhiệm vụ được khôi phục thành công.',
               'Restore Failed!': 'Khôi phục thất bại!',
               'Are you sure you want to permanently delete this task?': 'Bạn có chắc chắn xóa vĩnh viễn nhiệm vụ này?',
               'Task permanently deleted.': 'Nhiệm vụ đã bị xóa vĩnh viễn.',
               'Delete Failed!': 'Xóa thất bại!',
               'An error occurred while deleting the task': 'Đã xảy ra lỗi khi xóa nhiện vụ',
               'Recently Deleted Tasks': 'Nhiệm vụ đã xóa gần đây',
               'No recently deleted tasks found.': 'Không tìm thấy nhiệm vụ đã xóa gần đây.',
               'Error retrieving project information!': 'Lỗi khi truy xuất thông tin dự án!',
               'Error getting user list!': 'Lỗi lấy danh sách người dùng!',
               'Error retrieving department list!': 'Lỗi truy xuất danh sách phòng ban!',
               'Failed to load users': 'Không thể tải người dùng',
               'Failed to load departments': 'Không thể tải các phòng ban',
               'Project and department added successfully!': 'Dự ấn và phòng ban được thêm thành công!',
               'Error adding project or department! Please try again.': 'Lỗi khi thêm dự án hoặc phòng ban! Vui lòng thử lại.',
               'Start date must be today or later': 'Ngày bắt đầu phải là hôm nay hoặc muộn hơn',
               'Restore project': 'Khôi phục dự án',
               'Are you sure you want to restore this project?': 'Bạn có chắc chắn muốn khôi phục dự án này không?',
               'Project restored successfully.': 'Dự án được khôi phục thành công.',
               'Are you sure you want to permanently delete this project?': 'Bạn có chắc chắn muốn xóa vĩnh viễn dự án này không?',
               'Project permanently deleted.': 'Dự án đã bị xóa vĩnh viễn.',
               'An error occurred while deleting the project': 'Đã xảy ra lỗi khi xóa dự án',
               'Recently Deleted Projects': 'Dự án đã xóa gần đây',
               'Error fetching project!': 'Lỗi tìm dự án!',
               'Error fetching departments!': 'Lỗi tìm phòng ban',
               'Error adding departments! Please try again.': 'Lỗi khi thêm phòng ban! Vui lòng thử lại.',
               'Error removing department! Please try again.': 'Lỗi xóa phòng ban! Vui lòng thử lại.',
               'Added Departments': 'Thêm phòng ban',
               'File Name': 'Tên tập tin',
               'Hide comments': 'Ẩn bình luận',
               'See more': 'Xem thêm',
               'Search by comments or username...': 'Tìm kiếm theo bình luận hoặc tên người dùng...',
               'User updated successfully!': 'Cập nhật thông tin người dùng thành công!',
               'Not yet implemented': 'Chưa thực hiện',
               Ongoing: 'Đang thực hiện',
               Complete: 'Hoàn thành',
               Destroy: 'Huỷ',
               'You cannot delete a project that is in progress or completed.': 'Bạn không thể xoá 1 dự án đang được tiến hành hoặc đã hoàn thành.',
               'Do you want to remove this user from the department?': 'Bạn chắc chắn muốn xoá người dùng ra khỏi phòng ban?',
               'Are you sure you want to remove this department from the project?': 'Bạn chắc chắn muốn xoá phòng ban ra khỏi dự án?',
               ID: 'Mã',
               'Enter user emails (comma separated)': 'Nhập email người dùng (phân tách bằng dấu phẩy)',
               'Added users': 'Người dùng đã thêm',
               'Please select at least one user to invite!': 'Vui lòng chọn người dùng thêm vào!',
               'Invitations have been sent successfully!': 'Đã mời thành công',
               pending: 'Đã mời',
               confirmed: 'Đã xác nhận',
               'Project added successfully!': 'Dự án thêm thành công!',
               'Enter task time in hours': 'Nhập thời gian',
               'Invalid email address!': 'Địa chỉ email không hợp lệ!',
               'Adding...': 'Đang mời...',
               'Invited Users': 'Người dùng đã mời',
               'Departments Added': 'Phòng ban đã thêm',
               Pending: 'Chưa xử lí',
               'Avatar updated successfully!': 'Ảnh đại diện cập nhật thành công!',
               'Failed to update avatar.': 'Lỗi cập nhật ảnh đại diện',
               'User not found! Please login again.': 'Người dùng không tồn tại, vui lòng đăng nhập lại.',
               'Delete account': 'Xoá tài khoản',
               'This worktime contains tasks. Please delete the tasks first.':
                    'Thời gian làm việc này chứa các nhiệm vụ. Vui lòng xóa các nhiệm vụ trước.',
               'Cannot delete worktime': 'Không thể xoá thời gian làm việc',
               'Delete Successful!': 'Xoá thành công!',
               'The worktime has been deleted successfully!': 'Thời gian làm việc xoá thành công',
               'Update Successful!': 'Cập nhật thành công!',
               'The worktime has been updated successfully!': 'Thời gian làm việc cập nhật thành công!',
               'Failed to update the worktime. Please try again later!': 'Cập nhật thất bại, vui lòng thử lại!',
               'Are you sure you want to start?': 'Bạn có chắc muốn bắt đầu?',
               Start: 'Bắt đầu',
               'Success!': 'Thành công!',
               'The worktime has been started.': 'Công việc đã được bắt đầu.',
               'Error!': 'Lỗi!',
               'Unable to update status. Please try again.': 'Không thể cập nhật trạng thái. Vui lòng thử lại.',
               'Are you sure you want to complete?': 'Bạn có chắc muốn hoàn thành?',
               'The worktime has been completed.': 'Công việc đã được hoàn thành.',
               Save: 'lưu',
               'Add Tasks': 'Thêm nhiệm vụ',
               Starts: 'Bắt đấu',
               OK: 'Đồng ý',
               'Failed to load data!': 'Lỗi không thấy dữ liệu!',
               'Save changes': 'Lưu lại',
               'Upload new photo': 'Tải lên hình ảnh',
               'Allowed JPG, PNG. Max size of 800K': 'Sử dụng JPG, PNG. Max size of 800k',
               Verified: 'Đã xác thực',
               'Not verified': 'Chưa xác thực',
               'Saving...': 'Đang lưu',
               'Phone number is required': 'Số điện thoại không được để trống',
               'Fullname is required': 'Họ và tên không được để trống',
               Backlog: 'Tồn động',
               Epic: 'Sử thi',
               'Unassigned Tasks': 'Nhiêm vụ chưa được giao',
               'Update status': 'Cập nhật trạng thái',
               'You will not be able to undo this action!': 'Bạn sẽ không thể hoàn tác hành động này!',
               'Are you sure?': 'Bạn có chắc không?',
               'Deleted!': 'Đã xoá!',
               'Your comment has been deleted.': 'Bình luận của bạn đã bị xóa.',
               'Something went wrong.': 'Đã xảy ra lỗi',
               Activity: 'Hoạt động',
               Show: 'Hiển thị',
               All: 'Tất cả',
               History: 'Lịch sử',
               Detail: 'Chi tiết',
               Assignee: 'Người được chuyển nhượng',
               'Score estimate': 'Ước tính điểm',
               'Add Comment': 'Thêm bình luận',
               'Failed to update the user.': 'Lỗi cập nhật người dùng',
               'Phone number': 'Số điện thoại',
               Fullname: 'Họ và tên',
               Back: 'Quay lại',
               'No departments found': 'Không có phòng ban nào',
               'No assignments found': 'Không có phân công nào',
               'No tasks found': 'Không có nhiệm vụ nào',
               'No worktime found': 'Không có thời gian nào',
               'No recently deleted worktimes found.': 'Không có thời gian làm việc nào ở thùng rác',
               'Recently Deleted Worktimes': 'Đã xoá gần đây thời gian làm việc',
               'Are you sure you want to restore this worktime?': 'Bạn chắc chăn muốn khôi phục thời gian làm việc?',
               'Worktime restored successfully.': 'Khôi phục thời gian làm việc thành công.',
               'Are you sure you want to permanently delete this worktime?': 'Bạn chắc chắn muốn xoá thời gian làm việc?',
               'Worktime permanently deleted.': 'Xoá vĩnh viễn thành công.',
               'An error occurred while deleting the worktime': 'Thất bại hãy chắc chắn rằng không có ràng buộc nào',
               'Worktime added successfully!': 'Thêm thành công thời gian!',
               'Failed to add worktime!': 'Thất bại kiểm tra lại!',
               'Worktime name is required!': 'Tên thời gian làm việc không để trống',
               'Project selection is required!': 'Dự án không được để trống',
               'Select a project': 'Chọn dự án',
               'The project has been moved to the trash!': 'Dự án đã được đưa vào thùng rác!',
               'An error occurred while deleting the task.': 'Có lỗi khi xoá vui lòng kiểm tra lại ràng buộc.',
               'No project found': 'Không có dự án nào',
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
