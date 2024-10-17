import React from "react";

function Listings({ src, title, total_stock, price, quantity_left, desc }) {
  const displayValue = Math.min(quantity_left, 100);
  return (
    <div className="flex max-md:flex-col flex-row justify-between items-center md:items-start bg-white text-black p-6 rounded-lg shadow-lg">
      <div className="max-md:w-full w-1/4 mb-4 md:mb-0 h-48 md:h-48 flex-shrink-0">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={src}
            alt="Property"
          />
        </div>
      </div>

      <div className="max-md:w-full w-1/3 mb-4 md:mb-0 text-left flex_fix max-md:justify-between justify-evenly md:h-48">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <h3 className="text-gray-400 text-md  font-semibold">{desc}</h3>
        </div>
        <h3 className="bg-green-600 text-white text-lg w-fit h-fit px-4 py-2 rounded-lg font-semibold">
          Qty : {total_stock} qtl
        </h3>
      </div>

      <div className="max-md:w-full w-1/4 text-center md:text-right flex_fix max-md:justify-between justify-evenly md:h-48 items-center">
        <h3 className=" bg-lime-400 w-fit h-fit px-4 py-2 rounded-lg text-xl mb-6 font-semibold">
          $ {price} / qtl
        </h3>

        <div
          className="radial-progress text-[#43d854] w-[70px] h-[70px] font-bold"
          style={{
            "--value": `${Math.floor(displayValue)}`,
            "--size": "70px",
            "--thickness": "7px",
          }}
          role="progressbar"
        >
          {quantity_left.toFixed(0)} %
        </div>
      </div>
    </div>
  );
}

export default Listings;
