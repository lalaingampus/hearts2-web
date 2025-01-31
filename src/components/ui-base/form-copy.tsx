import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

interface PackListCardProps {
  packListDocNo: string;
  onCopy: () => void;
}

const PackListCard: React.FC<PackListCardProps> = ({ packListDocNo, onCopy }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah klik pada elemen luar
    setIsClicked(true); // Atur state menjadi true saat klik
    onCopy();
    setTimeout(() => setIsClicked(false), 300); // Kembalikan state setelah 300ms
  };

  return (
    <div
      className={`flex items-center justify-between border rounded-xl p-2 w-full transition duration-200 ${
        isClicked ? 'bg-gray-200' : 'hover:bg-gray-60'
      }`}
      onClick={handleClick}
    >
      <span className="text-sm text-gray-600">No. {packListDocNo}</span>
      <FaCopy
        size={16}
        color={isClicked ? '#FFFFFF' : '#D9D9D9'} // Warna putih saat diklik
        className="cursor-pointer"
      />
    </div>
  );
};

export default PackListCard;
