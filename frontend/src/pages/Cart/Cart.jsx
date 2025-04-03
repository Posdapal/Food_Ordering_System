// import React, { useContext } from 'react'
// import './Cart.css'
// import { StoreContext } from '../../context/StoreContext'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {

//   const { cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext)

//   const navigate = useNavigate();

//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item, index) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div>
//                 <div className='cart-items-title cart-items-item'>
//                   <img src={url+"/images/"+item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>{item.price * cartItems[item._id]}</p>
//                   {/* <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p> */}
//                   <p onClick={() => removeFromCart(item._id)} className='cross'>
//                     <FontAwesomeIcon icon={faTrash} />
//                   </p>
//                 </div>
//                 <hr />

//               </div>

//             )
//           }
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className='cart-total'>
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${getTotalCartAmount()===0?0:2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
//             </div>
//           </div>
//           <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>If you have promo code, Enter it here</p>
//             <div className='cart-promocode-input'>
//               <input type="text" placeholder='promo code'/>
//               <button>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cart


// import React, { useContext, useState } from 'react';
// import './Cart.css';
// import { StoreContext } from '../../context/StoreContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
//   const navigate = useNavigate();

//   // State for promo code
//   const [promoCode, setPromoCode] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [promoError, setPromoError] = useState('');

//   // Sample promo codes (in a real app, this would come from backend)
//   const validPromoCodes = {
//     'SAVE10': 0.10, // 10% discount
//     'SAVE20': 0.20, // 20% discount
//     'FREESHIP': 0,   // Free shipping only
//   };

//   // Handle promo code submission
//   const handlePromoSubmit = () => {
//     const trimmedCode = promoCode.trim().toUpperCase();
    
//     if (validPromoCodes.hasOwnProperty(trimmedCode)) {
//       setDiscount(validPromoCodes[trimmedCode]);
//       setPromoError('');
//       setPromoCode(''); // Clear input after successful application
//       alert(`Promo code ${trimmedCode} applied successfully!`);
//     } else {
//       setDiscount(0);
//       setPromoError('Invalid promo code');
//     }
//   };

//   // Calculate totals with discount
//   const subtotal = getTotalCartAmount();
//   const deliveryFee = subtotal === 0 ? 0 : 2;
//   const discountAmount = subtotal * discount;
//   const totalBeforeDelivery = subtotal - discountAmount;
//   const finalTotal = totalBeforeDelivery + (discount === 'FREESHIP' ? 0 : deliveryFee);

//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div key={item._id}>
//                 <div className='cart-items-title cart-items-item'>
//                   <img src={`${url}/images/${item.image}`} alt={item.name} />
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
//                   <p onClick={() => removeFromCart(item._id)} className='cross'>
//                     <FontAwesomeIcon icon={faTrash} />
//                   </p>
//                 </div>
//                 <hr />
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className='cart-total'>
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${subtotal.toFixed(2)}</p>
//             </div>
//             <hr />
//             {discount > 0 && (
//               <>
//                 <div className="cart-total-details">
//                   <p>Discount</p>
//                   <p>-${discountAmount.toFixed(2)}</p>
//                 </div>
//                 <hr />
//               </>
//             )}
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${deliveryFee.toFixed(2)}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${finalTotal.toFixed(2)}</b>
//             </div>
//           </div>
//           <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>If you have a promo code, enter it here</p>
//             <div className='cart-promocode-input'>
//               <input 
//                 type="text" 
//                 placeholder='Promo code (e.g., SAVE10)'
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//               />
//               <button onClick={handlePromoSubmit}>Apply</button>
//             </div>
//             {promoError && <p className="promo-error">{promoError}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // State for promo code
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [promoMessageType, setPromoMessageType] = useState('');

  // Sample promo codes (in a real app, this would come from backend)
  const validPromoCodes = {
    'SAVE10': 0.10, // 10% discount
    'SAVE20': 0.20, // 20% discount
    'FREESHIP': 0,   // Free shipping only
  };

  // Handle promo code submission
  const handlePromoSubmit = () => {
    const trimmedCode = promoCode.trim().toUpperCase();
    
    if (validPromoCodes.hasOwnProperty(trimmedCode)) {
      setDiscount(validPromoCodes[trimmedCode]);
      setPromoError('');
      setPromoCode(''); // Clear input after successful application
      setPromoMessage(`Promo code ${trimmedCode} applied successfully!`);
      setPromoMessageType('success'); // Green alert
    } else {
      setDiscount(0);
      setPromoError('Invalid promo code');
      setPromoMessage('');
      setPromoMessageType('error'); // Red alert
    }
  };

  // Calculate totals with discount
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const discountAmount = subtotal * discount;
  const totalBeforeDelivery = subtotal - discountAmount;
  const finalTotal = totalBeforeDelivery + (discount === 'FREESHIP' ? 0 : deliveryFee);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>
                    <FontAwesomeIcon icon={faTrash} />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
                <div className="cart-total-details">
                  <p>Discount</p>
                  <p>-${discountAmount.toFixed(2)}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${finalTotal.toFixed(2)}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input 
                type="text" 
                placeholder='Promo code (e.g., SAVE10)'
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoSubmit}>Apply</button>
            </div>
            {promoMessage && (
              <div 
                className={`promo-message ${promoMessageType === 'success' ? 'success' : 'error'}`}
              >
                {promoMessage}
              </div>
            )}
            {promoError && <p className="promo-error">{promoError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
