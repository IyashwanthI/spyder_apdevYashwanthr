import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom';
import App from './App.jsx';
import JoinRoom from './Chat/joinroom.jsx';
import Loginsignup from './signin/Login_signup.jsx';
import Signup from './signin/signup.jsx';
import ProtectedRoute from './firebasejs/Protected Route.jsx';
import { UserAuthContextProvider } from './firebasejs/UserAuthContext.jsx';
import  Socket  from 'socket.io-client';
import Text_editor from './CDT/cdt.jsx';
import { v4 as uuidV4 } from "uuid"
import BucketNames from './file_storage/test.jsx';
const socket=Socket.connect('http://localhost:3000')
const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <App />
    ),
    errorElement: (
      <div className="error-page">
        <h1>404 Not Found</h1>
      </div>
    ),
  },
  {
    path: '/signin',
    element: <ProtectedRoute><Loginsignup /></ProtectedRoute>,
  },
  {
    path: '/signup',
    element: <ProtectedRoute><Signup /></ProtectedRoute>,
  },
  {
    path: '/chathome',
    element: <JoinRoom socket={socket}/>,
  },
  {
    path: '/documents/:id',
    element: <Text_editor/>,
  },
  {
    path: '/cdt',
    element: <Navigate to={`/documents/${uuidV4()}`} />,
  },
  {
    path:'/buckets/',
    element: <BucketNames/>
  },
]);

// Rendering the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </React.StrictMode>
);
