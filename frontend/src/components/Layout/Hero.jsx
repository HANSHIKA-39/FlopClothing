import React from "react";
import heroImg from "../../assets/heroImg2.jpg";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section>
      <img
        src={heroImg}
        alt="Flop"
        className="lg:ml-40 lg:mt-6 w-full h-[300px] lg:h-[500px] lg:w-[1200px] lg:px-32 lg:py-5"
      />
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center lg:-top-[20%] -top-[15%]">
        <Link
          to="#"
          className="bg-[#fcf9ed] text-gray-950 px-6 py-2 rounded-sm text-lg border-2 border-black"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
