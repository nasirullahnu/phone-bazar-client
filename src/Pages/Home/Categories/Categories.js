import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const {loading} = useContext(AuthContext)

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setCategories(data)
      });
  }, []);

  if(loading){
    return <Loading></Loading>
  }

  return (
    <div className="">
      <h1 className="text-4xl font-bold mt-16 mb-2">Products To be sell</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {
        categories.map(category => <div 
        key={category._id} 
        className="card shadow-xl bg-indigo-500">
        <figure className="px-10 pt-10">
          <img
            src={category.img}
            alt="category images"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white">{category.title}</h2>
          <div className="card-actions">
            <Link to={`/products/${category.category_id}`}>
                <button className="btn btn-outline">See Items</button>
            </Link>
          </div>
        </div>
      </div>)
      }
      </div>

      
    </div>
  );
};

export default Categories;
