// import React from 'react'
// import './Orders.css'
// import { useState } from 'react'
// import { toast } from 'react-toastify'
// import { useEffect } from 'react'
// import axios from "axios"
// import { assets } from '../../assets/assets'

// const Orders = ({url}) => {

//   const [orders,setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     const response = await axios.get(url+"/api/order/list");
//     if(response.data.success){
//       setOrders(response.data.orders);
//       console.log(response.data.data);
//     }else{
//       toast.error("Error")
//     }
//   }

//   useEffect(()=>{
//     fetchAllOrders();
//   })

//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className='order-list'>
//         {orders.map((order,index)=>(
//           <div key={index} className='ordeer-item'>
//             <img src={assets.parcel_icon} alt=''/>
//             <div>
//               <p className='order-item-food'>
//                 {order.items.map((item,index)=>{
//                   if(index===order.items.length-1){
//                      return item.name + " x " + item.quantity
//                   }
//                   else{
//                     return item.name + " x " + item.quantity + ", "
//                   }
//                 })}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Orders


import React from 'react';
import './Orders.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]); // Store original orders
  const [searchQuery, setSearchQuery] = useState(''); // Track search input

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      console.log('API Response:', response.data); // Log the full response to inspect it
      if (response.data.success) {
        // Use response.data.data if that's the field; adjust based on console output
        // setOrders(response.data.data || response.data.orders || []);
        const orderData = response.data.data || response.data.orders || [];
        setOrders(orderData);
        setOriginalOrders(orderData);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error connecting to server');
    }
  };

  const statusHandler = async (event,orderId) => {
    const response = await axios.post(url+"/api/order/status", {
      orderId,
      status:event.target.value
    })
    if(response.data.success) {
      await fetchAllOrders();
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setOrders(originalOrders); // Reset to original orders if query is empty
    } else {
      const filteredOrders = originalOrders.filter(
        (order) =>
          order.address.firstName.toLowerCase().includes(query) ||
          order.address.lastName.toLowerCase().includes(query)
      );
      setOrders(filteredOrders); // Update with filtered orders
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Add url as dependency since it’s used in the fetch

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="order-list">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item"> {/* Fixed typo: ordeer-item → order-item */}
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, itemIndex) => (
                    itemIndex === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  ))}
                </p>
                <p className='order-item-name'>
                  {order.address.firstName+""+order.address.lastName}
                </p>
                <div className='order-item-address'>
                  <p>{order.address.street+","}</p>
                  <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items:{order.items.length}</p>
              <p>${order.amount}</p>
              <select onClick={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="wait! food is Processing">wait! food is Processing</option>
                <option value="food is ready">food is ready</option>
                <option value="Thank you for order and wait for delivery">Thank you for order and wait for delivery</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders available</p> // Fallback if orders is empty or not an array
        )}
      </div>
    </div>
  );
};

export default Orders;

