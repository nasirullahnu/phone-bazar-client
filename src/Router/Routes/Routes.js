import { createBrowserRouter } from "react-router-dom";
import MyOrders from "../../DashboardItems/MyOrders/MyOrders";
import DashboardLayout from "../../Layouts/DashboadrLayout/DashboardLayout";
import Main from "../../Layouts/Main/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import ProductPage from "../../Pages/ProductPage/ProductPage";
import Signup from "../../Pages/Signup/Signup";
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
                element : <ProductPage></ProductPage>
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
            }
        ]
    }

])

export default router;