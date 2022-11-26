import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import ConfirmModal from '../../Shared/Loading/ConfirmModal/ConfirmModal';
import toast from 'react-hot-toast';

const MyProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState(null)
    const {user} = useContext(AuthContext)
    
    const closeModal = () => {
        setDeletingProduct(null)
    }


    const url = `http://localhost:5000/products?email=${user?.email}`
    const {data: products =[], isLoading, refetch} = useQuery({
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

    const deleteProduct = product => {
        // console.log(product._id)
        fetch(`http://localhost:5000/products/${product._id}`,{
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                toast.success(`${product.title} deleted succesfully`)
                refetch();
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl text-white'>You Contribute {products.length} Products </h2>
            <div className="overflow-x-auto">
                <table className="table w-full my-5">
                    <thead>
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
                        <label htmlFor="delete-modal" className="btn btn-success">Promote</label>
                        </td>
                        <td>
                        <label onClick={()=>setDeletingProduct(product) } htmlFor="delete-modal" className="btn btn-error ">Delete</label>
                        </td>
                    </tr>)
                    }
                    </tbody>
                </table>
            </div>

                    {
                    deletingProduct &&
                    <ConfirmModal
                    title={`Delete ${deletingProduct.title}?`}
                    image={deletingProduct.img}
                    message={`Carefully, It can not be recovered again!`}
                    closeModal={closeModal}
                    confirmAction={deleteProduct}
                    modalData={deletingProduct}
                    succesButtonName="Confirm"
                    ></ConfirmModal>
                    }

        </div>
    );
};

export default MyProducts;