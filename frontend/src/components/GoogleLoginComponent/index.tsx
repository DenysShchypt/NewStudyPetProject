// import React from 'react';
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   CredentialResponse,
// } from '@react-oauth/google';

// const GoogleLoginComponent: React.FC = () => {
//   const handleError = (error: void) => {
//     console.error('Login Error:', error);
//   };

//   const responseGoogle = async (response: CredentialResponse) => {
//     if (response.credential) {
//       try {
//         const res = await fetch('http://localhost:4000/api/auth/google', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include', // Додано для включення куків у запит
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }

//         const data = await res.json();
//         console.log('User info:', data);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//   };

//   return (
//     <GoogleOAuthProvider
//       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
//     >
//       <GoogleLogin
//         onSuccess={responseGoogle}
//         onError={(error: void) => {
//           handleError(error);
//         }}
//       />
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginComponent;

import React from 'react';
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginComponent: React.FC = () => {
  const handleError = (error: void) => {
    console.error('Login Error:', error);
  };

  const responseGoogle = async (response: CredentialResponse) => {
    if (response.credential) {
      try {
        const res = await axios.get('http://localhost:4000/api/auth/google', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('User info:', res.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
    >
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={(error: void) => {
          handleError(error);
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
// import React, { useEffect } from 'react';

// const GoogleLoginComponent: React.FC = () => {
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get('token');
//     if (token) {
//       // Збереження токена і перенаправлення
//       localStorage.setItem('token', token);
//       window.location.href = '/'; // перенаправити користувача на головну сторінку
//     }
//   }, []);

//   const handleLogin = () => {
//     window.location.href = 'http://localhost:4000/api/auth/google';
//   };

//   return <button onClick={handleLogin}>Login with Google</button>;
// };

// export default GoogleLoginComponent;
