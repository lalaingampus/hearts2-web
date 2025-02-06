// StickyWhatsAppButton.tsx
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // WhatsApp icon from react-icons

const StickyWhatsAppButton: React.FC = () => {
  const whatsappLink = 'https://wa.me/6285121053911';
  const handleClick = () => {
    console.log("Button clicked!");
    // Jika ingin membuka link WhatsApp:
    window.open(whatsappLink, "_blank");
  };
  
  return (
    <div
      className="fixed bottom-3 left-1/2 lg:left-5/7 transform -translate-x-1/4 lg:w-[280px] lg:h-[40px] w-[235px] h-[40px] flex items-center p-2 bg-green-500 text-white rounded-full shadow-lg space-x-2 sm:space-x-4 px-5 mx-0 active:bg-green-600 cursor-pointer"
      onClick={handleClick}
    >
      {/* WhatsApp Icon */}
      <FaWhatsapp size={20} />
      
      {/* Label */}
      <span className="md:inline lg:text-sm text-xs">Butuh bantuan? Hubungi kami</span>
    </div>
  );
};

export default StickyWhatsAppButton;
