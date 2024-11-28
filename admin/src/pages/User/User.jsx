// import React, { useEffect, useState } from 'react'
// import './User.css'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// const user = () => {
//   const url='http://localhost:4000'
//     const [user,setUser]=useState([]);
//     const fetchuser=async()=>{
//       const response= await axios.get(`${url}/api/user/list`)
      
//       if(response.data.success){
//         setUser(response.data.data)
//        }
//        else{
//          toast.error('Error')
//        }
    
//     }
//     const removeUser=async(userID)=>{
//      const response =await axios.post(`${url}/api/user/remove`,{id:userID})
//      await fetchuser();
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
//       fetchuser();
//     },[])
//   return (
//     <div className='user add flex-col'>
//       <p>ALL user</p>
//       <div className="user-table">
//         <div className="user-table-format title" >
//           <b>Name</b>
//           <b>Email</b>
//           <b>Phone</b>
//           <b>Address</b>
//           <b>Avatar</b>
//           <b>Action</b>
//         </div>
//         {user.map((item,index)=>{
//           return(
//             <div key={index} className='user-table-format'>
//             <p>{item.name}</p>
//             <p>{item.email}</p>
//             <p>{item.phone}</p>
//             <p>{item.address}</p>
//             <p>{item.avatar}</p>
//             <p onClick={()=>removeUser(item._id)} className='cursor'>x</p>
//             </div>        
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default user
// import React, { useEffect, useState } from 'react';
// import './User.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const User = () => {
//   const url = 'http://localhost:4000';
//   const [user, setUser] = useState([]);
//   const [confirmDelete, setConfirmDelete] = useState(null); // Trạng thái xác nhận xóa

//   const fetchUser = async () => {
//     const response = await axios.get(`${url}/api/user/list`);
//     if (response.data.success) {
//       setUser(response.data.data);
//     } else {
//       toast.error('Error');
//     }
//   };

//   const removeUser = async (userID) => {
//     const response = await axios.post(`${url}/api/user/remove`, { id: userID });
//     await fetchUser();
//     if (response.data.success) {
//       toast.success(response.data.message);
//     } else {
//       toast.error('Error');
//     }
//   };

//   const handleDeleteClick = (userID) => {
//     setConfirmDelete(userID); // Lưu ID người dùng cần xóa
//   };

//   const handleConfirmDelete = async () => {
//     if (confirmDelete) {
//       await removeUser(confirmDelete);
//       setConfirmDelete(null); // Đặt lại trạng thái xác nhận
//     }
//   };

//   const handleCancelDelete = () => {
//     setConfirmDelete(null); // Hủy xóa
//     toast.info('User deletion canceled');
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <div className="user add flex-col">
//       <p>ALL USERS</p>
//       <div className="user-table">
//         <div className="user-table-format title">
//           <b>Name</b>
//           <b>Email</b>
//           <b>Phone</b>
//           <b>Address</b>
//           <b>Avatar</b>
//           <b>Action</b>
//         </div>
//         {user.map((item, index) => (
//           <div key={index} className="user-table-format">
//             <p>{item.name}</p>
//             <p>{item.email}</p>
//             <p>{item.phone}</p>
//             <p>{item.address}</p>
//             <p>{item.avatar}</p>
//             <p onClick={() => handleDeleteClick(item._id)} className="cursor">
//               x
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Hộp thoại xác nhận xóa */}
//       {confirmDelete && (
//         <div className="confirmation-dialog">
//           <p>Confirm deletion of this user?</p>
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

// export default User;
import React, { useEffect, useState } from 'react';
import './User.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const url = 'http://localhost:4000';
  const [user, setUser] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null); // Trạng thái xác nhận xóa

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list`);
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        toast.error('Error fetching user list', { containerId: 'user-toast' });
      }
    } catch (error) {
      toast.error('Error fetching user list', { containerId: 'user-toast' });
    }
  };

  const removeUser = async (userID) => {
    try {
      const response = await axios.post(`${url}/api/user/remove`, { id: userID });
      if (response.data.success) {
        toast.success(response.data.message, { containerId: 'user-toast' });
        await fetchUser();
      } else {
        toast.error('Error removing user', { containerId: 'user-toast' });
      }
    } catch (error) {
      toast.error('Error removing user', { containerId: 'user-toast' });
    }
  };

  const handleDeleteClick = (userID) => {
    setConfirmDelete(userID); // Lưu ID người dùng cần xóa
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      await removeUser(confirmDelete);
      setConfirmDelete(null); // Đặt lại trạng thái xác nhận
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null); // Hủy xóa
    toast.info('User deletion canceled', { containerId: 'user-toast' });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="user add flex-col">
      <p>ALL USERS</p>
      <div className="user-table">
        <div className="user-table-format title">
          <b>Name</b>
          <b>Email</b>
          <b>Phone</b>
          <b>Address</b>
          <b>Avatar</b>
          <b>Action</b>
        </div>
        {user.map((item, index) => (
          <div key={index} className="user-table-format">
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p>{item.address}</p>
            <p>{item.avatar}</p>
            <p onClick={() => handleDeleteClick(item._id)} className="cursor">
              x
            </p>
          </div>
        ))}
      </div>

      {/* Hộp thoại xác nhận xóa */}
      {confirmDelete && (
        <div className="confirmation-dialog">
          <p>Confirm deletion of this user?</p>
          <button className="btn-confirm" onClick={handleConfirmDelete}>
            Confirm
          </button>
          <button className="btn-cancel" onClick={handleCancelDelete}>
            Cancel
          </button>
        </div>
      )}

      {/* ToastContainer riêng cho User */}
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
        containerId="user-toast"
      />
    </div>
  );
};

export default User;

