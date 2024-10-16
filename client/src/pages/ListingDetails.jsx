import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import { useParams } from "react-router-dom";
import { getListing } from "../apis/listing";
import CustomLoader from "../components/CustomLoader";

const ListingDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10) || 0;
    setQuantity(qty);
    setTotal(qty * product.price);
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

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-black">
        <div className="flex items-center gap-4">
          <CustomLoader /> Fetching Listing Details...
        </div>
      </div>
    );
  }
  return (
    <div className=" flex flex-row items-start  ml-0 h-minus-80 overflow-hidden">
      <div className="flex flex-col p-3 bg-red-00  h-[99vh] pt-12 w-1/2 ">
        <div className=" h-[310px] w-[430px]  m-12 ">
          <Carousel images={product.images} />
        </div>
        <h2 className="text-2xl pl-2 text-[#283e2f] ">{product.title}</h2>
        <h2 className="bg-cyan-00 p-2 overflow-scroll">{product.desc}</h2>
      </div>

      <div className=" flex flex-col p-3 bg-r-500  h-[99vh] pt-12 w-1/2">
        <h2 className="text-xl font-semibold pl-2 mt-12 text-[#283e2f] ">
          Quantity Left:
        </h2>
        <h2 className="text-sm font-normal pl-2  text-[#283e2f] ">
          (in Quintals)
        </h2>
        <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
          {product.quantityLeft}
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
              City:
            </h2>
            <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
              {product.city}
            </h2>
          </div>
          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              State:
            </h2>
            <h2 className="text-lg pl-4 border-2 rounded-xl m-2 text-[#283e2f] ">
              {product.state}
            </h2>
          </div>
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
          </div>
          <div className="flex flex-col w-1/2">
            <h2 className="text-xl font-semibold pl-2 mt-4 text-[#283e2f] ">
              Total Amount:
            </h2>
            <h2
              //   value={product.price*total}
              className="text-lg pl-4 bg-transparent border-2 rounded-xl m-2 text-[#283e2f] "
            >
              ₹ {total}
            </h2>
          </div>
        </div>

        <div className="btn mt-6 text-[#e0fce7] bg-[#233b2b]">Buy Now</div>
      </div>
    </div>
  );
};

export default ListingDetails;
