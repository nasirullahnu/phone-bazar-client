import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import UserDeleteModal from "../../Shared/userDeleteModal/UserDeleteModal";
import toast from "react-hot-toast";

const AllSeller = () => {
  const [deletingSeller, setDeletingSeller] = useState();

  const closeModal = () => {
    setDeletingSeller(null);
  };

  const url = `http://localhost:5000/sellers?role=seller`;
  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      try {
        const res = fetch(url);
        const data = await (await res).json();
        return data;
      } catch (error) {}
    },
  });

  const deleteSeller = (seller) => {
    console.log(seller);
    fetch(`http://localhost:5000/sellers/${seller._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success(`${seller.name} deleted succesfully`);
          refetch();
        }
      });
  };

  // verify seller
  const verifySeller = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/allUsers/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("seller is VERIFIED now");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="mx-5">
      <h2 className="text-3xl my-5 text-white font-bold">
        {sellers.length} Seller
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin Role</th>
                <th>Delete Seller</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, i) => (
                <tr key={seller._id} className="hover">
                  <th>{i + 1}</th>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>
                    {seller.status !== "verified" && (
                      <label
                        onClick={() => verifySeller(seller._id)}
                        htmlFor="delete-user"
                        className="btn btn-info "
                      >
                        Verify Seller
                      </label>
                    )}
                    {seller.status === "verified" && <p>Seller is Verified</p>}
                  </td>
                  <td>
                    <label
                      onClick={() => setDeletingSeller(seller)}
                      htmlFor="delete-user"
                      className="btn btn-error "
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deletingSeller && (
        <UserDeleteModal
          title={`Delete ${deletingSeller.name}?`}
          message={`Carefully, Once you delete seller will not be able to re-access`}
          succesButtonName="Delete"
          modalData={deletingSeller}
          confirmAction={deleteSeller}
          closeModal={closeModal}
        ></UserDeleteModal>
      )}
    </div>
  );
};

export default AllSeller;
