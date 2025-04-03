// // LoginRegister.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = ({ setToken }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [data, setData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate();
//   const url = "http://localhost:8000";

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data => ({...data, [name]: value}));
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     const endpoint = isLogin ? '/api/user/login' : '/api/user/register';
    
//     try {
//       const response = await axios.post(`${url}${endpoint}`, data);
      
//       if (response.data.success) {
//         if (isLogin) {
//           setToken(response.data.token);
//           localStorage.setItem("token", response.data.token);
//           navigate('/list');
//         } else {
//           alert('Registration successful! Please login.');
//           setIsLogin(true);
//           setData({ name: '', email: '', password: '' });
//         }
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="login-register-container">
//       <form onSubmit={onSubmit} className="login-register-form">
//         <h2>{isLogin ? 'Login' : 'Register'}</h2>
//         <div className="form-inputs">
//           {!isLogin && (
//             <input
//               name="name"
//               onChange={onChangeHandler}
//               value={data.name}
//               type="text"
//               placeholder="Your name"
//               required={!isLogin}
//             />
//           )}
//           <input
//             name="email"
//             onChange={onChangeHandler}
//             value={data.email}
//             type="email"
//             placeholder="Your email"
//             required
//           />
//           <input
//             name="password"
//             onChange={onChangeHandler}
//             value={data.password}
//             type="password"
//             placeholder="Your password"
//             required
//           />
//         </div>
//         <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
//         <p className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const url = "http://localhost:8000";

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const showMessage = (type, message) => {
    if (type === 'error') {
      setErrorMessage(message);
      setTimeout(() => setErrorMessage(''), 3000); // Hide after 3 sec
    } else {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 3000); // Hide after 3 sec
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isLogin ? '/api/user/login' : '/api/user/register';

    try {
      const response = await axios.post(`${url}${endpoint}`, data);

      if (response.data.success) {
        if (isLogin) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          showMessage('success', 'Login Successfull');
          setTimeout(() => navigate('/list'), 1500);
        } else {
          showMessage('success', 'Registration successfull! Please login.');
          setIsLogin(true);
          setData({ name: '', email: '', password: '' });
        }
      } else {
        showMessage('error', response.data.message);
      }
    } catch (error) {
      showMessage('error', 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-register-container">
      <form onSubmit={onSubmit} className="login-register-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        {/* 🔹 Success Alert */}
        {successMessage && <div className="alert-success show">{successMessage}</div>}
        
        {/* 🔹 Error Alert */}
        {errorMessage && <div className="alert-error show">{errorMessage}</div>}

        <div className="form-inputs">
          {!isLogin && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required={!isLogin}
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default Login;
