// DonationPage.jsx
import React from 'react';
import CampaignCard from '../components/CampaignCard';

const campaigns = [
  {
    id: 1,
    title: 'Feed the Needy',
    description: 'Help provide meals to families in need.',
    totaldays: '2',
    target: 1000,
    amtfunded: 200,
    startDate: "2024-09-15",
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',

  },
  {
    id: 2,
    title: 'Feed the Needy',
    description: 'Help provide meals to families in need.',
    totaldays: '2',
    target: 1000,
    amtfunded: 200,
    startDate: "2024-09-15",
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',

  },
  {
    id: 3,
    title: 'Feed the Needy',
    description: 'Help provide meals to families in need.',
    totaldays: '2',
    target: 1000,
    amtfunded: 200,
    startDate: "2024-09-15",
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',

  },
  {
    id: 4,
    title: 'Feed the Needy',
    description: 'Help provide meals to families in need.',
    totaldays: '2',
    target: 1000,
    amtfunded: 200,
    startDate: "2024-09-15",
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',

  },
  {
    id: 5,
    title: 'Feed the Needy',
    description: 'Help provide meals to families in need.',
    totaldays: '2',
    target: 1000,
    amtfunded: 200,
    startDate: "2024-09-15",
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
  },
 
];

function DonationPage() {
  return (
    <div className="h-screen">
      <div className='h-[80px]'></div>
      <div className="flex h-screen-minus-80 overflow-y-auto flex-wrap gap-8 justify-center p-8">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          title={campaign.title}
          target={campaign.target}
          amtfunded={campaign.amtfunded}
          totaldays={campaign.days}
          startDate={campaign.startDate}
          author= 'Bala Sharma'
          description={campaign.description}
          image={campaign.image}
        />
      ))}
      </div>
    </div>
  );
}

export default DonationPage;
