import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';
import UserDeleteModal from '../../Shared/userDeleteModal/UserDeleteModal';

const ReportPage = () => {

    const [deletingReview, setDeletingReview] = useState(null)

    const closeModal = () => {
        setDeletingReview(null)
    }

    const url = `http://localhost:5000/reports`
    const {data: reportedItems =[], isLoading, refetch} = useQuery({
        queryKey : ['reports'],
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

    const deleteReport = data => {
        console.log(data)
        fetch(`http://localhost:5000/reports/${data._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success('report is deleted');
          refetch();
        }
      });
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className="mx-5">
            <h2 className="text-3xl my-5 text-white font-bold">Reported Items {reportedItems.length}</h2>
            <div className='grid gap-2 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 my-5'>
                {
                    reportedItems?.map(reported => <div className="card bg-base-100 shadow-xl">
                    <figure><img src={reported.productImg} alt="Shoes" className='h-32' /></figure>
                    <div className="card-body">
                    <h2 className="card-title">
                        {reported.productName}
                    </h2>
                    <p>Reported by : {reported.reporter}</p>
                    <p>Seller : {reported.productSeller}</p>
                    <p>Seller : {reported.productSeller}</p>
                    <p className='text-red-500'>{reported.report}</p>
                    <div className="card-actions justify-end">
                        <label onClick={()=> setDeletingReview(reported)} htmlFor="delete-user" className="btn btn-error ">Clear Review</label> 
                        <label onClick={()=> setDeletingReview(reported)} htmlFor="delete-user" className="btn btn-error ">Delete Product</label> 
                    </div>
                    </div>
                </div>)
                }
            </div>

            {
                deletingReview &&
                <UserDeleteModal
                title={`Delete ${deletingReview.reporter} report?`}
                message={`report will vanish after delete`}
                succesButtonName="Clear Review"
                modalData={deletingReview}
                confirmAction={deleteReport}
                closeModal={closeModal}
                ></UserDeleteModal>
            }

        </div>
    );
};

export default ReportPage;