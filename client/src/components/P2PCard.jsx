import React from "react";
import { Link } from "react-router-dom";

function P2PCard({ id, title, image, price, user, quantityLeft, quantity }) {
  const percentageLeft = (quantityLeft / quantity) * 100;

  return (
    <div className="card h-[350px] bg-[#283e2f] text-[#e0fce7] w-96 shadow-xl rounded-lg overflow-hidden">
      <figure className="h-[60%] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full bg-lime-700"
        />
      </figure>

      <div className="card-body p-2 flex flex-col justify-between h-[40%]">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="flex justify-between">
              <h5 className="text-xs text-gray-300"> By {user}</h5>
              {/* <h5 className="text-sm text-gray-300">
              {" "}
              {city}, {state}
            </h5> */}
            </div>
          </div>

          <div className="flex items-center">
            {/* <div
              className="radial-progress text-[#43d854] w-[50px] h-[50px] font-bold"
              style={{
                "--value": `${Math.floor(quantityLeft)}`,
                "--size": "12rem",
                "--thickness": "4px",
              }}
              role="progressbar"
            >
              {quantityLeft.toFixed(0)}
            </div> */}
            <QuantityCircle quantity={quantity} quantityLeft={quantityLeft} />
            <span className="ml-2">Left</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 pb-2">
          <h3 className="text-md font-bold ml-2">$ {price} / Quintal</h3>

          <Link to={`/listing/${id}`}>
            <button className="btn bg-[#778457] border-0 text-white text-sm py-1 px-3 rounded-md">
              Explore Offer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function QuantityCircle({ quantity, quantityLeft }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const percentageLeft = (quantityLeft / quantity) * 100;
  const offset = circumference - (percentageLeft / 100) * circumference;

  return (
    <div className="relative  w-16 h-16">
      <svg className="w-full h-full  transform -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="35"
          cy="30"
          r={radius}
          fill="transparent"
          stroke="#ffffff"
          strokeWidth="6"
        />
        <circle
          cx="35"
          cy="30"
          r={radius}
          fill="transparent"
          stroke="#00eb52"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
      {quantityLeft.toFixed(0)}
      </div>
    </div>
  );
}

export default P2PCard;
