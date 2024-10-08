import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export const View = () => {
     const taskData = [
          { name: 'Dự Án Alpha', completed: 15, ongoing: 7, overdue: 2, tasks: [
            { id: '001', title: 'Nhiệm vụ A', date: '01/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn A', status: 'Đang Thực Hiện' },
            { id: '002', title: 'Nhiệm vụ B', date: '02/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn B', status: 'Hoàn Thành' },
          ]},
          { name: 'Dự Án Beta', completed: 22, ongoing: 5, overdue: 0, tasks: [
            { id: '003', title: 'Nhiệm vụ C', date: '03/01/2024', time: '4 giờ', assignee: 'Nguyễn Văn C', status: 'Đang Thực Hiện' },
            { id: '004', title: 'Nhiệm vụ D', date: '04/01/2024', time: '1 giờ', assignee: 'Nguyễn Văn D', status: 'Hoàn Thành' },
          ]},
          { name: 'Dự Án Gamma', completed: 18, ongoing: 9, overdue: 3, tasks: [
            { id: '005', title: 'Nhiệm vụ E', date: '05/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn E', status: 'Chưa Bắt Đầu' },
            { id: '006', title: 'Nhiệm vụ F', date: '06/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn F', status: 'Đang Thực Hiện' },
          ]},
          { name: 'Dự Án Delta', completed: 10, ongoing: 4, overdue: 1, tasks: [
            { id: '007', title: 'Nhiệm vụ G', date: '07/01/2024', time: '5 giờ', assignee: 'Nguyễn Văn G', status: 'Đang Thực Hiện' },
            { id: '008', title: 'Nhiệm vụ H', date: '08/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn H', status: 'Chưa Bắt Đầu' },
          ]},
          { name: 'Dự Án Epsilon', completed: 30, ongoing: 12, overdue: 0, tasks: [
            { id: '009', title: 'Nhiệm vụ I', date: '09/01/2024', time: '6 giờ', assignee: 'Nguyễn Văn I', status: 'Hoàn Thành' },
            { id: '010', title: 'Nhiệm vụ J', date: '10/01/2024', time: '4 giờ', assignee: 'Nguyễn Văn J', status: 'Đang Thực Hiện' },
          ]},
          { name: 'Dự Án Zeta', completed: 5, ongoing: 3, overdue: 1, tasks: [
            { id: '011', title: 'Nhiệm vụ K', date: '11/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn K', status: 'Chưa Bắt Đầu' },
            { id: '012', title: 'Nhiệm vụ L', date: '12/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn L', status: 'Đang Thực Hiện' },
          ]},
          { name: 'Dự Án Eta', completed: 8, ongoing: 6, overdue: 2, tasks: [
            { id: '013', title: 'Nhiệm vụ M', date: '13/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn M', status: 'Đang Thực Hiện' },
            { id: '014', title: 'Nhiệm vụ N', date: '14/01/2024', time: '4 giờ', assignee: 'Nguyễn Văn N', status: 'Hoàn Thành' },
          ]},
          { name: 'Dự Án Theta', completed: 20, ongoing: 5, overdue: 3, tasks: [
            { id: '015', title: 'Nhiệm vụ O', date: '15/01/2024', time: '3 giờ', assignee: 'Nguyễn Văn O', status: 'Chưa Bắt Đầu' },
            { id: '016', title: 'Nhiệm vụ P', date: '16/01/2024', time: '2 giờ', assignee: 'Nguyễn Văn P', status: 'Đang Thực Hiện' },
          ]}
        ];
        

  const departmentData = [
    { name: 'Phòng Kỹ Thuật', members: [
      { name: 'Nguyễn Văn A', joinDate: '01/01/2023' },
      { name: 'Nguyễn Văn B', joinDate: '15/02/2023' },
      { name: 'Nguyễn Văn C', joinDate: '10/03/2023' },
      { name: 'Nguyễn Văn D', joinDate: '20/04/2023' },
      { name: 'Nguyễn Văn E', joinDate: '05/05/2023' },
    ]},
    { name: 'Phòng Marketing', members: [
      { name: 'Nguyễn Văn F', joinDate: '01/06/2023' },
      { name: 'Nguyễn Văn G', joinDate: '15/07/2023' },
      { name: 'Nguyễn Văn H', joinDate: '30/08/2023' },
    ]},
    { name: 'Phòng Bán Hàng', members: [
      { name: 'Nguyễn Văn I', joinDate: '10/09/2023' },
      { name: 'Nguyễn Văn J', joinDate: '15/10/2023' },
      { name: 'Nguyễn Văn K', joinDate: '20/11/2023' },
      { name: 'Nguyễn Văn L', joinDate: '25/12/2023' },
    ]},
  ];

  const [openProjects, setOpenProjects] = useState({});
  const [openDepartments, setOpenDepartments] = useState({});

  useEffect(() => {
    const ctx = document.getElementById('hourChart').getContext('2d');
    const hourChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: taskData.map(project => project.name),
        datasets: [{
          label: 'Giờ Thực Hiện',
          data: taskData.map(project => project.completed + project.ongoing + project.overdue),
          backgroundColor: ['#007bff', '#28a745', '#ffc107'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Tổng Giờ Thực Hiện Theo Dự Án' }
        }
      }
    });

    return () => {
      hourChart.destroy();
    };
  }, []);

  const handleDateRangeApply = () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    console.log("Đã chọn khoảng thời gian từ " + startDate + " đến " + endDate);
  };

  const toggleProject = (index) => {
    setOpenProjects(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleDepartment = (index) => {
    setOpenDepartments(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Chia Sẻ</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Xuất</button>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle" id="dateRangeButton" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-calendar"></i>
              Chọn khoảng thời gian
            </button>
            <div className="dropdown-menu p-3" id="dateRangePicker">
              <div>
                <label htmlFor="startDate" className="form-label">Từ ngày:</label>
                <input type="date" id="startDate" className="form-control mb-2" />
                <label htmlFor="endDate" className="form-label">Đến ngày:</label>
                <input type="date" id="endDate" className="form-control mb-2" />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleDateRangeApply}>Áp dụng</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        <div className="col">
          <div className="card h-100 text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Công Việc Hoàn Thành</h5>
              <p className="card-text display-4">75</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Công Việc Đang Thực Hiện</h5>
              <p className="card-text display-4">23</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Công Việc Chưa Bắt Đầu</h5>
              <p className="card-text display-4">12</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-4 mb-3">Thống Kê Công Việc</h2>
      <canvas id="hourChart"></canvas>

      <h2 className="mt-4 mb-3">Danh Sách Dự Án</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tên Dự Án</th>
            <th>Hoàn Thành</th>
            <th>Đang Thực Hiện</th>
            <th>Quá Hạn</th>
            <th>Chi Tiết</th>
          </tr>
        </thead>
        <tbody>
          {taskData.map((project, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{project.name}</td>
                <td>{project.completed}</td>
                <td>{project.ongoing}</td>
                <td>{project.overdue}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => toggleProject(index)}
                  >
                    {openProjects[index] ? 'Ẩn Chi Tiết' : 'Xem Chi Tiết'}
                  </button>
                </td>
              </tr>
              {openProjects[index] && (
                <tr>
                  <td colSpan="5">
                    <div className="card card-body">
                      <h5>Các Nhiệm Vụ</h5>
                      <ul className="list-group">
                        {project.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="list-group-item">
                            {task.title} - <strong>{task.assignee}</strong> - {task.status} - {task.date} - {task.time}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <h2 className="mt-4 mb-3">Danh Sách Phòng Ban</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tên Phòng Ban</th>
            <th>Số Thành Viên</th>
            <th>Chi Tiết</th>
          </tr>
        </thead>
        <tbody>
          {departmentData.map((department, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{department.name}</td>
                <td>{department.members.length}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => toggleDepartment(index)}
                  >
                    {openDepartments[index] ? 'Ẩn Thành Viên' : 'Xem Thành Viên'}
                  </button>
                </td>
              </tr>
              {openDepartments[index] && (
                <tr>
                  <td colSpan="3">
                    <div className="card card-body">
                      <h5>Thành Viên Phòng Ban</h5>
                      <ul className="list-group">
                        {department.members.map((member, memberIndex) => (
                          <li key={memberIndex} className="list-group-item">
                            {member.name} - Tham Gia Ngày: {member.joinDate}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </main>
  );
};