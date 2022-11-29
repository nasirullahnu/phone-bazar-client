import React from "react";
import img from '../../../assets/banner/banner1.jpg'
import img2 from '../../../assets/banner/banner2.jpg'

const Banner = () => {
  return (
    <div className="hero bg-blue-500">
      <div className="hero-content flex-col lg:flex-row">
        <img
          alt="banner"
          src={img2}
          className=" rounded-lg shadow-2xl"
        />
        <div className="w-2/4 text-white">
          <h1 className="text-5xl font-bold">Phone Bazar / Resale </h1>
          <p className="py-6">
            December, বছরের শেষ মাস। আর এই শেষ মাসে থাকছে ক্রেতাদের জন্য বিশেষ মূল্য ছাড়।
            তাই দেরি না করে এখনি যুক্ত হোন আমাদের DECEMBER SEELS এ। 
          </p>
          <button className="btn btn-outline bt-white">View Products</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
