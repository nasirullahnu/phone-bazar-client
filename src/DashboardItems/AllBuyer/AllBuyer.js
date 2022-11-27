import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import UserDeleteModal from "../../Shared/userDeleteModal/UserDeleteModal";

const AllBuyer = () => {
    const [deletingBuyer, setDeletingBuyer] = useState(null)

    const closeModal = () => {
        setDeletingBuyer(null)
    }

  const url = `http://localhost:5000/buyers?role=buyer`;
  const { data: buyers = [], refetch, isLoading } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      try {
        const res = fetch(url);
        const data = await (await res).json();
        return data;
      } catch (error) {}
    },
  });


  const deleteBuyer = buyer => {
    console.log(buyer)
    fetch(`http://localhost:5000/buyers/${buyer._id}`,{
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                toast.success(`${buyer.name} deleted succesfully`)
                refetch();
            }
        })
  }


  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="mx-5">
      <h2 className="text-3xl my-5 text-white font-bold">{buyers.length} Buyers</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Delete Buyer</th>
              </tr>
            </thead>
            <tbody>
              {
                buyers.map((buyer, i) => <tr key={buyer._id} className="hover">
                <th>{i+1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>
                <label onClick={()=> setDeletingBuyer(buyer)} htmlFor="delete-user" className="btn btn-error ">Delete</label>
                </td>
              </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
              {
                deletingBuyer && 
                <UserDeleteModal
                title={`Delete ${deletingBuyer.name}?`}
                message={`Carefully, Once you delete buyer will not be able to re-access`}
                succesButtonName="Delete"
                modalData={deletingBuyer}
                confirmAction={deleteBuyer}
                closeModal={closeModal}
                ></UserDeleteModal>
              }
    </div>
  );
};

export default AllBuyer;
