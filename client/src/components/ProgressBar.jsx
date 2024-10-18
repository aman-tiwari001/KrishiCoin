import React from 'react';

const ProgressBar = ({ currentAmount, targetAmount }) => {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100); // Cap at 100%

  return (
    <div className="w-full mt-8  bg-gray-300 rounded-lg h-6 overflow-hidden">
      <div
        className="bg-green-500 h-full text-center text-white text-sm font-semibold transition-all"
        style={{ width: `${percentage}%` }}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;
