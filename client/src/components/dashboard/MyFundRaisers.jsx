import { formatDistanceStrict, isPast } from "date-fns";
import React from "react";

function FundRaisers({
  src,
  title,
  funded,
  price,
  donators_cnt,
  deadline,
  amt_collected,
}) {
  const deadlineDate = new Date(deadline);
  const daysLeft = formatDistanceStrict(deadlineDate, new Date());
  const deadlineExpired = isPast(deadlineDate);
  const deadlineMessage = deadlineExpired
    ? "Deadline has passed"
    : `${daysLeft} left`;
  return (
    <div className="flex max-md:flex-col flex-row justify-between items-center md:items-start bg-white text-black p-6 rounded-lg shadow-lg">
      <div className="max-md:w-full w-1/4 mb-4 md:mb-0 h-48 md:h-48 flex-shrink-0">
        <div className="w-full h-full overflow-hidden rounded-lg">
          <img className="w-full h-full object-cover" src={src} alt="" />
        </div>
      </div>

      <div className="max-md:w-full w-1/3 mb-4 md:mb-0 text-left flex_fix max-md:justify-between justify-evenly md:h-48">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <h3 className="text-gray-500 text-md  font-semibold">
            {deadlineMessage}
          </h3>
        </div>
        <h3 className="bg-black text-white text-lg w-fit h-fit px-4 py-2 rounded-lg font-semibold">
          {donators_cnt} donators
        </h3>
      </div>

      <div className="max-md:w-full w-1/4 text-center md:text-right flex_fix max-md:justify-between justify-evenly md:h-48 items-center">
        <h3 className=" bg-green-400 w-fit h-fit px-4 py-2 rounded-lg text-xl mb-6 font-semibold">
          $ {amt_collected} collected
        </h3>

        <div className="flex justify-center items-center gap-2">
          <div
            className="radial-progress text-[#268431] w-[70px] h-[70px] font-bold"
            style={{
              "--value": `${Math.floor(funded)}`,
              "--size": "70px",
              "--thickness": "7px",
            }}
            role="progressbar"
          >
            {funded.toFixed(0)} %
          </div>
          <p className="font-semibold">funded</p>
        </div>
      </div>
    </div>
  );
}

export default FundRaisers;
