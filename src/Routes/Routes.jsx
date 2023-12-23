import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Login/Register/Register";
import Main from "../layouts/Main";
import NotFound from "../Shared/NotFound";
import ErrorElement from "../Shared/ErrorElement";
import PrivateRoute from "./PrivateRoutes";
import Blogs from "../pages/Blogs/Blogs";
import Create from "../pages/Toys/Create";
import Toys from "../pages/Toys/Toys";
import MyToys from "../pages/Toys/MyToys";
import SingleToy from "../pages/Toys/SingleToy";
import Legos from "../pages/Home/Legos";

  export const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginLayout></LoginLayout>,
      errorElement: <ErrorElement></ErrorElement>, 
      children: [
          {
              path: '/',
              element: <Navigate to="/home"></Navigate> 
          },
          {
              path: 'login',
              element: <Login></Login>
          },
          {
              path: 'register',
              element: <Register></Register>
          }
      ]
  },
  {
      path: 'home',
      element: <Main></Main>,
      errorElement: <ErrorElement></ErrorElement>,
      children: [
          {
              path: '',
              element: <Legos></Legos>,
          },
          {
              path: 'toys/:id',
              element: <PrivateRoute><SingleToy></SingleToy></PrivateRoute> ,
              loader: ({params}) => fetch(`https://lego-shop-jade.vercel.app/toys/${params.id}`)
          },
      ]
  },
  {
      path: 'toys',
      element: <Main></Main>,
      errorElement: <ErrorElement></ErrorElement>,
      children: [
          {
              path: '',
              element: <Toys></Toys>,
              loader: () => fetch('https://lego-shop-jade.vercel.app/toys')
          },
          {
              path: 'my-toys',
              element: <PrivateRoute><MyToys></MyToys></PrivateRoute> ,
          },
          {
              path: 'create',
              element: <PrivateRoute><Create></Create></PrivateRoute> ,
              loader: ()=> fetch('https://lego-shop-5580f.web.app')
          },

      ]
  },
  {
      path:'blogs',
      element: <Main></Main>,
      errorElement: <ErrorElement></ErrorElement>,
      children:[
          {
              path:'',
              element: <Blogs></Blogs>
          }
      ]
  },
  {
      path: "*",
      element: <NotFound></NotFound>
    }
  ]); 

  export default router;