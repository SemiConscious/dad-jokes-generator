import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200"></div>
        <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
};