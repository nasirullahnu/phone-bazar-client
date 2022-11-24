import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const DashboardLayout = () => {
    const {loading} = useContext(AuthContext);

    if(loading){
        return <Loading></Loading>
    }
    
    return (

        <div>
            <h2 className='text-4xl'>This is a secure route</h2>
        </div>
    );
};

export default DashboardLayout;