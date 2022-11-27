import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const ProductCard = ({ product, setProduct }) => {
    const {loading} = useContext(AuthContext)
  console.log(product.title);
  const {_id,
     img, title, location, 
     price, orgPrice, used, 
     postTime, seller, sellerMail,
      condition, phone, description} = product

     if(loading){
        return <Loading></Loading>
     }

  return (
        <div className="card bg-indigo-500 shadow-xl text-white">
      <figure>
        <img className="w-full" src={img} alt="products" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
        </h2>
        <div className="flex mx-0">
            <p>Price : <span className="font-semibold">{price}</span> tk</p>
            <p>Real Price : <span className="font-semibold">{orgPrice}</span> tk</p>
        </div>
        <div className="flex mx-0">
            <p>Used : <span className="font-semibold">{used}</span></p>
            <p>Condition : <span className="font-semibold">{condition}</span></p>
        </div>
        <div className="flex mx-0">
            <p>Posted On : <span className="font-semibold">{postTime}</span></p>
            <p>Location : <span className="font-semibold">{location}</span></p>
        </div>
        <div className="flex mx-0">
            <p>Owner : <span className="font-semibold">{seller}</span></p>
            <p>Call : <span className="font-semibold">{phone}</span></p>
        </div>
        <div className="flex mx-0">
            <p>Info : <span className="font-semibold text-yellow-400">{description}</span></p>
        </div><hr></hr>
        <div className="card-actions justify-end">
          <button className="btn btn-outline text-white">Report</button>
          <label 
                htmlFor="booking-modal" 
                className="btn btn-outline text-white"
                onClick={()=> setProduct(product)}
                >Purchase</label>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
