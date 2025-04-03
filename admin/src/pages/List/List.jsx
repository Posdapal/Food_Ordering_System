// import React, {useState} from 'react'
// import './List.css'
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useEffect } from 'react';

// const List = ({url}) => {


//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);
//     console.log(response.data);
//     if (response.data.success) {
//       setList(response.data.data);
//     }
//     else {
//       toast.error("Error")
//     }
//   }

//   const removeFood = async(foodId) => {
//     const response = await axios.post(`${url}/api/food/remove`, {id:foodId});
//     await fetchList();
//     if(response.data.success){
//       toast.success(response.data.message);
//     }
//     else{
//       toast.error("Error");
//     }
//   }

//   useEffect(() => {
//     fetchList();
//   }, [])

//   return (
//     <div className='list add flex-col'>
//       <p>All foods List</p>
//       <div className='list-table'>
//         <div className='list-table-format title'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item,index)=>{
//           return (
//             <div key={index} className='list-table-format'>
//               <img src={`${url}/images/`+item.image} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>${item.price}</p>
//               <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default List


// import React, { useState } from 'react';
// import './List.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


// const List = ({ url }) => {
//   const [originalList, setOriginalList] = useState([]); // Store the original unfiltered list
//   const [list, setList] = useState([]);
//   const [editId, setEditId] = useState(null); // Track editing item
//   const [searchQuery, setSearchQuery] = useState(''); // Search input state
//   const [editData, setEditData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     description: '' // Added for completeness, though not displayed
//   });

//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);
//     console.log(response.data);
//     if (response.data.success) {
//       setOriginalList(response.data.data); // Store the original list
//       setList(response.data.data);
//     } else {
//       toast.error("Error");
//     }
//   };

//   const removeFood = async (foodId) => {
//     const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//     await fetchList();
//     if (response.data.success) {
//       toast.success(response.data.message);
//     } else {
//       toast.error("Error");
//     }
//   };

//   const startEdit = (item) => {
//     setEditId(item._id);
//     setEditData({
//       name: item.name,
//       category: item.category,
//       price: item.price,
//       description: item.description
//     });
//   };

//   const updateFood = async (foodId) => {
//     const response = await axios.post(`${url}/api/food/update`, {
//       id: foodId,
//       name: editData.name,
//       category: editData.category,
//       price: editData.price,
//       description: editData.description
//     });
//     await fetchList();
//     if (response.data.success) {
//       toast.success(response.data.message);
//       setEditId(null);
//     } else {
//       toast.error("Error");
//     }
//   };

//   const handleEditChange = (e) => {
//     setEditData({
//       ...editData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const cancelEdit = () => {
//     setEditId(null);
//     setEditData({ name: '', category: '', price: '', description: '' });
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     if (query === '') {
//       setList(originalList); // Reset to full list if query is empty
//     } 
//     else {
//       const filtered = originalList.filter((item) =>
//         item.name.toLowerCase().includes(query) ||
//         item.category.toLowerCase().includes(query) ||
//         item.price.toString().includes(query)
//       );
//       setList(filtered);
//     }
//   };

//   // Function to reset the list to original explicitly
//   const resetList = () => {
//     setList(originalList); // Reset list to original without checking query
//     setSearchQuery(''); // Optionally clear the search input
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className='list add flex-col'>
//       <p>All foods List</p>
//       <div className='search-bar'>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className='search-input'
//         />
//       </div>
//       <div className='list-table'>
//         <div className='list-table-format title'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item, index) => {
//           return (
//             <div key={index} className='list-table-format'>
//               <img src={`${url}/images/` + item.image} alt="" />
//               {editId === item._id ? (
//                 <>
//                   <input
//                     type="text"
//                     name="name"
//                     value={editData.name}
//                     onChange={handleEditChange}
//                   />
//                   <input
//                     type="text"
//                     name="category"
//                     value={editData.category}
//                     onChange={handleEditChange}
//                   />
//                   <input
//                     type="number"
//                     name="price"
//                     value={editData.price}
//                     onChange={handleEditChange}
//                   />
//                   <div className='action-buttons'>
//                     <p onClick={() => updateFood(item._id)} className='cursor'>Save</p>
//                     <p onClick={cancelEdit} className='cursor'>
//                       Cancel
//                     </p>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p>{item.name}</p>
//                   <p>{item.category}</p>
//                   <p>${item.price}</p>
//                   <div className='action-buttons'>
//                     <p onClick={() => startEdit(item)} className='cursor'>
//                       <FontAwesomeIcon icon={faPenToSquare} />
//                     </p>
//                     <p onClick={() => removeFood(item._id)} className='cursor'>
//                       <FontAwesomeIcon icon={faTrash} />
//                     </p>
//                   </div>
//                 </>
//               )}
//               {/* <p onClick={() => removeFood(item._id)} className='cursor'>
//                 <FontAwesomeIcon icon={faTrash} />
//               </p> */}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default List;


import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const List = ({ url }) => {
  const [originalList, setOriginalList] = useState([]);
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editData, setEditData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null, // Add image field for file upload
  });

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setOriginalList(response.data.data);
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.error(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      image: null, // Reset image; user can upload a new one
    });
  };

  const updateFood = async (foodId) => {
    const formData = new FormData();
    formData.append('id', foodId);
    formData.append('name', editData.name);
    formData.append('category', editData.category);
    formData.append('price', editData.price);
    formData.append('description', editData.description);
    if (editData.image) {
      formData.append('image', editData.image); // Append new image if selected
    }

    const response = await axios.post(`${url}/api/food/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
      setEditId(null);
    } else {
      toast.error("Error");
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEditData({ ...editData, image: files[0] }); // Store the file
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: '', category: '', price: '', description: '', image: null });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === '') {
      setList(originalList);
    } else {
      const filtered = originalList.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.price.toString().includes(query)
      );
      setList(filtered);
    }
  };

  const resetList = () => {
    setList(originalList);
    setSearchQuery('');
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className='search-input'
        />
      </div>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            {editId === item._id ? (
              <>
                <div>
                  <img src={`${url}/images/${item.image}`} alt="" className="edit-preview-image" />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleEditChange}
                  />
                </div>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                />
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                />
                <div className='action-buttons'>
                  <p onClick={() => updateFood(item._id)} className='cursor'>
                    Save
                  </p>
                  <p onClick={cancelEdit} className='cursor'>
                    Cancel
                  </p>
                </div>
              </>
            ) : (
              <>
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <div className='action-buttons'>
                  <p onClick={() => startEdit(item)} className='cursor'>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </p>
                  <p onClick={() => removeFood(item._id)} className='cursor'>
                    <FontAwesomeIcon icon={faTrash} />
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;