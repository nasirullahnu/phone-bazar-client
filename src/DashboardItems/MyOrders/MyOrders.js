import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import ConfirmModal from '../../Shared/Loading/ConfirmModal/ConfirmModal';
import toast from 'react-hot-toast';

const MyOrders = () => {
    const {user} = useContext(AuthContext)
    const [deleteOrder, setDeleteOrder] = useState(null);

    const closeModal = () => {
        setDeleteOrder(null)
    }

    const url = `http://localhost:5000/bookings?email=${user?.email}`
    const {data: bookings =[], isLoading, refetch} = useQuery({
        queryKey : ['bookings'],
        queryFn: async() => {
            try{
                const res = fetch(url, {
                    headers : {
                        authorization : `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await (await res).json();
                return data;
            }
            catch(error){

            }
        }
    })

    const cancelOrder = booking =>{
        console.log(booking)
        fetch(`http://localhost:5000/bookings/${booking._id}`,{
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                toast.success(`${booking.product} deleted succesfully`)
                refetch();
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-3xl text-white '>You have currently {bookings.length} orders</h2>
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
                        bookings?.length &&
                        bookings.map((booking, i) => <tr key={booking._id} className="hover">
                        <th>{i+1}</th>
                        <td>
                            <div className="avatar">
                                <div className="w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img alt='doctor' src={booking.productImg} />
                                </div>
                            </div>
                        </td>
                        <td>{booking.product}</td>
                        <td>{booking.price}</td>
                        <td>
                        <label htmlFor="delete-modal" className="btn btn-error">Pay</label>
                        </td>
                        <td>
                        <label onClick={()=> setDeleteOrder(booking)} htmlFor="delete-modal" className="btn btn-error">Cancel</label>
                        </td>
                    </tr>)
                    }
                    </tbody>
                </table>
            </div>

                    {
                        deleteOrder && 
                        <ConfirmModal
                        title={`Cancle ${deleteOrder.product}`}
                        succesButtonName="Cancel Order"
                        image={deleteOrder.productImg}
                        message={`Your order will be dismised after Cancel`}
                        closeModal={closeModal}
                        modalData={deleteOrder}
                        confirmAction={cancelOrder}
                        ></ConfirmModal>
                    }

        </div>
    );
};

export default MyOrders;