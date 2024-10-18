import React from "react";

function Donations({ src, title, donated_at, amount, owner }) {

  const formatDate = (date) => {  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined
      , options);
  }
  return (
    <div className="flex max-md:flex-col flex-row justify-between items-center md:items-start bg-white text-black p-6 rounded-lg shadow-md">
      <div className="max-md:w-full w-1/4 mb-4 md:mb-0 h-48 md:h-48 flex-shrink-0">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img className="w-full h-full object-cover" src={src} alt="" />
        </div>
      </div>

      <div className="max-md:w-full w-1/3 mb-4 md:mb-0 text-left md:flex md:flex-col justify-evenly md:h-48">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
        <h3 className="bg-[#ffeb39] w-fit px-2 py-1 rounded-md text-lg font-semibold">{formatDate(donated_at)}</h3>
      </div>

      <div className="max-md:w-full w-1/4 text-center md:text-right flex_fix max-md:justify-between justify-evenly md:h-48 items-center">
        <h3 className="bg-green-400 w-fit h-fit px-4 py-2 rounded-lg text-xl font-semibold">
          $ {amount}
        </h3>

        <h3 className="bg-black px-2 py-1 rounded-md w-fit text-white text-lg font-semibold">
          for : {owner}
        </h3>
      </div>
    </div>
  );
}

export default Donations;
