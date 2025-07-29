import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import image from "../assets/Colln1.jpg";
import { useDispatch, useSelector } from "react-redux";

// const placeholderProducts = [
//   {
//     _id: 1,
//     name: "Product 1",
//     price: 399,
//     images: [{ url: image }],
//   },
//   {
//     _id: 2,
//     name: "Product 2",
//     price: 399,
//     images: [{ url: image }],
//   },
//   {
//     _id: 3,
//     name: "Product 3",
//     price: 399,
//     images: [{ url: image }],
//   },

//   {
//     _id: 4,
//     name: "Product 4",
//     price: 399,
//     images: [{ url: image }],
//   },
//   {
//     _id: 5,
//     name: "Product 5",
//     price: 399,
//     images: [{ url: image }],
//   },
//   {
//     _id: 6,
//     name: "Product 6",
//     price: 399,
//     images: [{ url: image }],
//   },
// ];

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* 
      <div className="container mx-autobg-[#fcf9ed]">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Men
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div> */}
    </div>
  );
};

export default Home;
