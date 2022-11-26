import React from 'react';
import { useQuery } from '@tanstack/react-query';

const AllSeller = () => {

    const url = `http://localhost:5000/allUsers`
    const {data: users =[]} = useQuery({
        queryKey : ['allUsers'],
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

    return (
        <div>
            <h2 className='text-3xl'>Sellers on this site {users.length}</h2>
            {
                users.map(user => <p
                key={user._id}
                >{user.role}</p>)
            }
        </div>
    );
};

export default AllSeller;