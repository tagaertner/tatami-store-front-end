import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  // Login,
  Checkout,
  Orders,
} from './pages';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import { ErrorElement } from './components';
import {loader as landingLoader} from './pages/Landing';
import {loader as productsLoader} from './pages/Products'
import {loader as singleProductLoader} from './pages/SingleProduct'
import {loader as checkoutLoader } from './pages/Checkout';
import {loader as ordersLoader} from './pages/Orders';
import OrderConfirmation, {loader as orderConfirmationLoader } from './pages/OrderConfirmation';
import ContactUs, {loader as contactLoader} from './pages/ContactUs';
import UserProfilePage  from './pages/UserProfilePage'
import AuthHandler from './components/AuthHandler';
// actions

import { action as registerUser } from './pages/Register';
// import { action as loginUser } from './pages/Login';
// import { checkoutAction } from './actions/checkoutActions';
import { checkoutCartTotalAction } from './actions/checkoutCartTotalActions';


import {store} from './store';



const router = createBrowserRouter ([
  {// homelayout is the parent
    path:'/',
    element: (
      <>
        <AuthHandler />
        <HomeLayout />
      </>
    ),
    errorElement: <Error/>,
    children:[
      
      {
        index:true,
        element:<Landing/>,
        errorElement: <ErrorElement/>,
        loader: landingLoader,
     },
     {        
      path:'privacy',
      element: <Privacy/>,
      errorElement: <ErrorElement/>,
    },
    {
      path:'terms',
      element: <Terms/>,
      errorElement: <ErrorElement/>,
    },
    {
      path: 'contact',
      element: <ContactUs />,
      loader: contactLoader(store),
      errorElement: <ErrorElement/>  
    },
     
      {
        path:'products',
        element:<Products/>,
        errorElement: <ErrorElement/>,
        loader: productsLoader,
      },
      {
        path:'products/:id',
        element: <SingleProduct/>,
        errorElement: <ErrorElement/>,
        loader: singleProductLoader,
      },
      {
        path:'cart',
        element: <Cart/>,
        errorElement: <ErrorElement/>,
      },
      {
        path:'about',
        element: <About/>,
        errorElement: <ErrorElement/>,
      },
      {
        path:'checkout',
        element: <Checkout/>,
        errorElement: <ErrorElement/>,
        loader: checkoutLoader(store),
        children:[{
          path: 'address',
          // action: checkoutAction(store),
        },
        { 
          path: 'payment',
          action: checkoutCartTotalAction(store)

          },
                
        ]
      },

      // {
      //   path: '/contact',
      //   element: <ContactUs />,
      //   loader: contactLoader(store)  
      // },
      {
        path:'order-confirmation',
        element:<OrderConfirmation/>,
        errorElement: <ErrorElement/>,
        loader: orderConfirmationLoader(store),
      },
      {
        path:'orders',
        element: <Orders/>,
        errorElement: <ErrorElement/>,
        loader: ordersLoader(store),
      },
      {
        path: 'profile',
        element: <UserProfilePage />,
        errorElement: <ErrorElement/>
      },

    ]
  },
  // {
  //   path:'/login', 
  //   // element:<Login/>, 
  //   errorElement: <Error/>,
  //   // action:loginUser(store),
  // },
  {
    path:'/register', 
    element:<Register/>,
     errorElement: <Error/>,
      action: registerUser,
  },

 
])
function App() {
  return <RouterProvider router={router}/>
  }

export default App;
