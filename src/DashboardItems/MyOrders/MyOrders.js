import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
    const {user} = useContext(AuthContext)

    const url = `http://localhost:5000/bookings?email=${user?.email}`

    const {data: bookings =[], isLoading} = useQuery({
        queryKey : ['bookings'],
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
                        <label htmlFor="confirmation-modal" className="btn btn-error">Pay</label>
                        </td>
                        <td>
                        <label htmlFor="confirmation-modal" className="btn btn-error">Cancel</label>
                        </td>
                    </tr>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;