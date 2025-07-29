import React from "react";
import {
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
  HiShoppingBag,
} from "react-icons/hi2";

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* 1st feature */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-2">
            <HiShoppingBag className="text-2xl"></HiShoppingBag>
          </div>
          <h4 className="tracking-tighter mb-2">
            FREE DELIVERY ALL OVER INDIA
          </h4>
        </div>

        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-2">
            <HiArrowPathRoundedSquare className="text-2xl"></HiArrowPathRoundedSquare>
          </div>
          <h4 className="tracking-tighter mb-2">30 DAYS RETURN</h4>
        </div>

        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-2">
            <HiOutlineCreditCard className="text-2xl" />
          </div>
          <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
