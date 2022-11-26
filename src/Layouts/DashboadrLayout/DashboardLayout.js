import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Footer from '../../Pages/Footer/Footer';
import Navbar from '../../Pages/Navbar/Navbar';
import Loading from '../../Shared/Loading/Loading';

const DashboardLayout = () => {
    const {loading} = useContext(AuthContext);

    if(loading){
        return <Loading></Loading>
    }

    return (

        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile bg-blue-700 my-5">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side bg-indigo-500">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            <li>
              <Link className="btn btn-info mt-3" to='/dashboard'>My Orders</Link>
            </li>
            <li>
              <Link className="btn btn-info mt-3" to='/dashboard/addProducts'>Add Products</Link>
              <Link className="btn btn-info mt-3" to='/dashboard/myProducts'>My Products</Link>
              <Link className="btn btn-info mt-3" to='/dashboard/allSeller'>All Seller</Link>
              <Link className="btn btn-info mt-3" to='/dashboard/allBuyer'>All Buyer</Link>
            </li>
            
          </ul>
        </div>
      </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;