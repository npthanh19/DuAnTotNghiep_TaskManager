import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getTaskCountsByStatusGrouped } from '../../../services/dashboardService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
    const [chartData, setChartData] = useState(null); // Lưu dữ liệu biểu đồ
    const [loading, setLoading] = useState(true); // Theo dõi trạng thái tải dữ liệu

    useEffect(() => {
        async function fetchTaskCountsByStatusGrouped() {
            try {
                const response = await getTaskCountsByStatusGrouped(); // Giả định hàm này trả về dữ liệu từ API
                console.log('dataTaskTime', response);

                // Chuyển đổi dữ liệu từ API thành format cho Chart.js
                const labels = response.map((project) => project.project_name);
                const statuses = ['1', '2', '3', '4']; // Các trạng thái

                const datasets = statuses.map((status, index) => {
                    const statusMap = {
                        '1': { label: 'Đã gửi', color: '#808080' },
                        '2': { label: 'Đang thực hiện', color: '#0000ff' },
                        '3': { label: 'Xem xét', color: '#ffcc00' },
                        '4': { label: 'Hoàn thành', color: '#00ff00' },
                    };
                    return {
                        label: statusMap[status].label,
                        data: response.map((project) => project.statuses[status] || 0),
                        backgroundColor: statusMap[status].color,
                    };
                });

                setChartData({
                    labels, // Tên dự án
                    datasets, // Dữ liệu trạng thái
                });
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi fetch dữ liệu:', error);
                setLoading(false);
            }
        }

        fetchTaskCountsByStatusGrouped();
    }, []);

    const stackedChartOptions = {
        indexAxis: 'y', // Biểu đồ nằm ngang
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                beginAtZero: true,
                stacked: true,
            },
            y: {
                beginAtZero: true,
                stacked: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return (
        <div>
            {chartData ? (
                <Bar data={chartData} options={stackedChartOptions} />
            ) : (
                <p>Không có dữ liệu để hiển thị.</p>
            )}
        </div>
    );
};

export default BarChartComponent;
