import React from 'react';
import { MdOutlineTimer } from "react-icons/md";
import { differenceInDays } from 'date-fns'; // Import date-fns

function CampaignCard({ title, target, amtfunded, author, image, deadline }) {
  const percfunded = (amtfunded/target) * 100;
  const daysLeft = differenceInDays(new Date(deadline), new Date());
  const truncatedTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;

  return (
    <div className="card h-[350px] bg-[#283e2f] text-[#e0fce7] w-96 shadow-xl rounded-lg overflow-hidden">
      <figure className="h-[60%] overflow-hidden">
        <img src={image} alt={title} className="object-cover w-full h-full bg-lime-700" />
      </figure>
      
      <div className="card-body p-4 flex flex-col justify-between h-[40%]">
        <div>
          <h2 className="text-lg font-semibold">{truncatedTitle}</h2>
          <h5 className="text-xs text-gray-300">By {author}</h5>
        </div>

        <div className="flex justify-between items-center mt-2">
          <h3 className="text-sm flex items-center gap-1">
            <MdOutlineTimer size={18} />
            <span>{daysLeft > 0 ? `${daysLeft} Days Left` : 'Expired'}</span>
          </h3>
          
          <h3 className="text-sm">
            {percfunded.toFixed(0)}% Funded
          </h3>
          
          <button className="btn bg-[#778457] border-0 text-white text-sm py-1 px-3 rounded-md">
            Contribute Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CampaignCard;
