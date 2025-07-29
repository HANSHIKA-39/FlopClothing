import React from "react";
import Colln1 from "../../assets/Colln1.jpg";
import Colln2 from "../../assets/Colln2.png";
import Colln3 from "../../assets/Colln3.png";
import image from "../../assets/image.png";
import { Link } from "react-router-dom";
const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-8 bg-[#fcf9ed]">
      <h1 className="lg:text-3xl text-2xl font-bold text-center py-1 pt-6 text-gray-800">
        Flop - Always on Top
      </h1>
      <p className="text-center mb-12  text-gray-400 ">
        Discover bold, trendsetting collections that bring your unique style to
        life.
      </p>

      <div className="container  mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1">
          <img
            src={Colln2}
            alt=""
            className="w-full h-[250px]  lg:h-[400px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 lg:p-4 p-2">
            <h2 className="lg:text-2xl text-xl font-bold text-gray-900 mb-3">
              {" "}
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative flex-1">
          <img
            src={Colln1}
            alt=""
            className="w-full h-[250px] lg:h-[400px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 lg:p-4 p-2">
            <h2 className="lg:text-2xl text-xl font-bold text-gray-900 mb-3">
              {" "}
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="relative flex-1">
          <img
            src={Colln3}
            alt=""
            className="w-full h-[250px] lg:h-[400px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 lg:p-4 p-2">
            <h2 className="lg:text-2xl text-xl font-bold text-gray-900 mb-3">
              {" "}
              Kid's Collection
            </h2>
            <Link
              to="/collections/all?gender=Kids"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
