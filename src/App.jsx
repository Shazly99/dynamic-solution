import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Component from './constants/Component';
import VenderContext from './context/Store';
import './style/App.scss';

function App() {

  function ProtectedRoutes({ children }) {
    let token=localStorage.getItem('accessToken')
    if (!token) {
      return <Navigate to="/admin/login" replace={true} />
    }else{
      return children;
    }
  }
  const root = createBrowserRouter([

    {
      path: '', element: <Component.Vendor />, children: [
        { index: true, element: <ProtectedRoutes><Component.Dashboard /> </ProtectedRoutes> },
        { path: '/contact', element: <ProtectedRoutes><Component.Contact /> </ProtectedRoutes> },
        {
          path: '*', element: <Component.Error/>
        }
      ],
    },

    {
      path: '/admin/', element: <Component.Auth />, children: [
        { path: 'login', element: <Component.Login /> },
      ]
    },


  ])
  return (
    <div>

      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: ' Arial, Helvetica, sans-serif',
            textTransform: 'capitalize',
            zIndex: '9999',
            // background: '#000',
            // color: '#fff',
            borderRadius: '10px',
            boxShadow: '10px 10px 10px rgba(188, 188, 188, 0.16)',
            background: '#fff',
            color: '#000',
          },
        }}
        containerStyle={{
          bottom: 50
        }}
      />

      <VenderContext>
        <RouterProvider router={root} />
      </VenderContext>


    </div>
  );
}

export default App;