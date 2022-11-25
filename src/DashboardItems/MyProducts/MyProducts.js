import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';

const MyProducts = () => {
    const {user} = useContext(AuthContext)

    const url = `http://localhost:5000/products?email=${user?.email}`

    const {data: products =[], isLoading} = useQuery({
        queryKey : ['products'],
        queryFn: async() => {
            try{
                const res = fetch(url);
                const data = await (await res).json();
                return data;
            }
            catch(error){

            }
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl text-white'>You Contribute {products.length} Products </h2>
            <div className="overflow-x-auto bg-indigo-600">
                <table className="table w-full my-5 bg-indigo-500">
                    <thead className='bg-indigo-500'>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Promote</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products?.length &&
                        products.map((product, i) => <tr key={product._id} className="hover">
                        <th>{i+1}</th>
                        <td>
                            <div className="avatar">
                                <div className="w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img alt='doctor' src={product.img} />
                                </div>
                            </div>
                        </td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>
                        <label htmlFor="confirmation-modal" className="btn btn-error">Promote</label>
                        </td>
                        <td>
                        <label htmlFor="confirmation-modal" className="btn btn-error">Delete</label>
                        </td>
                    </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;