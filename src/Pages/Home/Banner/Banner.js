import React from "react";

const Banner = () => {
  return (
    <div className="hero bg-blue-500">
      <div className="hero-content flex-col lg:flex-row">
        <img
          alt="banner"
          src="https://placeimg.com/260/400/arch"
          className="max-w-sm rounded-lg shadow-2xl"
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
