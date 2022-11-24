import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const ProductCard = ({ product }) => {
    const {loading} = useContext(AuthContext)
  console.log(product.title);
  const {_id,
     img, title, location, 
     price, orgPrice, used, 
     postTime, seller, sellerMail} = product

     if(loading){
        return <Loading></Loading>
     }

  return (
    <div className="card bg-blue-400 shadow-xl">
      <figure>
        <img className="w-full" src={img} alt="products" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
