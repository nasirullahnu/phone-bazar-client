import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductPage = () => {
    const products = useLoaderData();
    console.log(products)
    return (
        <div>
            <h1 className='text-4xl my-10'>Chose Your Favourite Product</h1>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 my-5'>
                {
                    products.map(product => <ProductCard
                    key={product._id}
                    product={product}
                    ></ProductCard>)
                }
            </div>
        </div>
    );
};

export default ProductPage;