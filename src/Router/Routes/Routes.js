import { createBrowserRouter } from "react-router-dom";
import AddProducts from "../../DashboardItems/AddProducts/AddProducts";
import AllBuyer from "../../DashboardItems/AllBuyer/AllBuyer";
import AllSeller from "../../DashboardItems/AllSeller/AllSeller";
import MyOrders from "../../DashboardItems/MyOrders/MyOrders";
import MyProducts from "../../DashboardItems/MyProducts/MyProducts";
import DashboardLayout from "../../Layouts/DashboadrLayout/DashboardLayout";
import Main from "../../Layouts/Main/Main";
import Blog from "../../Pages/Home/Blog/Blog";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import ProductPage from "../../Pages/ProductPage/ProductPage";
import Signup from "../../Pages/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivaateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Main></Main>,
        children : [
            {
                path : '/',
                element : <Home></Home>
            },
            {
                path: '/login',
                element : <Login></Login>
            },
            {
                path : '/signup',
                element : <Signup></Signup>
            },
            {
                path : '/products/:id',
                loader : ({params}) => fetch(`http://localhost:5000/products/${params.id}`),
                element : <PrivateRoute><ProductPage></ProductPage></PrivateRoute>
            },
            {
                path : '/blog',
                element : <Blog></Blog>
            }
        ]
    },
    {
        path : '/dashboard',
        element : <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children : [
            {
                path : '/dashboard',
                element : <MyOrders></MyOrders>
            },
            {
                path : '/dashboard/addProducts',
                element : <AddProducts></AddProducts>
            },
            {
                path : '/dashboard/myProducts',
                element : <MyProducts></MyProducts>
            },
            {
                path : '/dashboard/allSeller',
                element : <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path : '/dashboard/allBuyer',
                element : <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
        ]
    },
    {
        path : '*',
        element : <div><h1 class="h-[100px] flex justify-center items-center mx-8 my-8 text-3xl text-red-500 font-semibold">There is nothing your are searching for, please try again !!</h1></div>
    }

])

export default router;