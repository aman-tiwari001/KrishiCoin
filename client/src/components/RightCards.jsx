function RightCards() {
  return (
    <div className="w-full md:w-[60%] h-[50vh] flex flex-col gap-2 md:py-4">
      {/* Top Card */}
      <div className="w-full h-1/2 bg-yellow-500 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg">
        <h2 className="text-gray-800 text-2xl font-semibold mb-4">
          Join Communities
        </h2>
        <p className="text-gray-800 text-center mb-4">
          Be part of a vibrant community where you can connect, share, and grow
          together. Explore resources, events, and opportunities to engage with
          like-minded individuals!
        </p>
        <button className="bg-gray-800 text-white font-bold py-2 px-6 rounded-full shadow transition duration-300 hover:bg-gray-700">
          Explore
        </button>
      </div>

      {/* 3 small cards */}
      <div className="flex w-full h-1/2 gap-2">
        <div className="w-1/3 h-2/3 md:h-full bg-blue-500 rounded-2xl p-4 flex flex-col justify-evenly shadow-lg">
          <h2 className="text-white text-xl font-bold">P2P Lending</h2>
          <p className="text-white text-[10px] md:text-[15px]">
            Connect directly with lenders. Get better rates and flexible terms.
          </p>
        </div>
        <div className="w-1/3 h-2/3 md:h-full bg-blue-500 rounded-2xl p-4 flex flex-col justify-evenly shadow-lg">
          <h2 className="text-white text-xl font-bold">Get quick Loan</h2>
          <p className="text-white text-[10px] md:text-[15px]">
            Apply for a loan quickly and easily. Fast approval and funding.
          </p>
        </div>
        <div className="w-1/3 h-2/3 md:h-full bg-blue-500 rounded-2xl p-4 flex flex-col justify-evenly shadow-lg">
          <h2 className="text-white text-xl font-bold">Lend Money</h2>
          <p className="text-white text-[10px] md:text-[15px]">
            Lend money to those in need, earning interest in return .
          </p>
        </div>
      </div>
    </div>
  );
}

export default RightCards;
