import WalletComponent from './WalletComponent';

const Navbar = () => {

  return (
    <div className='bg-white w-full h-[80px] fixed top-0 flex items-center justify-between py-2 px-6 shadow-md'>
      <div className='flex items-center space-x-2'>
        <img
          src='/krishi-coin-logo.png' 
          alt='Logo'
          className='h-12' 
        />
        <span className='text-green-800 text-[28px] font-bold'>KrishiCoin</span>
      </div>
      <div className='flex items-center space-x-6 text-gray-600'>
        <WalletComponent />
        <button className='bg-red-500 text-white max-sm:hidden px-4 py-1 rounded-md hover:bg-red-600 transition duration-200'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
