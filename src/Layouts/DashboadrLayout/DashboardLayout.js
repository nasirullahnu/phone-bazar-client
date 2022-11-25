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
            <div className="drawer drawer-mobile bg-indigo-500 my-5">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            <li>
              <Link className="btn btn-outline mt-3" to='/dashboard'>My Orders</Link>
            </li>
            <li>
              <Link className="btn btn-outline mt-3" to='/dashboard/allUsers'>All Users</Link>
              <Link className="btn btn-outline mt-3" to='/dashboard/addDoctor'>Add a Doctor</Link>
              <Link className="btn btn-outline mt-3" to='/dashboard/manageDoctors'>Manage Doctors</Link>
            </li>
            
          </ul>
        </div>
      </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;