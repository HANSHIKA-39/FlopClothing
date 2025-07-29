import React, { useEffect } from "react";
import redtshirt from "../assets/redtshirt.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
// const checkout = {
//   _id: "123123",
//   createdAt: new Date(),
//   checkoutItems: [
//     {
//       productId: "1",
//       name: "T-shirt",
//       color: "Red",
//       size: "M",
//       price: "399",
//       quantity: 1,
//       image: redtshirt,
//     },
//     {
//       productId: "2",
//       name: "T-shirt",
//       color: "Red",
//       size: "XL",
//       price: "399",
//       quantity: 2,
//       image: redtshirt,
//     },
//   ],
//   shippingAddress: {
//     address: "Number 07, xyz",
//     city: "Punjab",
//   },
// };

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  //Clear the cart when order is confirmed

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-order");
    }
  }, [checkout, dispatch, navigate]);
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 5);
    return orderDate.toLocaleDateString();
  };
  return (
    <div className="max-w-4xl mx-auto  p-6 m-10">
      <h1 className="font-bold text-4xl text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex mb-20 justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order date:{new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* {Estimated Delivery} */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* {Ordered Items} */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">Rs.{item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* {Payment and Delivery info} */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">PayPal</p>
            </div>

            {/* Delivery info */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Delivery</h2>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}{" "}
              </p>
              <p className="text-gray-600">{checkout.shippingAddress.city} </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
