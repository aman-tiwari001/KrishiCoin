import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const walletAddress = '0x123...456'; // Example wallet address
  const amount = '0.5 ETH'; // Example amount

  return (
    <div className='bg-white w-full h-[60px] fixed top-0 flex items-center justify-between px-6 shadow-md'>
      <div className='flex items-center space-x-2'>
        <img
          src='/krishi-coin-logo.png' 
          alt='Logo'
          className='h-12' // Adjust height as needed
        />
        <span className='text-green-800 text-[28px] font-bold'>Krishi Coin</span>
      </div>
      <div className='flex items-center space-x-6 text-gray-600'>
        <span className='hidden md:flex items-center'>
          <strong>Wallet:</strong> <span className='ml-1'>{walletAddress}</span>
        </span>
        <span className='hidden md:flex items-center'>
          <strong>Amount:</strong> <span className='ml-1'>{amount}</span>
        </span>
        <FaUserCircle className='text-gray-600 h-8 w-8 cursor-pointer hover:text-red-500 transition duration-200' />
        <button className='bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-200'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
