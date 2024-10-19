import React from "react";
import { GoDotFill } from "react-icons/go";

function Orders({ src, title, status, price, seller, desc }) {
  return (
    <div className="flex max-md:flex-col flex-row justify-between items-center md:items-start bg-white text-black p-6 rounded-lg shadow-lg">
      <div className="max-md:w-full w-1/4 mb-4 md:mb-0 h-48 md:h-48 flex-shrink-0">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={src}
            alt="Listing"
          />
        </div>
      </div>

      <div className="max-md:w-full w-1/3 mb-4 md:mb-0 text-left flex_fix max-md:justify-between justify-evenly md:h-48">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <h3 className="text-gray-500 text-md  font-semibold">{desc}</h3>
        </div>
        <h3 className="bg-black text-white text-lg w-fit h-fit px-4 py-2 rounded-lg font-semibold">
          by {seller}
        </h3>
      </div>

      <div className="max-md:w-full w-1/4 text-center md:text-right flex_fix max-md:justify-between justify-evenly md:h-48 items-center">
        <h3 className=" bg-green-400 w-fit h-fit px-4 py-2 rounded-lg text-xl md:mb-6 font-semibold">
          $ {price}
        </h3>

       <div className={`${status === "pending" ? "bg-yellow-500" :"bg-green-500"} text-white flex justify-center items-center gap-2 border-2 rounded-full px-2 py-1`}>
        <GoDotFill className="text-2xl " />
        <h3 className="text-md font-semibold mr-2">{status}</h3>
       </div>
      </div>
    </div>
  );
}

export default Orders;
