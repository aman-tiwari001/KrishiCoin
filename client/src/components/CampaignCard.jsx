import React from 'react';
import { MdOutlineTimer } from "react-icons/md";


function CampaignCard({ title, totaldays, target, amtfunded, author, image, startDate }) { 
  // Calculate days left
  const currentDate = new Date(); // Get current date
  const start = new Date(startDate); // Convert start date to Date object
  const daysPassed = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24)); // Days between start and today
  const daysLeft = Math.max(totaldays - daysPassed, 0); // Ensure days left is not negative

  const percfunded = ((target - amtfunded)/target)*100

  return (
    <div className="card h-[300px] bg-[#283e2f] text-[#e0fce7] w-96 shadow-xl">
      <figure className="h-[60%]">
        <img src={image} alt={title} />
      </figure>
      <div className="card-body p-2 gap-0 flex flex-col h-[40%]">
        <h2 className="text-xl">{title}</h2>
        <h5 className="text-xs">By {author}</h5>
        <div className="flex justify-evenly items-center">
          <h3 className="text-sm flex ">
           <MdOutlineTimer />
            <span className='mt-[-3px] ml-1 '>{daysLeft}Days Left</span>
        
          </h3>
          <h3 className="text-sm ">
            {percfunded}% Funded
          </h3>
          <button className="btn border-0 bg-[#778457] text-[#e0fce7] ">Contribute Now</button>
        </div>

      </div>
    </div>
  );
}

export default CampaignCard;
