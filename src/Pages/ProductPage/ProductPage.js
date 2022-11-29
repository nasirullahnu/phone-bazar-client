import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from './BookingModal';
import ProductCard from './ProductCard';
import ReportModal from './ReportModal';

const ProductPage = () => {
    const products = useLoaderData();
    const [product, setProduct] = useState(null)
    console.log(products)
    return (
        <div>
            <h1 className='text-4xl my-10'>Chose Your Favourite Product</h1>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-5 my-5'>
                {
                    products.map(product => <ProductCard
                    key={product._id}
                    product={product}
                    setProduct={setProduct}
                    ></ProductCard>)
                }
            </div>

                {product &&
                    <BookingModal
                    product={product}
                    setProduct={setProduct}
                    ></BookingModal>
                }

                {
                    product && 
                    <ReportModal
                    product={product}
                    setProduct={setProduct}
                    ></ReportModal>
                }

        </div>
    );
};

export default ProductPage;