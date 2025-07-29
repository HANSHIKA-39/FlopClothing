import React, { use, useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import redtshirt from "../../assets/new1.jpg";
import { Link } from "react-router-dom";
import FeaturedCollection from "./FeaturedCollection";
import axios from "axios";
const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  // const newArrivals = [
  //   {
  //     _id: "1",
  //     price: 399,
  //     images: [
  //       {
  //         url: redtshirt,
  //         altText: "T-shirt",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     price: 399,
  //     images: [
  //       {
  //         url: redtshirt,
  //         altText: "T-shirt",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "3",
  //     price: 399,
  //     images: [
  //       {
  //         url: redtshirt,
  //         altText: "T-shirt",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "4",
  //     price: 399,
  //     images: [
  //       {
  //         url: redtshirt,
  //         altText: "T-shirt",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "5",
  //     price: 399,
  //     images: [
  //       {
  //         url: redtshirt,
  //         altText: "T-shirt",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "6",
  //     price: 399,
  //     images: [
  //       {
  //         url: redtshirt,
  //         altText: "T-shirt",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "7",
  //     price: 399,
  //     images: [
  //       {
  //         url: redtshirt,
  //         altText: "T-shirt",
  //       },
  //     ],
  //   },
  // ];

  const [newArrivals, setNewArrivals] = useState([]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = (e) => {
    setIsDragging(false);
  };
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
    console.log({
      scrollLeft: container.scrollLeft,
      clientWidth: container.clientWidth,
      containerScrollWidth: container.scrollWidth,
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);
  return (
    <section className="bg-[#fcf9ed] py-16 px-4 lg:px-4">
      <div
        className={`container bg-[#fcf9ed] mx-auto text-center mb-10 relative `}
      >
        <h2 className="text-2xl font-bold mb-2 -mt-5 ">
          {" "}
          Discover What's New✨
        </h2>
        <p className="text-gray-600 ml-5 mr-6 pb-6 text-center">
          Fresh styles, handpicked for you. Stay ahead of the trend.
        </p>

        <div className="absolute right-0  bg-[#fcf9ed] bottom-[-30px] mr-4  flex space-x-2 ">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border border-gray-400 border-2 ${
              canScrollLeft
                ? "bg-[#fcf9ed] text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } `}
          >
            <FiChevronLeft className="text-2xl " />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border border-gray-400 border-2 ${
              canScrollRight
                ? "bg-[#fcf9ed] text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`mx-auto max-w-[2100px] px-4 bg-[#fcf9ed] overflow-x-scroll flex space-x-8 relative" ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] max-h-[350px] lg:max-h-[400px] relative "
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[350px] lg:h-[400px]  object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h1 className="font-medium">{product.name}</h1>
                <p className="mt-1">Rs.{product.price} </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <FeaturedCollection />
    </section>
  );
};

export default NewArrivals;
