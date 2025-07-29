import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }
  return (
    <div className="grid lg:ml-16 lg:mr-16 m-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="p-4 rounded-lg">
            <div className="w-[270px] lg:w-[250px]  h-[280px] lg:h-60  mb-4">
              <img
                src={product.images[0].url}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-sm mb-2">{product.name} </h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              Rs.{product.price}{" "}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
