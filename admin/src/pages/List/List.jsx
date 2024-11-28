// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// const List = () => {
//   const url='http://localhost:4000'
//     const [list,setList]=useState([]);
//     const fetchList=async()=>{
//       const response= await axios.get(`${url}/api/food/list`)
      
//       if(response.data.success){
//         setList(response.data.data)
//        }
//        else{
//          toast.error('Error')
//        }
    
//     }
//     const removeFood=async(foodId)=>{
//      const response =await axios.post(`${url}/api/food/remove`,{id:foodId})
//      await fetchList();
//      if(response.data.success)
//      {
//       toast.success(response.data.message)
//      }
//      else{
//       toast.error('Error')
//      }
//     }
//     useEffect(()=>
//     {
//       fetchList();
//     },[])
//   return (
//     <div className='list add flex-col'>
//       <p>ALL Foods List</p>
//       <div className="list-table">
//         <div className="list-table-format title" >
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item,index)=>{
//           return(
//             <div key={index} className='list-table-format'>
//             <img src={`${url}/images/`+item.image} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{item.price}</p>
//             <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
//             </div>
            

            
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default List
// import React, { useEffect, useState } from 'react';
// import './List.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const List = () => {
//   const url = 'http://localhost:4000';
//   const [list, setList] = useState([]);
//   const [confirmDelete, setConfirmDelete] = useState(null); // Trạng thái xác nhận xóa

//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);

//     if (response.data.success) {
//       setList(response.data.data);
//     } else {
//       toast.error('Error fetching list');
//       console.log("sdsfasd");
      
//     }
//   };

//   const removeFood = async (foodId) => {
//     const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//     await fetchList();
//     if (response.data.success) {
//       toast.success(response.data.message);
//     } else {
//       toast.error('Error removing food');
//     }
//   };

//   const handleDeleteClick = (foodId) => {
//     setConfirmDelete(foodId); // Lưu lại ID của món ăn cần xóa
//   };

//   const handleConfirmDelete = async () => {
//     if (confirmDelete) {
//       await removeFood(confirmDelete);
//       setConfirmDelete(null); // Reset trạng thái xác nhận
//     }
//   };

//   const handleCancelDelete = () => {
//     setConfirmDelete(null); // Hủy bỏ xác nhận
//     toast.info('Food deletion canceled');
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="list add flex-col">
//       <p>ALL Foods List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item, index) => (
//           <div key={index} className="list-table-format">
//             <img src={`${url}/images/` + item.image} alt={item.name} />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{item.price}</p>
//             <p onClick={() => handleDeleteClick(item._id)} className="cursor">
//               x
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Hộp thoại xác nhận xóa */}
//       {confirmDelete && (
//         <div className="confirmation-dialog">
//           <p>Are you sure you want to delete this food item?</p>
//           <button className="btn-confirm" onClick={handleConfirmDelete}>
//             Confirm
//           </button>
//           <button className="btn-cancel" onClick={handleCancelDelete}>
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default List;
import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
  const url = 'http://localhost:4000';
  const [list, setList] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null); // Trạng thái xác nhận xóa

  // Hàm lấy danh sách món ăn
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching list', { containerId: 'list-toast' });
      }
    } catch (error) {
      toast.error('Unable to fetch the food list', { containerId: 'list-toast' });
    }
  };

  // Hàm xóa món ăn
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message, { containerId: 'list-toast' });
        await fetchList();
      } else {
        toast.error('Error removing food', { containerId: 'list-toast' });
      }
    } catch (error) {
      toast.error('Failed to remove the food item', { containerId: 'list-toast' });
    }
  };

  // Xử lý khi nhấn xóa
  const handleDeleteClick = (foodId) => {
    setConfirmDelete(foodId);
  };

  // Xác nhận xóa
  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      await removeFood(confirmDelete);
      setConfirmDelete(null);
    }
  };

  // Hủy bỏ xóa
  const handleCancelDelete = () => {
    setConfirmDelete(null);
    toast.info('Food deletion canceled', { containerId: 'list-toast' });
  };

  // Gọi API lấy danh sách món ăn khi component render
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>ALL Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/` + item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => handleDeleteClick(item._id)} className="cursor">
              x
            </p>
          </div>
        ))}
      </div>

      {/* Hộp thoại xác nhận xóa */}
      {confirmDelete && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this food item?</p>
          <button className="btn-confirm" onClick={handleConfirmDelete}>
            Confirm
          </button>
          <button className="btn-cancel" onClick={handleCancelDelete}>
            Cancel
          </button>
        </div>
      )}

      {/* ToastContainer cho component List */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        containerId="list-toast"
      />
    </div>
  );
};

export default List;

