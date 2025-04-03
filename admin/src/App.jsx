// import React from 'react'
// import Navbar from './components/Navbar/Navbar'
// import Sidebar from './components/Sidebar/Sidebar'
// import {Routes, Route} from 'react-router-dom'
// import Orders from './pages/Orders/Orders'
// import Add from './pages/Add/Add'
// import List from './pages/List/List'
// import {ToastContainer, toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Edit from './pages/Edit/Edit'

// const App = () => {

// const url = "http://localhost:8000"

//   return (
//     <div>
//       <ToastContainer/>
//        <Navbar/>
//         <hr/>
//         <div className="app-content">
//             <Sidebar/>
//             <Routes>
//               <Route path="/add" element={<Add url={url}/>}/>
//               {/* <Route path="/edit" element={<Edit url={url}/>}/> */}
//               <Route path="/list" element={<List url={url}/>}/>
//               <Route path="/orders" element={<Orders url={url}/>}/>
//             </Routes>
//         </div>
//     </div>
//   )
// }

// export default App



// App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Orders from './pages/Orders/Orders';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const url = "http://localhost:8000";

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <div>
      <ToastContainer />
      <Navbar token={token} setToken={setToken} />
      <hr />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <div className="app-content">
                <Sidebar />
                <Add url={url} />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <div className="app-content">
                <Sidebar />
                <List url={url} />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <div className="app-content">
                <Sidebar />
                <Orders url={url} />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="app-content">
                <Sidebar />
                <List url={url} />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;