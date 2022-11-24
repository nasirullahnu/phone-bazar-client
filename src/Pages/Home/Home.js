import React from 'react';
import Banner from './Banner/Banner';
import Categories from './Categories/Categories';

const Home = () => {
    return (
        <div className='mx-8 my-8'>
            <Banner></Banner>
            <Categories></Categories>
        </div>
    );
};

export default Home;