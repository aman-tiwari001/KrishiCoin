import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import { useNavigate, useParams } from "react-router-dom";
import { getListing } from "../apis/listing";
import CustomLoader from "../components/CustomLoader";
import { createOrder } from "../apis/order";
import toast from "react-hot-toast";
import { formatDate } from "date-fns";
const ListingDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10) || 0;

    if (qty === 0) {
      setError("Quantity cannot be 0");
      setQuantity(qty);
      setTotal(0);
    } else if (qty > product.total_stock - product.sold_stock) {
      setError("Quantity cannot be greater than available stock");
      setQuantity(qty);
      setTotal(0);
    } else {
      setError("");
      setQuantity(qty);
      setTotal(qty * product.price);
    }
  };

  const getListingDetail = async () => {
    try {
      const response = await getListing(id);
      setProduct(response);
    } catch (error) {
      console.error("Error fetching listing:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingDetail();
  }, []);

  const makeOrder = async () => {
    if (quantity === 0 ) {
      setError("Quantity cannot be 0");
      return;
    } else if (quantity > product.total_stock - product.sold_stock) {
      setError("Quantity cannot be greater than available stock");
      return;
    }
    const orderData = {
      listing_id: id,
      amount: total,
      quantity,
    };

    try {
      const response = await createOrder(orderData);
      toast.success("Order placed successfully");
      navigate("/market");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");
    }
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-black">
        <div className="flex items-center gap-4">
          <CustomLoader /> Fetching Listing Details...
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className=" flex max-md:flex-row flex-col justify-between items-between  ml-0 w-full p-4">
      <div className="flex_fix_invert">
      <div className="flex flex-col p-3 bg-red-00 pt-12 max-md:w-full w-1/2 ">
        <div className=" h-[310px] w-[430px]  m-12 mx-auto">
          <Carousel images={product.images} />
        </div>
        <h2 className="text-2xl pl-2 text-[#283e2f] ">{product.title}</h2>
        <h2 className="bg-cyan-00 p-2 overflow-scroll">{product.desc}</h2>
      </div>

      <div className=" flex flex-col p-3 bg-r-500 pt-12 w-1/2 max-md:w-[90%]">
        <h2 className="text-xl font-semibold pl-2 mt-12 text-[#283e2f] ">
          Quantity Left:
        </h2>
        <h2 className="text-sm font-normal pl-2  text-[#283e2f] ">
          (in Quintals)
        </h2>
        <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
          {product.total_stock - product.sold_stock - quantity}
        </h2>

        <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
          Price:
        </h2>
        <h2 className="text-sm font-normal pl-2  text-[#283e2f] ">
          (per Quintal)
        </h2>
        <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
          {product.price}
        </h2>

        <div className="flex">
          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              Location:
            </h2>
            <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
              {product.location}
            </h2>
          </div>
          {/* <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              State:
            </h2>
            <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
              {product.state}
            </h2>
          </div> */}
        </div>

        <div className="flex">
          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              Enter Quantity:
            </h2>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="0"
              placeholder="in quintals"
              className="text-lg pl-4 bg-transparent border-2 rounded-xl m-2 text-[#283e2f] "
            ></input>
            {error && <h2 className="text-red-500 pl-4 m-2">{error}</h2>}
          </div>

          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              Total Amount:
            </h2>
            <h2 className="text-lg pl-4 bg-transparent border-2 rounded-xl m-2 text-[#283e2f] ">
              ₹ {total}
            </h2>
          </div>
        </div>

        <button
          onClick={makeOrder}
          className={`btn mt-6 text-[#e0fce7] bg-[#233b2b] ${
            error ? "disabled cursor-not-allowed opacity-50" : ""
          }`}
        >
          <p>Create Order & Make Payment</p>
        </button>


        
      </div>
      </div>
      <div className="flex flex-col mt-8 bg-[#e8f5e9] rounded-lg mb-8 shadow-xl w-[90%] mx-auto p-4">
          <h2 className="text-xl font-semibold text-[#283e2f] mb-4">
            Buyers
          </h2>
          <div className="overflow-y-auto h-48">
            {product.orders && product.orders.length > 0 ? (
              <table className="table-auto w-full text-left text-[#283e2f] rounded-md">
                <thead>
                  <tr className="bg-[#74d677]">
                    <th className="px-4 py-2">No.</th>
                    <th className="px-4 py-2">Buyer</th>
                    <th className="px-4 py-2">Amount (USD)</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.orders?.map((product, index) => (
                    <tr key={index} className="bg-[#c8e6c9]">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{product.buyer.name}</td>
                      <td className="border px-4 py-2">
                        ${product.price}
                      </td>
                      <td className="border px-4 py-2">
                        {(product.quantity)} qtl
                      </td>
                      <td className="border px-4 py-2">
                        {formatDate (product.createdAt)}
                      </td>
                      <td className="border px-4 py-2">
                        <button className="btn btn-success">Ship</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="bg-[#158319] my-2 rounded-md">
                <p className="border px-4 py-2 text-white font-semibold text-center">
                  No Buyers yet
                </p>
              </div>
            )}
          </div>
        </div>

    </div>
  );
};

export default ListingDetails;
