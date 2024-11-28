import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './VoucherManagement.css';

function VoucherForm() {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [maximumDiscount, setMaximumDiscount] = useState(''); // State for maximum discount
  const [minimumAmount, setMinimumAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [usageLimit, setUsageLimit] = useState(''); // State cho số lượng sử dụng

  // Hàm kiểm tra tính hợp lệ của dữ liệu
  const validateForm = () => {
    // Kiểm tra các trường số âm hoặc 0
    if (parseInt(usageLimit) <= 0 ) {
      toast.error('Usage limit of uses must be greater than 0.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    if ( parseInt(maximumDiscount) <= 0) {
      toast.error('Maximum discount reduction must be greater than 0.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    if (parseInt(discount) <= 0 ) {
      toast.error('Discount value must be greater than 0.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Kiểm tra ngày kết thúc trước ngày hôm nay
    if (end < currentDate) {
      toast.error('The end date cannot be before the current date.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    // Kiểm tra ngày kết thúc trước hoặc bằng ngày bắt đầu
    if (end <= start) {
      toast.error('The end date must be after the start date.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Nếu dữ liệu không hợp lệ, dừng thực hiện
    if (!validateForm()) {
      return;
    }

    const voucher = { code, discount, maximumDiscount, minimumAmount, startDate, endDate, usageLimit };
    
    try {
      const response = await fetch('http://localhost:4000/api/vouchers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voucher),
      });

      if (response.ok) {
        toast.success('Voucher has been saved successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Reset form
        setCode('');
        setDiscount('');
        setMaximumDiscount('');
        setMinimumAmount('');
        setStartDate('');
        setEndDate('');
        setUsageLimit('');
      } else {
        toast.error('Voucher already exists!.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Unable to connect to server.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Create Voucher</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Voucher Code:
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </label>
        <label>
          Discount(%):
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </label>
        <label>
          Maximum Discount(USD):
          <input
            type="number"
            value={maximumDiscount}
            onChange={(e) => setMaximumDiscount(e.target.value)}
            required
          />
        </label>
        <label>
          Minimum Order Value:
          <input
            type="number"
            value={minimumAmount}
            onChange={(e) => setMinimumAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <label>
          Usage Limit:
          <input
            type="number"
            value={usageLimit}
            onChange={(e) => setUsageLimit(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save Voucher</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default VoucherForm;