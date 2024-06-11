import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function BarChart() {
    const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]); // Định rõ kiểu dữ liệu là number[]

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8000/admin/totalAmounts'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const revenueArray = Array.from({ length: 12 }, (_, index) => {
                    const foundMonth = data.paidOrderRevenue.find(
                        (monthly: any) => monthly._id.month === index + 1
                    );
                    return foundMonth ? foundMonth.totalRevenue : 0;
                });
                setMonthlyRevenue(revenueArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRevenueData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Tổng doanh thu theo tháng',
            },
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tháng',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Doanh thu (VNĐ)',
                },
            },
        },
    };

    const labels = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Doanh thu theo tháng',
                data: monthlyRevenue,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Bar options={options} data={data} style={{ height: '360px' }} />;
}
