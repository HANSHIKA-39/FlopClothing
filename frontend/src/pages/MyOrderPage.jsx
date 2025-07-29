import React, { useState, useEffect } from "react";
import img from "../assets/Colln1.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrderPage = () => {
  // const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const mockOrders = [
  //     {
  //       _id: "1234",
  //       createdAt: new Date(),
  //       shippingAddress: { city: "Delhi" },
  //       orderItems: [
  //         {
  //           name: "Product 1",
  //           image: img,
  //         },
  //       ],
  //       totalPrice: 399,
  //       isPaid: true,
  //     },
  //     {
  //       _id: "34567",
  //       createdAt: new Date(),
  //       shippingAddress: { city: "Punjab" },
  //       orderItems: [
  //         {
  //           name: "Product 2",
  //           image: img,
  //         },
  //       ],
  //       totalPrice: 399,
  //       isPaid: false,
  //     },
  //   ];

  //   setTimeout(() => {
  //     setOrders(mockOrders);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);
  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error:{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 mb-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.orderId}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  <td className="px-2 py-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-1/2 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    {order.orderId}
                  </td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress?.city || "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    Rs.{order.totalPrice}
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
