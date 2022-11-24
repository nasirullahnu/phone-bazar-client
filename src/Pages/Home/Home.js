import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import Banner from './Banner/Banner';

const Home = () => {
    return (
        <div className='mx-8 my-8'>
            <Banner></Banner>
            <Loading></Loading>
        </div>
    );
};

export default Home;