import React from "react";
import { Link } from "react-router-dom";
import featuredImg from "../../assets/featured.jpg";
import FeatureSection from "./FeatureSection";

const FeaturedCollection = () => {
  return (
    <section className="lg:py-16  px-4 lg:px-36 pt-32 lg:mt-10">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-[#f8ada4] opacity-70 rounded-3xl">
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray=700 mb-2">
            Effortless Style, Everyday Comfort
          </h2>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Find Your Go-To Fit Today
          </h2>
          <p className="text-lg text-gray-600 mb-6 ">
            Explore a curated collection of T-shirts designed for all-day wear.
            Soft fabrics, perfect cuts, and timeless colors — made to elevate
            your wardrobe.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white px-6 py-2 rounded-lg text-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
        <div className="lg:w-1/2">
          <img
            src={featuredImg}
            alt=""
            className="h-0 w-0 lg:w-[750px] lg:h-[570px] object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>
      </div>
      <FeatureSection />
    </section>
  );
};

export default FeaturedCollection;
