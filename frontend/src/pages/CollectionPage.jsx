import React, { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import redtshirt from "../assets/redtshirt.jpg";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  // const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     const fetchedProducts = [
  //       {
  //         _id: 1,
  //         price: 399,
  //         name: "Product 1",
  //         images: [
  //           {
  //             url: redtshirt,
  //             altText: "T-shirt",
  //           },
  //         ],
  //       },
  //       {
  //         _id: 2,
  //         price: 399,
  //         name: "Product 2",
  //         images: [
  //           {
  //             url: redtshirt,
  //             altText: "T-shirt",
  //           },
  //         ],
  //       },
  //       {
  //         _id: 3,
  //         price: 399,
  //         name: "Product 3",
  //         images: [
  //           {
  //             url: redtshirt,
  //             altText: "T-shirt",
  //           },
  //         ],
  //       },
  //       {
  //         _id: 4,
  //         price: 399,
  //         name: "Product 4",
  //         images: [
  //           {
  //             url: redtshirt,
  //             altText: "T-shirt",
  //           },
  //         ],
  //       },
  //       {
  //         _id: 5,
  //         price: 399,
  //         name: "Product 5",
  //         images: [
  //           {
  //             url: redtshirt,
  //             altText: "T-shirt",
  //           },
  //         ],
  //       },
  //       {
  //         _id: 6,
  //         name: "Product 6",
  //         price: 399,
  //         images: [
  //           {
  //             url: redtshirt,
  //             altText: "T-shirt",
  //           },
  //         ],
  //       },
  //     ];
  //     setProducts(fetchedProducts);
  //   }, 1000);
  // }, []);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* {Mobile Filter button} */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2 " />
        Filters
      </button>

      {/* {Filter Sidebar} */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-[#fae2c4] overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4 bg-[#fcf9ed]">
        <h2 className="text-2xl uppercase lg:ml-4 mb-4 lg:mb-[-36px] mt-4 font-semibold">
          All Collections
        </h2>
        <SortOptions />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
