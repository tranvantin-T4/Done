
// import React, { useState, useEffect } from 'react';
// import './Statiscal.css';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// // Đăng ký các thành phần của Chart.js
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const Statiscal = ({ url }) => {
//   const [orders, setOrders] = useState([]);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [topItems, setTopItems] = useState([]);

//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(url + "/api/order/list");
//       if (response.data.success) {
//         const ordersData = response.data.data;
//         setOrders(ordersData);

//         // Tính tổng số đơn hàng và tổng doanh thu
//         setTotalOrders(ordersData.length);
//         const revenue = ordersData.reduce((sum, order) => sum + order.amount, 0);
//         setTotalRevenue(revenue);

//         // Thống kê món bán chạy nhất
//         const itemCount = {};
//         ordersData.forEach(order => {
//           order.items.forEach(item => {
//             if (itemCount[item.name]) {
//               itemCount[item.name] += item.quantity;
//             } else {
//               itemCount[item.name] = item.quantity;
//             }
//           });
//         });

//         const sortedItems = Object.entries(itemCount)
//           .sort((a, b) => b[1] - a[1])
//           .map(([name, quantity]) => ({ name, quantity }));

//         setTopItems(sortedItems);

//       } else {
//         toast.error("Failed to fetch orders");
//       }
//     } catch (error) {
//       toast.error("Error fetching orders");
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   // Dữ liệu biểu đồ
//   const chartData = {
//     labels: orders.map((order, index) => `Order ${index + 1}`),
//     datasets: [
//       {
//         label: 'Revenue',
//         data: orders.map(order => order.amount),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Tùy chỉnh biểu đồ
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Revenue (USD)',
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Orders',
//         },
//       },
//     },
//   };

//   return (
//     <div className="statiscal-report">
//       {/* Cột bên trái */}
//       <div className="report-left">
//         <h3>Statistical Report</h3>
//         <div className="report-summary">
//           <p>Total Orders: <strong>{totalOrders}</strong></p>
//           <p>Total Revenue: <strong>${totalRevenue.toFixed(2)}</strong></p>
//         </div>
  
//         <div className="top-items">
//           <h4>Top Selling Items</h4>
//           <ul>
//             {topItems.map((item, index) => (
//               <li key={index}>
//                 {item.name}: <strong>{item.quantity}</strong> sold
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
  
//       {/* Cột bên phải */}
//       <div className="report-right">
//         <div className="revenue-chart">
//           <h4>Revenue by Order</h4>
//           <Bar data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statiscal;

import React, { useState, useEffect } from 'react';
import './Statiscal.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Statiscal = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topItems, setTopItems] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        const ordersData = response.data.data;
        setOrders(ordersData);

        // Tính tổng số đơn hàng và tổng doanh thu
        setTotalOrders(ordersData.length);
        const revenue = ordersData.reduce((sum, order) => sum + order.amount, 0);
        setTotalRevenue(revenue);

        // Thống kê món bán chạy nhất
        const itemCount = {};
        ordersData.forEach(order => {
          order.items.forEach(item => {
            if (itemCount[item.name]) {
              itemCount[item.name] += item.quantity;
            } else {
              itemCount[item.name] = item.quantity;
            }
          });
        });

        const sortedItems = Object.entries(itemCount)
          .sort((a, b) => b[1] - a[1])
          .map(([name, quantity]) => ({ name, quantity }));

        setTopItems(sortedItems);

      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Dữ liệu biểu đồ
  const chartData = {
    labels: orders.map((order, index) => `Order ${index + 1}`),
    datasets: [
      {
        label: 'Revenue',
        data: orders.map(order => order.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Tùy chỉnh biểu đồ
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Revenue (USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Orders',
        },
      },
    },
  };

  return (
    <div className="statiscal-report">
      {/* Cột bên trái */}
      <div className="report-left">
        <h3>Statistical Report</h3>
        <div className="report-summary">
          <p>Total Orders: <strong>{totalOrders}</strong></p>
          <p>Total Revenue: <strong>${totalRevenue.toFixed(2)}</strong></p>
        </div>
  
        <div className="top-items">
          <h4>Best Sale</h4>
          {/* Bảng hiển thị sản phẩm bán chạy */}
          <table className="best-sale-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {topItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* Cột bên phải */}
      <div className="report-right">
        <div className="revenue-chart">
          <h4>Revenue by Order</h4>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Statiscal;
